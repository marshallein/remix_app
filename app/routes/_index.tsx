import type { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { useCallback } from 'react';
import SliderCarousel from '~/components/Slider';
import SmallSliderCarousel from '~/components/SmallSlider';
import { IMAGE_FALL_BACK_URL } from '~/modules/domain';
import { getCollectionInfo } from '~/modules/server/collection.server';
import { getAllFeedbacks } from '~/modules/server/feedback.server';
import {
   getProductsByCollection,
   getProductsByPromotion,
} from '~/modules/server/product.server';

export const meta: MetaFunction = () => {
   return [{ title: 'Home Page' }];
};

const bannerImage: string[] = [
   '/banner.jpg',
   '/banner1.jpg',
   '/poster.jpg',
   '/poster1.jpg',
];

export const loader = async () => {
   const collectionInfo = await getCollectionInfo('AY2024');
   const [bestSellerProduct, onSaleProduct, collections, feedbacks] =
      await Promise.all([
         getProductsByPromotion('Best_Seller'),
         getProductsByPromotion('Sale'),
         getProductsByCollection(collectionInfo?.collectionCode || ''),
         getAllFeedbacks(),
      ]);

   return {
      bestSellerProduct,
      onSaleProduct,
      collections,
      collectionInfo,
      feedbacks,
   };
};

export default function Index() {
   const {
      bestSellerProduct,
      onSaleProduct,
      collections,
      collectionInfo,
      feedbacks,
   } = useLoaderData<typeof loader>();
   const navigate = useNavigate();

   const handleOnClickProduct = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
         event.preventDefault();

         navigate(`/product/${event.currentTarget.id}`);
      },
      [navigate],
   );

   return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-12 space-y-12">
         <div className="w-full rounded border border-white/50 bg-white/70 p-4 shadow-xl shadow-[0_25px_70px_rgba(0,0,0,0.07)] backdrop-blur">
            <SliderCarousel images={bannerImage} />
         </div>

         {/* <!-- Best Seller Product Section --> */}
         <section className="space-y-6">
            <div className="flex items-end justify-between">
               <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-alternative_1">
                     Featured
                  </p>
                  <h2 className="text-4xl font-light text-alternative_2">
                     Best Seller Product
                  </h2>
               </div>
               <Link
                  to="/products?promotion=Best_Seller"
                  className="rounded border border-alternative_2/20 px-4 py-2 text-sm font-semibold text-alternative_2 transition hover:bg-alternative_2 hover:text-primary"
               >
                  View all
               </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
               {bestSellerProduct.map((product, idx) => (
                  <div
                     className="group flex flex-col overflow-hidden rounded border border-white/50 bg-white/90 shadow-2xl shadow-secondary/30 transition hover:-translate-y-1 hover:bg-white"
                     key={idx}
                     id={String(product.id)}
                     tabIndex={0}
                     onKeyDown={() => {}}
                     role="button"
                     onClick={handleOnClickProduct}
                  >
                     <div className="w-full h-[320px] bg-secondary/20">
                        <img
                           src={product.mainImageString || IMAGE_FALL_BACK_URL}
                           alt="Product 1"
                           className="h-full w-full object-cover"
                        />
                     </div>
                     <div className="px-6 py-5 space-y-2">
                        <p className="text-lg font-semibold text-alternative_2">
                           {product.productName}
                        </p>
                        <span className="text-sm uppercase tracking-[0.3em] text-alternative_1">
                           {product.price.toLocaleString()} VND
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* <!-- Traditional Collection Section --> */}
         {collectionInfo && (
            <section className="rounded bg-alternative_2 text-primary shadow-2xl shadow-alternative_2/30">
               <div className="grid gap-6 p-8 md:grid-cols-[1fr,1.2fr] md:items-center">
                  <div className="space-y-4">
                     <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                        Signature drop
                     </p>
                     <h2 className="text-4xl font-light">
                        {collectionInfo.collectionName}
                     </h2>
                     <p className="text-primary/80 leading-relaxed">
                        {collectionInfo.description}
                     </p>
                     <Link
                        to={`/products?collectionId=${collectionInfo.collectionCode}`}
                     >
                        <button className="rounded bg-secondary px-6 py-3 text-sm font-semibold text-alternative_2 transition hover:bg-primary">
                           See the collection now
                        </button>
                     </Link>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                     <div className="h-[280px] overflow-hidden rounded">
                        <img
                           src="/poster.jpg"
                           alt="Traditional Collection 1"
                           className="h-full w-full object-cover"
                        />
                     </div>
                     <div className="h-[280px] overflow-hidden rounded">
                        <img
                           src="/poster1.jpg"
                           alt="Traditional Collection 2"
                           className="h-full w-full object-cover"
                        />
                     </div>
                  </div>
               </div>
            </section>
         )}
         {collectionInfo && (
            <section className="rounded border border-alternative_1/20 bg-white/80 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.07)]">
               <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
                  <div className="flex flex-col gap-10 space-y-4 lg:basis-2/5">
                     <div>
                        <p className="text-xs uppercase tracking-[0.45em] text-secondary">
                           New collection
                        </p>
                        <h2 className="text-4xl font-light text-alternative_2">
                           {collectionInfo.collectionName}
                        </h2>
                     </div>
                     <p className="text-alternative_1">
                        Discover fresh silhouettes curated for this season.
                        Swipe through highlight pieces below.
                     </p>
                     <Link
                        to={`/products?collectionId=${collectionInfo.collectionCode}`}
                     >
                        <button className="rounded bg-alternative_2 px-6 py-3 text-sm font-semibold text-primary shadow-lg shadow-alternative_2/40 transition hover:-translate-y-0.5 hover:bg-alternative_2/90">
                           See the collection
                        </button>
                     </Link>
                  </div>
                  <div className="rounded border border-secondary/40 bg-secondary/70 p-4">
                     <SmallSliderCarousel
                        images={collections.map((item) => item.mainImageString)}
                        delay={3000}
                     />
                  </div>
               </div>
            </section>
         )}

         {/* <!-- On Sales Section --> */}
         <section className="space-y-6 rounded border border-alternative_1/20 bg-white/90 p-8shadow-[0_25px_70px_rgba(0,0,0,0.07)]">
            <div className="flex flex-col gap-2 text-center">
               <p className="text-xs uppercase tracking-[0.5em] text-secondary">
                  Limited time
               </p>
               <h2 className="text-4xl font-light text-alternative_2">
                  On Sales
               </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
               {onSaleProduct.map((product, idx) => (
                  <div
                     className="flex flex-col rounded border border-secondary/20 bg-gradient-to-br from-primary/70 to-white/90 p-4 text-center shadow-lg shadow-secondary/30 transition hover:-translate-y-1"
                     key={idx}
                     id={String(product.id)}
                     tabIndex={0}
                     onKeyDown={() => {}}
                     role="button"
                     onClick={handleOnClickProduct}
                  >
                     <div className="h-56 overflow-hidden rounded bg-white">
                        <img
                           src={product.mainImageString || IMAGE_FALL_BACK_URL}
                           alt="Product 1"
                           className="h-full w-full object-cover"
                        />
                     </div>
                     <p className="mt-4 text-sm font-semibold text-alternative_2">
                        {product.productName}
                     </p>
                     <span className="text-xs uppercase tracking-[0.35em] text-alternative_1">
                        {product.price.toLocaleString()} VND
                     </span>
                  </div>
               ))}
            </div>
         </section>

         <section className="rounded border border-white/60 bg-white/90 p-8 shadow-2xl shadow-secondary/30">
            <div className="text-center space-y-3">
               <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                  Feedback
               </p>
               <h2 className="text-4xl font-light text-alternative_2">
                  Stories from the community
               </h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
               {feedbacks.map((item, index) => (
                  <div
                     key={index}
                     id="feedback_cards"
                     className="flex flex-col items-center rounded border border-primary/40 bg-gradient-to-b from-primary/70 to-white/90 px-6 py-8 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                  >
                     <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
                        <img
                           className="h-full w-full object-cover"
                           src={item.avatarUrl}
                           alt="avatar"
                        />
                     </div>
                     <p className="text-lg font-semibold text-alternative_2">
                        {item.customer}
                     </p>
                     <p className="mt-4 text-sm text-alternative_1">
                        {item.comment}
                     </p>
                  </div>
               ))}
            </div>
         </section>
      </div>
   );
}
