import {
   ActionFunctionArgs,
   json,
   LoaderFunctionArgs,
   redirect,
} from '@remix-run/node';
import { Link, useFetcher, useLoaderData } from '@remix-run/react';
import { getUser } from '~/modules/server/auth.server';
import {
   addToCart,
   AddToCartType,
   getUserCartInfo,
   removeFromCart,
} from '~/modules/server/user.server';
import { FaHouse } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { IMAGE_FALL_BACK_URL } from '~/modules/domain';
import { useMemo } from 'react';
import { createOrder, OrderPayLoad } from '~/modules/server/order.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
   const user = await getUser(request);

   if (!user) {
      return redirect('/login');
   }

   const userCart = await getUserCartInfo(String(user.id));

   return json({ cart: userCart }, { status: 200 });
};

export const action = async ({ request }: ActionFunctionArgs) => {
   const user = await getUser(request);

   if (!user) {
      return redirect('/login');
   }

   const data = await request.formData();
   const action = data.get('_action');
   const productId = data.get('productId');

   switch (action) {
      case 'increase': {
         await addToCart({
            userId: Number(user?.id),
            productId: Number(productId),
            quantity: 1,
         } as AddToCartType);
         break;
      }
      case 'decrease': {
         await addToCart({
            userId: Number(user?.id),
            productId: Number(productId),
            quantity: -1,
         } as AddToCartType);
         break;
      }
      case 'removeFromCart': {
         await removeFromCart(String(user?.id), String(productId));
         break;
      }
      case "createOrder": {
         const dataOrder = data.get("data_create_order") || "";
         const payload = JSON.parse(dataOrder as string) as OrderPayLoad;
         await createOrder(payload);

         return redirect("/thankyou");
      }
      default: {
         throw new Response('Bad Request', { status: 400 });
      }
   }

   return json({ success: true });
};

export default function CartPage() {
   const data = useLoaderData<typeof loader>();
   const fetcher = useFetcher();


   const totalPrice = useMemo(() => {
      if (!data.cart) return 0;

      return data.cart?.CartItems.reduce((sum, current) => sum + current.product.price, 0);
   }, [data])

   const orderValue = useMemo<string>(() => {

      const { cart } = data

      if (cart) {
         return JSON.stringify({
            cartId: cart.id,
            userId: cart.userId,
            totalPrice: totalPrice,
            cartItem: cart.CartItems.map((item) => {
               return {
                  productId: item.productId,
                  quantity: item.quantity,
                  price: item.product.price
               }
            })
         })
      } else {
         return JSON.stringify("");
      }

   }, [data, totalPrice])

   return (
      <div className="">
         <div className="">
            <li className="">
               <a href="home.html">
                  <FaHouse />
                  Home
               </a>
            </li>
            <li className="" aria-current="page">
               Shopping cart
            </li>
         </div>

         <div className="">
            <div className="">
               {data.cart?.CartItems.map((item) => (
                  <div
                     className=""
                     key={item.id}
                  >
                     <div className="">
                        <img
                           src={
                              item.product.mainImageString ||
                              IMAGE_FALL_BACK_URL
                           }
                           alt="Product"
                           style={{
                              width: '80px',
                              height: '100px',
                              border: '1px solid #ddd',
                              objectFit: "contain"
                           }}
                        />
                     </div>
                     <div>
                        <p>
                           <strong>{item.product.tags}</strong>
                           <br />
                           {item.product.sku}
                           <br />
                           {item.product.productName}
                        </p>
                     </div>
                     <div className="">
                        <div className="">
                           <fetcher.Form method="post">
                              <input
                                 type="hidden"
                                 name="productId"
                                 value={item.productId}
                                 readOnly
                              />
                              <button
                                 type="submit"
                                 name="_action"
                                 value="decrease"
                                 className=""
                              >
                                 -
                              </button>
                           </fetcher.Form>
                           <input
                              type="text"
                              className=""
                              value={item.quantity}
                              readOnly
                              style={{ width: '50px' }}
                           />
                           <fetcher.Form method="post">
                              <input
                                 type="hidden"
                                 name="productId"
                                 value={item.productId}
                                 readOnly
                              />
                              <button
                                 type="submit"
                                 name="_action"
                                 value="increase"
                                 className=""
                              >
                                 +
                              </button>
                           </fetcher.Form>
                        </div>
                        <p className="">
                           {(
                              item.product.price * item.quantity
                           ).toLocaleString()}
                           VND
                        </p>
                        <fetcher.Form method="post">
                           <input
                              type="hidden"
                              readOnly
                              name="productId"
                              value={item.productId}
                           />
                           <button
                              type="submit"
                              name="_action"
                              value="removeFromCart"
                              className=""
                           >
                              <FaTrash /> Remove from cart
                           </button>
                        </fetcher.Form>
                     </div>
                  </div>
               ))}

               <Link to="/products" className="">
                  Continue viewing more products
               </Link>
            </div>

            <div className="">
               {/* <div className="coupon-code mb-4">
                  <h5>COUPON CODE</h5>
                  <p>Please enter coupon code to receive 30% discount</p>
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Coupon Code"
                  />
                  <button className="btn btn-dark w-100 mt-2">Apply</button>
               </div> */}

               <div className="">
                  <h5>Cart Total</h5>
                  <p>
                     Cart Subtotal:{' '}
                     <span className="">{totalPrice?.toLocaleString()}VND</span>
                  </p>
                  <p>
                     Discount: <span className="">100.000 VND</span>
                  </p>
                  <p>
                     Shipping: <span className="">FREE</span>
                  </p>
                  <h5>
                     Total: <span className="">{(totalPrice && (totalPrice - 100000).toLocaleString())}VND</span>
                  </h5>
                  {data.cart && data.cart?.CartItems.length > 0 && (
                     <fetcher.Form method='post'>
                        <input type="hidden" name='data_create_order' readOnly value={orderValue} />
                        <button type='submit' name="_action" value="createOrder" className="">
                           Proceed to payment
                        </button>
                     </fetcher.Form>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
