import type { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { useCallback, useRef, useState } from 'react';
import { ReasonComponent } from '~/components/Layout/Reason';
import SliderCarousel from '~/components/Slider';
import SmallSliderCarousel from '~/components/SmallSlider';
import {
   COLLECTION_POSTER_IMAGES,
   HOME_BANNER_IMAGES,
   LANDING_PAGE_IMAGE,
} from '~/constants/images';
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

const tagTabs = [
   { label: 'Modern Ao Dai', value: 'Modern' },
   { label: 'Traditional Ao Dai', value: 'Traditional' },
   { label: 'Long Dress', value: 'Long_Dress' },
   { label: 'Five-panel Ao Dai', value: 'Five_Panel' },
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
   const [hoveredProductId, setHoveredProductId] = useState<number | null>(
      null,
   );
   const onSaleListRef = useRef<HTMLDivElement | null>(null);

   const handleOnClickProduct = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
         event.preventDefault();

         navigate(`/product/${event.currentTarget.id}`);
      },
      [navigate],
   );

   const handleScrollOnSale = useCallback((direction: 'left' | 'right') => {
      if (!onSaleListRef.current) return;

      const scrollAmount = direction === 'left' ? -320 : 320;
      onSaleListRef.current.scrollBy({
         left: scrollAmount,
         behavior: 'smooth',
      });
   }, []);

   return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-12 space-y-12">
         <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[0.65rem] font-semibold tracking-[0.1em] text-alternative_1 sm:gap-3 sm:text-xs md:gap-4 md:text-sm">
            {tagTabs.map((tag) => (
               <Link
                  key={tag.value}
                  to={`/products?tag=${tag.value}`}
                  className="rounded-full px-3 py-1 transition hover:-translate-y-0.5 hover:bg-secondary/20 hover:text-alternative_2 sm:px-4 sm:py-2"
                  aria-label={`View ${tag.label}`}
               >
                  {tag.label}
               </Link>
            ))}
         </div>
         {/* Big landing page */}
         <div className="relative h-[650px] -mx-4 sm:-mx-6 lg:-mx-12">
            <img
               src={LANDING_PAGE_IMAGE}
               alt="landing_page"
               className="h-full w-full object-cover"
            />
            <div
               id="landing-page-button"
               className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/40 to-transparent px-4 text-center sm:justify-end sm:px-12 sm:text-right"
            >
               <div className="flex w-full max-w-3xl flex-col items-center space-y-6 text-primary sm:items-end">
                  <div className="space-y-2">
                     <p className="text-xs uppercase tracking-[0.4em] text-primary/80 sm:text-sm">
                        Timeless Collection
                     </p>
                     <h1 className="text-3xl font-light uppercase tracking-[0.25em] text-primary sm:text-5xl">
                        with more elegance reimagined
                     </h1>
                     <p className="text-sm text-primary/90 sm:text-base">
                        Discover handcrafted Ao Dai designs blending heritage
                        with modern silhouettes. Limited pieces available now.
                     </p>
                  </div>
                  <Link
                     className="rounded-full bg-primary/90 px-6 py-3 text-base font-semibold uppercase tracking-[0.2em] text-alternative_2 shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/70 sm:px-8 sm:text-lg"
                     aria-label="Shop the latest collection"
                     to="/products"
                  >
                     Shop Now
                  </Link>
               </div>
            </div>
         </div>

         <div className="w-full rounded border border-white/50 bg-white/70 p-4 shadow-[0_25px_70px_rgba(0,0,0,0.07)] backdrop-blur">
            <SliderCarousel images={HOME_BANNER_IMAGES} />
         </div>

         {/* <!-- Best Seller Product Section --> */}
         <section className="space-y-6">
            <div className="flex flex-col items-center justify-center">
               <p className="text-xs uppercase tracking-[0.4em] text-alternative_1">
                  Featured
               </p>
               <h2 className="text-4xl font-light text-alternative_2">
                  Best Seller Product
               </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
               {bestSellerProduct.map((product, idx) => (
                  <div
                     className="group flex flex-col overflow-hidden md:max-w-[305px] rounded border border-white/50 bg-white/90 shadow-2xl shadow-secondary/30 transition hover:-translate-y-1 hover:bg-white hover:scale-105"
                     key={idx}
                     id={String(product.id)}
                     tabIndex={0}
                     onKeyDown={() => {}}
                     role="button"
                     onClick={handleOnClickProduct}
                     onMouseEnter={() => setHoveredProductId(product.id)}
                     onMouseLeave={() => setHoveredProductId(null)}
                     onFocus={() => setHoveredProductId(product.id)}
                     onBlur={() => setHoveredProductId(null)}
                  >
                     <div className="w-full h-[420px] bg-secondary/20">
                        <img
                           src={
                              hoveredProductId === product.id &&
                              product.imageSet?.length
                                 ? product.imageSet[0] ||
                                   product.mainImageString ||
                                   IMAGE_FALL_BACK_URL
                                 : product.mainImageString ||
                                   IMAGE_FALL_BACK_URL
                           }
                           alt="Product 1"
                           className="h-full w-full object-cover transition duration-300"
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
            <div className="flex justify-center">
               <Link
                  to="/products?promotion=Best_Seller"
                  className="rounded border border-alternative_2/20 px-7 py-3 text-lg font-semibold bg-white text-alternative_2 transition hover:bg-alternative_2 hover:text-primary"
               >
                  View all Best Seller Items
               </Link>
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
                     {COLLECTION_POSTER_IMAGES.map((imageSrc, index) => (
                        <div
                           key={imageSrc}
                           className="h-[280px] overflow-hidden rounded"
                        >
                           <img
                              src={imageSrc}
                              alt={`Traditional Collection ${index + 1}`}
                              className="h-full w-full object-cover"
                           />
                        </div>
                     ))}
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
         <section className="space-y-6 p-5  rounded border border-alternative_1/20 bg-white/90 p-8shadow-[0_25px_70px_rgba(0,0,0,0.07)]">
            <div className="flex flex-col gap-2 text-center">
               <p className="text-xs uppercase tracking-[0.5em] text-secondary">
                  Limited time
               </p>
               <h2 className="text-4xl font-light text-alternative_2">
                  On Sales
               </h2>
            </div>
            <div className="relative md:px-9">
               <button
                  type="button"
                  className="absolute -left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-secondary p-3 text-white shadow-xl ring-2 ring-secondary/30 transition hover:-translate-x-1 hover:bg-secondary/90 md:flex"
                  onClick={() => handleScrollOnSale('left')}
                  aria-label="Scroll sale items left"
               >
                  <span className="text-lg font-semibold">‹</span>
               </button>
               <div
                  className="flex gap-6 overflow-x-auto pb-4"
                  ref={onSaleListRef}
               >
                  {onSaleProduct.map((product, idx) => (
                     <div
                        className="flex min-w-[250px] flex-shrink-0 flex-col rounded border border-secondary/20 p-4 text-center shadow-lg shadow-secondary/30 transition hover:-translate-y-1"
                        key={idx}
                        id={String(product.id)}
                        tabIndex={0}
                        onKeyDown={() => {}}
                        role="button"
                        onClick={handleOnClickProduct}
                     >
                        <div className=" relative h-72 overflow-hidden rounded bg-white">
                           <img
                              src={
                                 product.mainImageString || IMAGE_FALL_BACK_URL
                              }
                              alt="Product 1"
                              className="h-full w-full object-cover"
                           />
                           {product.salePercent !== 0 && (
                              <div className="absolute left-4 top-4 rounded-full bg-rose-500/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white">
                                 {product.salePercent}% off
                              </div>
                           )}
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
               <button
                  type="button"
                  className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-secondary p-3 text-white shadow-xl ring-2 ring-secondary/30 transition hover:translate-x-1 hover:bg-secondary/90 md:flex"
                  onClick={() => handleScrollOnSale('right')}
                  aria-label="Scroll sale items right"
               >
                  <span className="text-lg font-semibold">›</span>
               </button>
            </div>
         </section>

         <section className="rounded border border-alternative_1/20 bg-white/90 p-8 shadow-2xl shadow-secondary/30">
            <div className="text-center space-y-3">
               <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                  Feedback
               </p>
               <h2 className="text-4xl font-light text-alternative_2">
                  Stories from the community
               </h2>
            </div>
            <div className="mt-8 flex gap-6 overflow-x-auto pb-4">
               {feedbacks.map((item, index) => (
                  <div
                     key={index}
                     id="feedback_cards"
                     className="flex min-w-[240px] basis-[calc(25%-1rem)] flex-shrink-0 flex-col items-center rounded border border-primary/40 bg-gradient-to-b from-primary/70 to-white/90 px-6 py-10 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl min-h-[380px]"
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

         {/* Reason to choose section */}
         <ReasonComponent />
      </div>
   );
}
