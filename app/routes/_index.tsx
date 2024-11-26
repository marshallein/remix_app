import { Product } from '@prisma/client';
import type { MetaFunction } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useCallback } from 'react';
import SliderCarousel from '~/components/Slider';
import { IMAGE_FALL_BACK_URL } from '~/modules/domain';
import { prisma } from '~/modules/server/db.server';

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
   const products = (await prisma.product.findMany()) as Product[];

   return { products };
};

export default function Index() {
   const { products } = useLoaderData<typeof loader>();
   const navigate = useNavigate();

   const handleOnClickBestSellerProduct = useCallback(
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
               {products.map((product, idx) => (
                  <div
                     className="col-md-3"
                     key={idx}
                     id={String(product.id)}
                     tabIndex={0}
                     onKeyDown={() => {}}
                     role="button"
                     onClick={handleOnClickBestSellerProduct}
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
                        {product.price}$
                     </p>
                  </div>
               ))}
            </div>
         </section>

         {/* <!-- Traditional Collection Section --> */}
         <section className="collection-section my-5">
            <div className="container">
               <h2>TRADITIONAL COLLECTION SPRING 2025</h2>
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
                     <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla vehicula lorem ut purus gravida, et sagittis erat
                        consectetur.
                     </p>
                     <a href="product.html">
                        <button className="btn btn-dark mb-4">BUY NOW</button>
                     </a>
                  </div>
               </div>
            </div>
         </section>

         {/* <!-- New Collection Section --> */}
         <section className="new-collection my-5 text-center">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-md-6 text-left">
                     <h2>NEW COLLECTION</h2>
                     <p>Description text goes here.</p>
                     <a href="product.html">
                        <button className="btn btn-dark mb-4">BUY NOW</button>
                     </a>
                  </div>

                  <div className="col-md-6">
                     <div className="row">
                        <div className="col-4">
                           <img
                              src="/aodai1.jpg"
                              alt="Item 1"
                              className="img-fluid short-image item-1"
                           />
                        </div>
                        <div className="col-4">
                           <img
                              src="/aodai1.jpg"
                              alt="Item 2"
                              className="img-fluid short-image item-2"
                           />
                        </div>
                        <div className="col-4">
                           <img
                              src="/aodai1.jpg"
                              alt="Item 3"
                              className="img-fluid short-image item-3"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* <!-- On Sales Section --> */}
         <section className="on-sales my-5">
            <div className="container">
               <h2 className="on-sales-title">ON SALES</h2>

               <div className="row">
                  <div className="col-md-3">
                     <div className="on-sales-card">
                        <a href="product.html">
                           <img
                              src="/aodai1.jpg"
                              alt="Sale Item 1"
                              className="img-fluid"
                           />
                        </a>
                     </div>
                  </div>

                  <div className="col-md-3">
                     <div className="on-sales-card">
                        <a href="product.html">
                           <img
                              src="/aodai1.jpg"
                              alt="Sale Item 2"
                              className="img-fluid"
                           />
                        </a>
                     </div>
                  </div>

                  <div className="col-md-3">
                     <div className="on-sales-card">
                        <a href="product.html">
                           <img
                              src="/aodai1.jpg"
                              alt="Sale Item 3"
                              className="img-fluid"
                           />
                        </a>
                     </div>
                  </div>

                  <div className="col-md-3">
                     <div className="on-sales-card">
                        <a href="product.html">
                           <img
                              src="/aodai1.jpg"
                              alt="Sale Item 4"
                              className="img-fluid"
                           />
                        </a>
                     </div>
                  </div>
               </div>
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
