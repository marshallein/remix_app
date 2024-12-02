import type { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { useCallback } from 'react';
import SliderCarousel from '~/components/Slider';
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
      <>
         <SliderCarousel images={bannerImage} />

         {/* <!-- Best Seller Product Section --> */}
         <section className="container my-5">
            <h2 className="text-center">BEST SELLER PRODUCT</h2>
            <div className="row text-center">
               {bestSellerProduct.map((product, idx) => (
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
                           src={product.mainImageString || IMAGE_FALL_BACK_URL}
                           alt="Product 1"
                           className="img-fluid"
                        />
                     </div>
                     <p>
                        {product.productName}
                        <br />
                        {product.price.toLocaleString()}$
                     </p>
                  </div>
               ))}
            </div>
         </section>

         {/* <!-- Traditional Collection Section --> */}
         {collectionInfo && (
            <section className="collection-section my-5">
               <div className="container">
                  <h2>{collectionInfo.collectionName}</h2>
                  <div className="row align-items-center">
                     <div className="col-md-8">
                        <img
                           src="/poster.jpg"
                           alt="Traditional Collection 1"
                           className="img-fluid mb-3"
                        />
                        <img
                           src="/poster.jpg"
                           alt="Traditional Collection 2"
                           className="img-fluid"
                        />
                     </div>
                     <div className="col-md-4">
                        <p>{collectionInfo.description}</p>
                        <Link
                           to={`/products?collectionId=${collectionInfo.collectionCode}`}
                        >
                           <button className="btn btn-dark mb-4">
                              SEE THE COLLECTION NOW
                           </button>
                        </Link>
                     </div>
                  </div>
               </div>
            </section>
         )}
         {collectionInfo && (
            <section className="new-collection my-5 text-center">
               <div className="container">
                  <div className="row align-items-center">
                     <div className="col-md-6 text-left">
                        <h2>NEW COLLECTION</h2>
                        <p>{collectionInfo.collectionName}</p>
                        <Link
                           to={`/products?collectionId=${collectionInfo.collectionCode}`}
                        >
                           <button className="btn btn-dark mb-4">
                              BUY NOW
                           </button>
                        </Link>
                     </div>

                     <div className="col-md-6">
                        <div className="row">
                           {collections.map((product, idx) => (
                              <div className="col-4" key={idx}>
                                 <img
                                    src={
                                       product.mainImageString ||
                                       IMAGE_FALL_BACK_URL
                                    }
                                    alt={'item ' + idx}
                                    className="img-fluid short-image item-1"
                                 />
                              </div>
                           ))}
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
                           src={product.mainImageString || IMAGE_FALL_BACK_URL}
                           alt="Product 1"
                           className="img-fluid"
                        />
                     </div>
                     <p>
                        {product.productName}
                        <br />
                        {product.price.toLocaleString()}$
                     </p>
                  </div>
               ))}
            </div>
         </section>

         <section className="feedback my-5">
            <div className="container">
               <h2 className="feedback-title">FEEDBACK</h2>

               <div className="row text-center">
                  <div className="col-md-4">
                     <div className="feedback-card">
                        <div className="circle"></div>
                        <p>NAME</p>
                        <p>★★★★★</p>
                        <p>Feedback text goes here.</p>
                     </div>
                  </div>

                  <div className="col-md-4">
                     <div className="feedback-card">
                        <div className="circle"></div>
                        <p>NAME</p>
                        <p>★★★★</p>
                        <p>Feedback text goes here.</p>
                     </div>
                  </div>

                  <div className="col-md-4">
                     <div className="feedback-card">
                        <div className="circle"></div>
                        <p>NAME</p>
                        <p>★★★</p>
                        <p>Feedback text goes here.</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
