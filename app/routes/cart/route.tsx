import { json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUser } from '~/modules/server/auth.server';
import { getUserCartInfo } from '~/modules/server/user.server';
import { FaHouse } from 'react-icons/fa6';


export const loader = async ({
   request,
}: LoaderFunctionArgs) => {
   const user = await getUser(request);

   if (!user) {
      return redirect("/login");
   }

   const userCart = await getUserCartInfo(String(user.id));

   console.log(userCart);


   return json({ cart: userCart }, { status: 200 });
};

export default function CartPage() {
   const data = useLoaderData<typeof loader>();

   return (
      <div className="container">
         <div className="breadcrumb">
            <li className="breadcrumb-item">
               <a href="home.html">
                  <FaHouse />
                  Home
               </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
               Shopping cart
            </li>
         </div>

         <div className="cart-container row">
            <div className="col-md-8">
               {data.cart?.CartItems.map((item) => (
                  <div className="cart-item d-flex align-items-center" key={item.id}>
                     <div className="product-image me-3">
                        <img
                           src="/aodai1.jpg"
                           alt="Product"
                           style={{
                              width: '80px',
                              height: '80px',
                              border: '1px solid #ddd',
                           }}
                        />
                     </div>
                     <div>
                        <p>
                           <strong>{item.product.tags}</strong>
                           <br />
                           {item.product.productName}
                           <br />
                           Color: <br />
                           Size:
                        </p>
                     </div>
                     <div className="ms-auto text-end">
                        <div className="d-flex align-items-center">
                           <button className="btn btn-light btn-sm">-</button>
                           <input
                              type="text"
                              className="form-control text-center mx-2"
                              value={item.quantity}
                              style={{ width: '50px' }}
                           />
                           <button className="btn btn-light btn-sm">+</button>
                        </div>
                        <p className="mt-2">{(item.product.price * item.quantity).toLocaleString()}VND</p>
                     </div>
                  </div>
               ))}

               <a href="product.html" className="btn btn-outline-dark mt-3">
                  <i className="bi bi-arrow-left"></i> Continue viewing more
                  products
               </a>
            </div>

            <div className="col-md-4">
               <div className="coupon-code mb-4">
                  <h5>COUPON CODE</h5>
                  <p>Please enter coupon code to receive 30% discount</p>
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Coupon Code"
                  />
                  <button className="btn btn-dark w-100 mt-2">Apply</button>
               </div>

               <div className="cart-summary">
                  <h5>Cart Total</h5>
                  <p>
                     Cart Subtotal:{' '}
                     <span className="float-end">4.000.000 VND</span>
                  </p>
                  <p>
                     Discount:{' '}
                     <span className="float-end">-500.000 VND</span>
                  </p>
                  <p>
                     Shipping: <span className="float-end">FREE</span>
                  </p>
                  <h5>
                     Total: <span className="float-end">3.500.000 VND</span>
                  </h5>
                  <a
                     href="checkout.html"
                     className="btn btn-dark w-100 mt-3"
                  >
                     Proceed to payment
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
}
