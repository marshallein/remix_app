import {
   ActionFunctionArgs,
   json,
   LoaderFunctionArgs,
   redirect,
} from '@remix-run/node';
import { MetaFunction, useFetcher, useLoaderData, Link } from '@remix-run/react';
import { Product } from '@prisma/client';
import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import { IMAGE_FALL_BACK_URL } from '~/modules/domain';
import { getProductById } from '~/modules/server/product.server';
import { addToCart, AddToCartType } from '~/modules/server/user.server';
import { getUser } from '~/modules/server/auth.server';

export const meta: MetaFunction = () => {
   return [{ title: 'Product Page' }];
};

//loader
export const loader = async ({ params }: LoaderFunctionArgs) => {
   if (!params.id) return;

   const product = (await getProductById(Number(params.id))) as Product;

   return { product };
};

//action
export const action = async ({ request }: ActionFunctionArgs) => {
   const user = await getUser(request);

   if (!user) {
      return redirect("/login");
   }

   const data = await request.formData();
   const action = data.get('_action');
   const productId = data.get('id');
   const quantity = data.get('quantity');

   const payload: AddToCartType = {
      productId: Number(productId),
      quantity: Number(quantity),
      userId: Number(user?.id),
   };

   switch (action) {
      case 'addToCart': {
         await addToCart(payload);
         break;
      }
      case 'buyNow': {
         await addToCart(payload);
         return redirect('/cart');
      }
      default: {
         throw new Response('Bad Request', { status: 400 });
      }
   }
   return json({ success: true });
};

//component
export default function ProductDetail() {
   const [quantity, setQuantity] = useState<number>(1);
   const data = useLoaderData<typeof loader>();
   const [displayImage, setDisplayImage] = useState<string>('');

   const fetcher = useFetcher();

   const handleClickButtonQuantity = useCallback(
      (decrease?: boolean) => {
         if (decrease) {
            setQuantity(_.clamp(quantity - 1, 1, 10));
         } else {
            setQuantity(_.clamp(quantity + 1, 1, 10));
         }
      },
      [quantity],
   );

   const imagesSet = useMemo(() => {
      if (data) {
         return [
            ...data.product.imageSet,
            data.product.mainImageString,
         ].filter(Boolean) as string[];
      } else {
         return [IMAGE_FALL_BACK_URL];
      }
   }, [data]);

   const salePrice = useMemo(() => {
      if (data?.product.salePercent) {
         return (
            data.product.price -
            (data.product.salePercent / 100) * data.product.price
         );
      } else {
         return null;
      }

   }, [data?.product.price, data?.product.salePercent]);

   const recommendations = useMemo(() => {
      const tag = data?.product.tags ?? 'Modern';
      const accentImage =
         data?.product.imageSet[0] ||
         data?.product.mainImageString ||
         IMAGE_FALL_BACK_URL;

      return [
         {
            title: `More ${tag} pieces`,
            description:
               'Curated silhouettes that echo the lines and palette of this design.',
            href: `/products?tag=${tag}`,
            image: accentImage,
         },
         {
            title: 'Seasonal picks',
            description: 'Limited-color capsules arriving weekly.',
            href: '/products?promotion=Best_Seller',
            image: '/poster1.jpg',
         },
      ];
   }, [data?.product]);

   return (
      <section className="min-h-screen bg-gradient-to-br from-primary/70 via-white to-secondary/40">
         <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6 lg:px-0">
            <div className="text-center">
               <p className="text-xs uppercase tracking-[0.45em] text-secondary">
                  Product details
               </p>
               <h1 className="mt-2 text-4xl font-light text-alternative_2">
                  {data?.product?.productName}
               </h1>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
               <div className="space-y-6 rounded border border-white/60 bg-white/80 p-6 shadow-2xl shadow-primary/30">
                  <div className="rounded border border-secondary/30 bg-secondary/10 p-6">
                     <img
                        src={
                           displayImage !== ''
                              ? displayImage
                              : data?.product.mainImageString ||
                                IMAGE_FALL_BACK_URL
                        }
                        alt="Main product visual"
                        className="h-[540px] w-full rounded object-cover"
                     />
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                     {imagesSet.map((item, idx) => (
                        <button
                           type="button"
                           key={idx}
                           onClick={() => setDisplayImage(item)}
                           className="rounded border border-secondary/30 bg-white/80 p-1 transition hover:border-secondary hover:bg-secondary/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40"
                        >
                           <img
                              src={item || IMAGE_FALL_BACK_URL}
                              alt={`Thumbnail ${idx + 1}`}
                              className="h-28 w-full rounded object-cover"
                           />
                        </button>
                     ))}
                  </div>
               </div>
               <div className="space-y-8 rounded border border-white/70 bg-white/90 p-8 shadow-2xl shadow-secondary/40">
                  <div className="space-y-3">
                     <p className="text-xs uppercase tracking-[0.45em] text-secondary">
                        Silk Charm
                     </p>
                     <h2 className="text-3xl font-semibold text-alternative_2">
                        {data?.product?.productName}
                     </h2>
                     <div className="flex items-baseline gap-4">
                        {salePrice ? (
                           <>
                              <span className="text-3xl font-bold text-alternative_2">
                                 {salePrice.toLocaleString()} VND
                              </span>
                              <span className="text-lg text-alternative_1 line-through">
                                 {data?.product?.price.toLocaleString()} VND
                              </span>
                           </>
                        ) : (
                           <span className="text-3xl font-bold text-alternative_2">
                              {data?.product?.price.toLocaleString()} VND
                           </span>
                        )}
                     </div>
                     <p className="text-sm leading-relaxed text-alternative_1">
                        {data?.product?.description}
                     </p>
                  </div>

                  <div className="space-y-2">
                     <h6 className="text-xs uppercase tracking-[0.35em] text-secondary">
                        Materials
                     </h6>
                     <p className="text-sm text-alternative_2">
                        100% Premium Cloths
                     </p>
                  </div>

                  <div className="space-y-3">
                     <h6 className="text-xs uppercase tracking-[0.35em] text-secondary">
                        Available colors
                     </h6>
                     <div className="flex flex-wrap gap-3">
                        {data?.product.AvailableColor.map((color, idx) => (
                           <span
                              key={idx}
                              className="inline-flex items-center gap-2 rounded-full border border-alternative_1/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-alternative_2"
                           >
                              <span
                                 className="h-4 w-4 rounded-full border border-alternative_2/20"
                                 style={{ backgroundColor: color }}
                              />
                              {color}
                           </span>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-3">
                     <h6 className="text-xs uppercase tracking-[0.35em] text-secondary">
                        Quantity
                     </h6>
                     <div className="inline-flex items-center rounded-full border border-secondary/40 bg-white/60 px-2 py-2 shadow-inner shadow-secondary/30">
                        <button
                           className="h-10 w-10 rounded-full text-xl text-alternative_2 transition hover:bg-secondary/30"
                           type="button"
                           id="decrease-quantity"
                           onClick={() => handleClickButtonQuantity(true)}
                        >
                           -
                        </button>
                        <input
                           name="quantity"
                           type="text"
                           className="w-16 bg-transparent text-center text-base font-semibold text-alternative_2 focus:outline-none"
                           id="quantity"
                           readOnly
                           value={quantity}
                        />
                        <button
                           className="h-10 w-10 rounded-full text-xl text-alternative_2 transition hover:bg-secondary/30"
                           type="button"
                           id="increase-quantity"
                           onClick={() => handleClickButtonQuantity(false)}
                        >
                           +
                        </button>
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                     <fetcher.Form method="post" className="flex-1 min-w-[160px]">
                        <input
                           type="hidden"
                           name="quantity"
                           readOnly
                           value={quantity}
                        />
                        <input
                           type="hidden"
                           name="id"
                           value={data?.product?.id}
                           readOnly
                        />
                        <button
                           className="w-full rounded border border-alternative_2/40 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-alternative_2 shadow-lg shadow-secondary/20 transition hover:-translate-y-0.5 hover:bg-secondary/30"
                           type="submit"
                           name="_action"
                           value="addToCart"
                        >
                           Add to cart
                        </button>
                     </fetcher.Form>

                     <fetcher.Form method="post" className="flex-1 min-w-[160px]">
                        <input
                           type="hidden"
                           name="quantity"
                           readOnly
                           value={quantity}
                        />
                        <input
                           type="hidden"
                           name="id"
                           value={data?.product?.id}
                           readOnly
                        />
                        <button
                           className="w-full rounded bg-alternative_2 px-5 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-primary shadow-xl shadow-alternative_2/40 transition hover:-translate-y-0.5 hover:bg-alternative_2/90"
                           type="submit"
                           name="_action"
                           value="buyNow"
                        >
                           Buy now
                        </button>
                     </fetcher.Form>
                  </div>
               </div>
            </div>
            <div className="mt-12 rounded border border-white/60 bg-white/85 p-6 shadow-lg shadow-primary/30">
               <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                     <p className="text-xs uppercase tracking-[0.45em] text-secondary">
                        Recommended
                     </p>
                     <h3 className="text-3xl font-light text-alternative_2">
                        You might also like
                     </h3>
                  </div>
                  <Link
                     to="/products"
                     className="rounded border border-alternative_2/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-alternative_2 transition hover:bg-secondary/30"
                  >
                     Browse all
                  </Link>
               </div>
               <div className="mt-6 flex gap-5 overflow-x-auto pb-3">
                  {recommendations.map((item, idx) => (
                     <Link
                        key={idx}
                        to={item.href}
                        className="group flex min-w-[240px] flex-col rounded border border-secondary/30 bg-white/90 p-4 text-left shadow-md transition hover:-translate-y-1 hover:bg-white"
                     >
                        <div className="h-40 overflow-hidden rounded bg-secondary/10">
                           <img
                              src={item.image || IMAGE_FALL_BACK_URL}
                              alt={item.title}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                           />
                        </div>
                        <p className="mt-4 text-lg font-semibold text-alternative_2">
                           {item.title}
                        </p>
                        <p className="text-sm text-alternative_1">
                           {item.description}
                        </p>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
