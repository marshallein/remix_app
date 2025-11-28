import { OrderStatus } from '@prisma/client';
import {
   json,
   LoaderFunctionArgs,
   MetaFunction,
   redirect,
} from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { FaHouse } from 'react-icons/fa6';
import { getUser } from '~/modules/server/auth.server';
import { getAllOrdersById } from '~/modules/server/order.server';

export const meta: MetaFunction = () => {
   return [{ title: 'Your Orders' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
   const user = await getUser(request);
   if (!user) {
      return redirect('/login');
   }

   const userOrders = await getAllOrdersById(user.id);

   return json({ orders: userOrders }, { status: 200 });
};

export default function OrdersPage() {
   const { orders } = useLoaderData<typeof loader>();

   const statusColorMap: Record<OrderStatus, string> = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Shipped: 'bg-blue-100 text-blue-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
   };

   const hasOrders = Boolean(orders?.length);

   return (
      <section className="min-h-screen bg-white">
         <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-0">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-alternative_1">
               <FaHouse />
               <Link to="/" className="transition hover:text-alternative_2">
                  Home
               </Link>
               <span className="text-alternative_1/60">/</span>
               <span className="text-alternative_2">Orders</span>
            </div>
            <div className="mt-8 flex flex-col gap-2">
               <p className="text-xs uppercase tracking-[0.45em] text-secondary">
                  Orders
               </p>
               <h1 className="text-3xl font-light text-alternative_2">
                  Your order history
               </h1>
               <p className="text-sm text-alternative_1">
                  Track the status of recent purchases and review what&apos;s on
                  the way.
               </p>
            </div>

            {!hasOrders ? (
               <div className="mt-12 rounded border border-dashed border-alternative_1/20 bg-white p-8 text-center text-alternative_1 shadow-sm">
                  <p className="text-lg font-semibold text-alternative_2">
                     No orders yet
                  </p>
                  <p className="mt-2 text-sm">
                     When you place an order it will show up here.{' '}
                     <Link
                        to="/products"
                        className="font-semibold text-alternative_2 underline"
                     >
                        Start shopping
                     </Link>
                     .
                  </p>
               </div>
            ) : (
               <div className="mt-10 space-y-6">
                  {orders?.map((order) => {
                     const totalItems = order.OrderItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                     );

                     return (
                        <article
                           key={order.id}
                           className="rounded-lg border border-alternative_1/10 bg-white/95 p-6 shadow-lg shadow-secondary/10"
                        >
                           <div className="flex flex-wrap items-center justify-between gap-4">
                              <div>
                                 <p className="text-xs uppercase tracking-[0.35em] text-secondary">
                                    Order
                                 </p>
                                 <h3 className="text-2xl font-semibold text-alternative_2">
                                    {order.orderName}
                                 </h3>
                              </div>
                              <span
                                 className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColorMap[order.status] || 'bg-slate-100 text-slate-800'}`}
                              >
                                 {order.status}
                              </span>
                           </div>
                           <dl className="mt-6 grid gap-4 text-sm text-alternative_1 sm:grid-cols-3">
                              <div>
                                 <dt className="uppercase tracking-[0.25em] text-secondary">
                                    Items
                                 </dt>
                                 <dd className="text-lg font-semibold text-alternative_2">
                                    {totalItems}
                                 </dd>
                              </div>
                              <div>
                                 <dt className="uppercase tracking-[0.25em] text-secondary">
                                    Total paid
                                 </dt>
                                 <dd className="text-lg font-semibold text-alternative_2">
                                    {order.totalPrice.toLocaleString()} VND
                                 </dd>
                              </div>
                              <div>
                                 <dt className="uppercase tracking-[0.25em] text-secondary">
                                    Reference
                                 </dt>
                                 <dd className="text-lg font-semibold text-alternative_2">
                                    #{order.orderName}
                                 </dd>
                              </div>
                           </dl>
                           {!!order.OrderItems.length && (
                              <div className="mt-6 border-t border-alternative_1/10 pt-4">
                                 <p className="text-xs uppercase tracking-[0.3em] text-secondary">
                                    Items summary
                                 </p>
                                 <ul className="mt-3 space-y-2 text-sm text-alternative_1">
                                    {order.OrderItems.map((item) => (
                                       <li
                                          key={item.id}
                                          className="flex items-center justify-between rounded border border-alternative_1/10 bg-secondary/10 px-3 py-2"
                                       >
                                          <Link
                                             to={`/product/${item.productId}`}
                                             className="hover:underline"
                                          >
                                             Product #{item.productId}:{' '}
                                             {item.product.productName}
                                          </Link>
                                          <span>Qty: {item.quantity}</span>
                                          <span className="font-semibold text-alternative_2">
                                             {item.price.toLocaleString()} VND
                                          </span>
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           )}
                        </article>
                     );
                  })}
               </div>
            )}
         </div>
      </section>
   );
}
