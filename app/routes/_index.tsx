import type { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { useCallback } from 'react';
import SliderCarousel from '~/components/Slider';
import SmallSliderCarousel from '~/components/SmallSlider';
import { IMAGE_FALL_BACK_URL } from '~/modules/domain';
import { getCollectionInfo } from '~/modules/server/collection.server';
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
   const [bestSellerProduct, onSaleProduct, collections] = await Promise.all([
      getProductsByPromotion('Best_Seller'),
      getProductsByPromotion('Sale'),
      getProductsByCollection(collectionInfo?.collectionCode || ''),
   ]);

   return { bestSellerProduct, onSaleProduct, collections, collectionInfo };
};

export default function Index() {
   const { bestSellerProduct, onSaleProduct, collections, collectionInfo } =
      useLoaderData<typeof loader>();
   const navigate = useNavigate();

   const handleOnClickProduct = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
         event.preventDefault();

         navigate(`/product/${event.currentTarget.id}`);
      },
      [navigate],
   );

   return (
      <div className="flex flex-col gap-y-5 p-3">
         <div className="w-full p-y-10">
            <SliderCarousel images={bannerImage} />
         </div>

         {/* <!-- Best Seller Product Section --> */}
         <section className="flex flex-col gap-y-3">
            <h2 className="font-thin text-6xl">BEST SELLER PRODUCT</h2>
            <div className="flex w-full">
               {bestSellerProduct.map((product, idx) => (
                  <div
                     className="w-full h-full max-w-[500px] max-h-[650px]"
                     key={idx}
                     id={String(product.id)}
                     tabIndex={0}
                     onKeyDown={() => {}}
                     role="button"
                     onClick={handleOnClickProduct}
                  >
                     <div className="w-full h-full">
                        <img
                           src={product.mainImageString || IMAGE_FALL_BACK_URL}
                           alt="Product 1"
                           className="object-contain"
                        />
                     </div>
                     <p>
                        {product.productName}
                        <br />
                        <span className="font-thin">
                           {product.price.toLocaleString()}VND
                        </span>
                     </p>
                  </div>
               ))}
            </div>
         </section>

         {/* <!-- Traditional Collection Section --> */}
         {collectionInfo && (
            <section className="flex flex-col bg-secondary">
               <div className="flex gap-x-3">
                  <h2 className="basis-[400px] text-6xl font-thin">
                     {collectionInfo.collectionName}
                  </h2>
                  <div className="">
                     <div className="">
                        <img
                           src="/poster.jpg"
                           alt="Traditional Collection 1"
                           className=""
                        />
                        <img
                           src="/poster.jpg"
                           alt="Traditional Collection 2"
                           className=""
                        />
                     </div>
                     <div className="">
                        <p>{collectionInfo.description}</p>
                        <Link
                           to={`/products?collectionId=${collectionInfo.collectionCode}`}
                        >
                           <button className="">SEE THE COLLECTION NOW</button>
                        </Link>
                     </div>
                  </div>
               </div>
            </section>
         )}
         {collectionInfo && (
            <section className="flex flex-col w-full">
               <div className="flex w-full justify-between gap-x-3">
                  <div className="flex gap-x-10 w-full">
                     <div className="flex flex-col gap-y-5">
                        <h2 className="text-6xl font-thin">!NEW COLLECTION!</h2>
                        <p className="text-4xl font-thin">
                           {collectionInfo.collectionName}
                        </p>
                        <Link
                           to={`/products?collectionId=${collectionInfo.collectionCode}`}
                        >
                           <button className="bg-primary p-3 rounded">
                              See the collection
                           </button>
                        </Link>
                     </div>

                     <div className="w-full">
                        <div className="">
                           <SmallSliderCarousel
                              images={collections.map(
                                 (item) => item.mainImageString,
                              )}
                              delay={3000}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         )}

         {/* <!-- On Sales Section --> */}
         <section className="on-sales my-5">
            <div className="container">
               <h2 className="on-sales-title">ON SALES</h2>
               <div className="row container mt-4 align-items-center">
                  {onSaleProduct.map((product, idx) => (
                     <div
                        className="col-md-3"
                        key={idx}
                        id={String(product.id)}
                        tabIndex={0}
                        onKeyDown={() => {}}
                        role="button"
                        onClick={handleOnClickProduct}
                     >
                        <div className="product-card">
                           <img
                              src={
                                 product.mainImageString || IMAGE_FALL_BACK_URL
                              }
                              alt="Product 1"
                              className="img-fluid"
                           />
                        </div>
                        <p style={{ textAlign: 'center', fontSize: '16px' }}>
                           {product.productName}
                           <br />
                           {product.price.toLocaleString()}$
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <section className="feedback my-5">
            <div className="container">
               <h2 className="feedback-title">FEEDBACK</h2>

               <div className="row text-center mt-4">
                  <div className="col-md-4">
                     <div className="feedback-card">
                        <div className="circle">
                           <img
                              className="img-thumbnail"
                              src="https://api.dicebear.com/9.x/lorelei/svg"
                              alt="avAtar"
                           />
                        </div>
                        <p className="customer-name">Naima Merlyn</p>
                        <p className="customer-country">Hawaiian</p>
                        <p className="customer-feedback">
                           Absolutely loved my new áo dài! The fabric feels
                           luxurious, and the embroidery is stunning. It fits
                           perfectly and made me feel so elegant at my
                           sister&apos;s wedding. Highly recommend this store
                           for their attention to detail and quality!
                        </p>
                     </div>
                  </div>

                  <div className="col-md-4">
                     <div className="feedback-card">
                        <div className="circle">
                           <img
                              className="img-thumbnail"
                              src="https://api.dicebear.com/9.x/lorelei/svg"
                              alt="avAtar"
                           />
                        </div>
                        <p className="customer-name">Bethsabée Saldís</p>
                        <p className="customer-country">Greek</p>
                        <p className="customer-feedback">
                           The áo dài I bought is beautiful, but the size runs a
                           little smaller than expected. Thankfully, the staff
                           was very helpful with the exchange process. Overall,
                           happy with the design and service.
                        </p>
                     </div>
                  </div>

                  <div className="col-md-4">
                     <div className="feedback-card">
                        <div className="circle">
                           <img
                              className="img-thumbnail"
                              src="https://api.dicebear.com/9.x/lorelei/svg"
                              alt="avAtar"
                           />
                        </div>
                        <p className="customer-name">Viona Myrthe</p>
                        <p className="customer-country">German</p>
                        <p className="customer-feedback">
                           I couldn&apos;t be happier with my purchase! The
                           color and pattern of the áo dài exceeded my
                           expectations, and it arrived in perfect condition.
                           It&apos;s clear they care about their customers and
                           their products. Will definitely shop here again!
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
