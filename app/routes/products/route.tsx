import { Prisma, Product, Tags } from '@prisma/client';
import { LoaderFunctionArgs } from '@remix-run/node';
import {
   Link,
   MetaFunction,
   useLoaderData,
   useNavigate,
} from '@remix-run/react';
import { useState, useCallback, useEffect } from 'react';
import Pagination from '~/components/Pagination';
import SliderCarousel from '~/components/Slider';
import { prisma } from '~/modules/server/db.server';
import { PRODUCTS_PER_PAGE } from '~/modules/domain';
import { FaAngleRight } from 'react-icons/fa';

const bannerImage: string[] = [
   '/banner.jpg',
   '/banner1.jpg',
   '/poster.jpg',
   '/poster1.jpg',
];

export const meta: MetaFunction = () => {
   return [{ title: 'Products' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
   const url = new URL(request.url);
   const tag = url.searchParams.get('tag') || '';
   const sort = url.searchParams.get('sort') || '';
   const page = url.searchParams.get('page') || '';

   const currentPage = Math.max(Number(page || 1), 1);

   const option = {
      where: {
         tags: tag ? (tag as Tags) : undefined,
      },
      orderBy: sort
         ? {
              price: sort as Prisma.SortOrder,
           }
         : undefined,
   };

   const takeOption = {
      take: PRODUCTS_PER_PAGE,
      skip: (currentPage - 1) * PRODUCTS_PER_PAGE,
   };

   const products = (await prisma.product.findMany({
      ...option,
      ...takeOption,
   })) as Product[];
   const count = await prisma.product.count(option);
   return { products, count };
};

export default function ProductsPage() {
   const [tag, setTag] = useState<Tags>();
   const [sort, setSort] = useState<Prisma.SortOrder>();
   const navigate = useNavigate();
   const { products, count } = useLoaderData<typeof loader>();

   useEffect(() => {
      navigate(
         `/products${tag ? `?tag=${tag}` : ''}${sort ? `&sort=${sort}` : ''}`,
      );
   }, [navigate, sort, tag]);

   const handleSetTags = useCallback((tag: Tags) => {
      //maybe add a little bit logic in here
      setTag(tag);
   }, []);

   const handleSetSort = useCallback((sort: Prisma.SortOrder) => {
      //maybe add a little bit logic in here
      setSort(sort);
   }, []);

   const totalPages = Math.ceil(count / PRODUCTS_PER_PAGE);

   return (
      <div className="container">
         <SliderCarousel images={bannerImage} />
         <br />
         <div className="row">
            <div className="col-md-3">
               <h5>Categories</h5>
               <ul className="list-unstyled">
                  <li>
                     <button
                        className="category-link"
                        onClick={() => {
                           handleSetTags('Modern');
                        }}
                     >
                        {tag === Tags['Modern'] && <FaAngleRight />} Modern Ao
                        Dai
                     </button>
                  </li>
                  <li>
                     <button
                        className="category-link"
                        onClick={() => {
                           handleSetTags('Traditional');
                        }}
                     >
                        {tag === Tags['Traditional'] && <FaAngleRight />}{' '}
                        Traditional Ao Dai
                     </button>
                  </li>
                  <li>
                     <button
                        className="category-link"
                        onClick={() => {
                           handleSetTags('Long_Dress');
                        }}
                     >
                        {tag === Tags['Long_Dress'] && <FaAngleRight />} Long
                        Dress
                     </button>
                  </li>
                  <li>
                     <button
                        className="category-link"
                        onClick={() => {
                           handleSetTags('Five_Panel');
                        }}
                     >
                        {tag === Tags['Five_Panel'] && <FaAngleRight />}{' '}
                        Five-panel Ao Dai
                     </button>
                  </li>
               </ul>

               <h5>Price</h5>
               <ul className="list-unstyled">
                  <li>
                     <input type="checkbox" /> Under 100,000
                  </li>
                  <li>
                     <input type="checkbox" /> 100,000 - 200,000
                  </li>
                  <li>
                     <input type="checkbox" /> 200,000 - 500,000
                  </li>
                  <li>
                     <input type="checkbox" /> Above 500,000
                  </li>
               </ul>

               {/* TODO: implement this later */}
               {/* <h5>Size</h5>
                <p>S | M | L | XL | XXL</p> */}
            </div>

            <div className="col-md-9">
               <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3>Product Listing</h3>
                  <div className="dropdown">
                     <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="sortDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                     >
                        Sort
                     </button>
                     <ul
                        className="dropdown-menu"
                        aria-labelledby="sortDropdown"
                     >
                        <li>
                           <button
                              className="dropdown-item"
                              onClick={() => {
                                 handleSetSort('asc');
                              }}
                           >
                              Price: Low - High
                           </button>
                        </li>
                        <li>
                           <button
                              className="dropdown-item"
                              onClick={() => {
                                 handleSetSort('desc');
                              }}
                           >
                              Price: High - Low
                           </button>
                        </li>
                     </ul>
                  </div>
               </div>

               <div className="row">
                  <p>
                     Displaying {products.length} of {count}
                  </p>
                  {products.map((item, idx) => (
                     <div className="col-md-4 mb-4" key={idx}>
                        <div className="card product-card">
                           <Link to={`/product/${item.id}`}>
                              <div className="card-body text-center">
                                 <div
                                    className="product-image-placeholder"
                                    style={{
                                       backgroundImage: `url('${item.mainImageString}')`,
                                       borderRadius: '15px',
                                    }}
                                 ></div>
                                 <h5 className="card-title">
                                    <Link
                                       to={`/product/${item.id}`}
                                       className="no-underline"
                                    >
                                       {item.productName}
                                    </Link>
                                 </h5>
                                 <p className="card-text">
                                    <Link
                                       to={`/product/${item.id}`}
                                       className="no-underline"
                                    >{`${item.price}$`}</Link>
                                 </p>
                                 <div className="sale-badge">20% OFF</div>
                                 <div className="d-flex justify-content-center mt-3">
                                    <a href="shoppingcart.html">
                                       <button className="btn btn-danger me-2">
                                          Add to Cart
                                       </button>
                                    </a>
                                    <a href="checkout.html">
                                       <button className="btn btn-secondary">
                                          Buy Now
                                       </button>
                                    </a>
                                 </div>
                              </div>
                           </Link>
                        </div>
                     </div>
                  ))}
               </div>
               {totalPages > 1 && <Pagination totalPages={totalPages} />}
            </div>
         </div>
      </div>
   );
}
