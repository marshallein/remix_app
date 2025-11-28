import {
   ActionFunctionArgs,
   json,
   LoaderFunctionArgs,
   MetaFunction,
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
import React, { useMemo, useState } from 'react';
import { createOrder, OrderPayLoad } from '~/modules/server/order.server';
import FormInput from '~/components/FormInput';

export const meta: MetaFunction = () => {
   return [{ title: 'Cart' }];
};

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
      case 'createOrder': {
         const dataOrder = data.get('data_create_order') || '';
         const payload = JSON.parse(dataOrder as string) as OrderPayLoad;
         const response = await createOrder(payload);

         if (!response?.ok) {
            return redirect('/404');
         } else {
            return redirect('/thankyou');
         }
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
   const [checkoutDetails, setCheckoutDetails] = useState({
      address: '',
      phone: '',
   });
   const [checkoutErrors, setCheckoutErrors] = useState<{ phone?: string }>({});

   const totalPrice = useMemo(() => {
      if (!data.cart) return 0;

      return data.cart?.CartItems.reduce(
         (sum, current) => sum + current.product.price * current.quantity,
         0,
      );
   }, [data]);

   const orderValue = useMemo<string>(() => {
      const { cart } = data;
      if (cart) {
         const payload: OrderPayLoad = {
            cartId: cart.id,
            userId: cart.userId,
            totalPrice: totalPrice,
            address: checkoutDetails.address,
            telephone: checkoutDetails.phone,
            cartItem: cart.CartItems.map((item) => {
               return {
                  productId: item.productId,
                  quantity: item.quantity,
                  price: item.product.price,
               };
            }),
         };
         return JSON.stringify(payload);
      } else {
         return JSON.stringify('');
      }
   }, [checkoutDetails.address, checkoutDetails.phone, data, totalPrice]);

   const handleCheckoutDetailChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      field: string,
   ) => {
      const { value } = event.target;
      setCheckoutDetails((prev) => ({
         ...prev,
         [field]: value,
      }));

      if (field === 'phone') {
         const isNumeric = /^\d*$/.test(value);
         setCheckoutErrors((prev) => ({
            ...prev,
            phone: isNumeric ? '' : 'Telephone must contain digits only',
         }));
      }
   };

   const isCheckoutDisabled =
      !checkoutDetails.address.trim() ||
      !checkoutDetails.phone.trim() ||
      Boolean(checkoutErrors.phone);

   return (
      <section className="min-h-screen bg-white">
         <div className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-0">
            <div className="flex items-center gap-3 text-sm text-alternative_1">
               <FaHouse />
               <Link to="/" className="uppercase tracking-[0.35em]">
                  Home
               </Link>
               <span className="text-alternative_1/60">/</span>
               <span className="uppercase tracking-[0.35em] text-alternative_2">
                  Shopping cart
               </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
               <div className="rounded border border-white/60 bg-white/85 p-6 shadow-2xl shadow-primary/20 space-y-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-xs uppercase tracking-[0.45em] text-secondary">
                           Items
                        </p>
                        <h2 className="text-3xl font-light text-alternative_2">
                           Your cart
                        </h2>
                     </div>
                     <Link
                        to="/products"
                        className="rounded border border-alternative_2/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-alternative_2 transition hover:bg-secondary/30"
                     >
                        Continue shopping
                     </Link>
                  </div>
                  <div className="space-y-4">
                     {data.cart?.CartItems && data.cart.CartItems.length > 0 ? (
                        data.cart.CartItems.map((item, index) => (
                           <React.Fragment key={`${item.id}-${index}`}>
                              <div className="flex flex-col gap-4 rounded border border-alternative_1/20 p-4 shadow-sm shadow-secondary/20 sm:flex-row sm:items-center">
                                 <div className="flex items-center gap-4">
                                    <img
                                       src={
                                          item.product.mainImageString ||
                                          IMAGE_FALL_BACK_URL
                                       }
                                       alt="Product"
                                       className="h-28 w-24 rounded border border-alternative_1/20 object-cover"
                                    />
                                 </div>

                                 <div>
                                    <p className="text-xs uppercase tracking-[0.35em] text-secondary">
                                       {item.product.tags}
                                    </p>
                                    <p className="text-sm text-alternative_1">
                                       SKU: {item.product.sku}
                                    </p>
                                    <p className="text-lg font-semibold text-alternative_2">
                                       {item.product.productName}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex flex-wrap gap-3">
                                 <div className="inline-flex items-center rounded border border-secondary/40 bg-white/70 px-2 py-2 shadow-inner">
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
                                          className="h-8 w-8 rounded text-lg text-alternative_2 transition hover:bg-secondary/30"
                                       >
                                          -
                                       </button>
                                    </fetcher.Form>
                                    <input
                                       type="text"
                                       className="w-12 bg-transparent text-center text-sm font-semibold text-alternative_2"
                                       value={item.quantity}
                                       readOnly
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
                                          className="h-8 w-8 rounded text-lg text-alternative_2 transition hover:bg-secondary/30"
                                       >
                                          +
                                       </button>
                                    </fetcher.Form>
                                 </div>
                                 <p className="text-sm text-alternative_2">
                                    {(
                                       item.product.price * item.quantity
                                    ).toLocaleString()}{' '}
                                    VND
                                 </p>
                              </div>
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
                                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-rose-500 transition hover:text-rose-700"
                                 >
                                    <FaTrash /> Remove
                                 </button>
                              </fetcher.Form>
                           </React.Fragment>
                        ))
                     ) : (
                        <div className="rounded border border-dashed border-alternative_1/30 bg-white/70 px-6 py-8 text-center text-sm text-alternative_1">
                           Your cart is empty. Add a product to begin checkout.
                        </div>
                     )}
                  </div>
               </div>

               <div className="rounded border border-white/60 bg-white/85 p-6 shadow-2xl shadow-primary/20 space-y-4">
                  <h5 className="text-xl font-semibold text-alternative_2">
                     Cart total
                  </h5>
                  <p className="text-sm text-alternative_1">
                     Cart subtotal:{' '}
                     <span className="font-semibold text-alternative_2">
                        {totalPrice?.toLocaleString()} VND
                     </span>
                  </p>
                  <p className="text-sm text-alternative_1">
                     Discount:{' '}
                     <span className="font-semibold text-alternative_2">
                        100,000 VND
                     </span>
                  </p>
                  <p className="text-sm text-alternative_1">
                     Shipping:{' '}
                     <span className="font-semibold text-alternative_2">
                        FREE
                     </span>
                  </p>
                  <h5 className="text-lg font-semibold text-alternative_2">
                     Total:{' '}
                     <span>
                        {totalPrice
                           ? (totalPrice - 100000).toLocaleString()
                           : 0}
                        VND
                     </span>
                  </h5>
                  {data.cart && data.cart?.CartItems.length > 0 && (
                     <fetcher.Form method="post" className="space-y-4 pt-2">
                        <FormInput
                           htmlFor="address"
                           id="address"
                           label="Shipping address"
                           value={checkoutDetails.address}
                           onchange={handleCheckoutDetailChange}
                           required
                        />
                        <FormInput
                           htmlFor="phone"
                           id="phone"
                           label="Telephone number"
                           type="tel"
                           value={checkoutDetails.phone}
                           onchange={handleCheckoutDetailChange}
                           required
                           errors={checkoutErrors.phone}
                        />
                        <input
                           type="hidden"
                           name="data_create_order"
                           readOnly
                           value={orderValue}
                        />
                        <button
                           type="submit"
                           name="_action"
                           value="createOrder"
                           disabled={isCheckoutDisabled}
                           className="w-full rounded bg-alternative_2 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-primary shadow-lg shadow-alternative_2/40 transition hover:-translate-y-0.5 hover:bg-alternative_2/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-alternative_2"
                        >
                           Proceed to payment
                        </button>
                     </fetcher.Form>
                  )}
               </div>
            </div>
         </div>
      </section>
   );
}
