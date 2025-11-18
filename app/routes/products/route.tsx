import { Prisma, Product, Tags } from '@prisma/client';
import { LoaderFunctionArgs } from '@remix-run/node';
import {
   Link,
   MetaFunction,
   useLoaderData,
   useNavigate,
   useSearchParams,
} from '@remix-run/react';
import { useState, useCallback } from 'react';
import Pagination from '~/components/Pagination';
import SliderCarousel from '~/components/Slider';
import { prisma } from '~/modules/server/db.server';
import { IMAGE_FALL_BACK_URL, PRODUCTS_PER_PAGE } from '~/modules/domain';
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
   const collectionId = url.searchParams.get('collectionId') || '';
   const searchString = url.searchParams.get('search') || '';

   const currentPage = Math.max(Number(page || 1), 1);

   const option = {
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
      where: {
         productName: {
            contains: searchString ? searchString : undefined,
            mode: 'insensitive',
         },
         tags: tag ? (tag as Tags) : undefined,
         Collection: {
            collectionCode: collectionId ? collectionId : undefined,
         },
      },
      ...option,
      ...takeOption,
   })) as Product[];

   const count = await prisma.product.count({
      where: {
         productName: {
            contains: searchString ? searchString : undefined,
            mode: 'insensitive',
         },
         tags: tag ? (tag as Tags) : undefined,
         Collection: {
            collectionCode: collectionId ? collectionId : undefined,
         },
      },
      ...option,
   });
   return { products, count };
};

export default function ProductsPage() {
   const [tag, setTag] = useState<Tags>();
   const [sort, setSort] = useState<Prisma.SortOrder>();
   const [search, setSearch] = useState<string>();
   const navigate = useNavigate();
   const [queryParams] = useSearchParams();
   const { products, count } = useLoaderData<typeof loader>();

   // useEffect(() => {
   //    navigate(
   //       `/products${tag ? `?tag=${tag}` : ''}${sort ? `&sort=${sort}` : ''}`,
   //    );
   // }, [navigate, sort, tag]);

   const handleSetTags = useCallback(
      (tag: Tags) => {
         //maybe add a little bit logic in here
         setTag(tag);
         const previousQuery = new URLSearchParams(queryParams);
         if (previousQuery.has('tag')) previousQuery.delete('tag');
         previousQuery.append('tag', tag);
         navigate(`?${previousQuery.toString()}`);
      },
      [navigate, queryParams],
   );

   const handleSetSort = useCallback(
      (sort: Prisma.SortOrder) => {
         //maybe add a little bit logic in here
         setSort(sort);
         const previousQuery = new URLSearchParams(queryParams);
         if (previousQuery.has('sort')) previousQuery.delete('sort');
         previousQuery.append('sort', sort);
         navigate(`?${previousQuery.toString()}`);
      },
      [navigate, queryParams],
   );

   const handleChangeSearch = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const target = event.currentTarget;
         setSearch(target.value);
      },
      [],
   );

   const onClickSearchButton = useCallback(() => {
      const previousQuery = new URLSearchParams(queryParams);
      if (previousQuery.has('search')) previousQuery.delete('search');
      search && previousQuery.append('search', search);
      navigate(`?${previousQuery.toString()}`);
   }, [navigate, queryParams, search]);

   const totalPages = Math.ceil(count / PRODUCTS_PER_PAGE);

   return (
      <div className="">
         <SliderCarousel images={bannerImage} />
         <br />
         <div className="">
            <div className="">
               <h5>Categories</h5>
               <ul className="">
                  <li>
                     <button
                        className=""
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
                        className=""
                        onClick={() => {
                           handleSetTags('Traditional');
                        }}
                     >
                        {tag === Tags['Traditional'] && <FaAngleRight />}
                        Traditional Ao Dai
                     </button>
                  </li>
                  <li>
                     <button
                        className=""
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
                        className=""
                        onClick={() => {
                           handleSetTags('Five_Panel');
                        }}
                     >
                        {tag === Tags['Five_Panel'] && <FaAngleRight />}
                        Five-panel Ao Dai
                     </button>
                  </li>
               </ul>

               {/* TODO: implement price rang sort */}
               {/* <h5>Price</h5>
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
               </ul> */}

               {/* TODO: implement this later */}
               {/* <h5>Size</h5>
                <p>S | M | L | XL | XXL</p> */}
            </div>

            <div className="">
               <div className="">
                  <h3>Product Listing</h3>
                  <div className="input-group">
                     <input
                        type="text"
                        name="searchBar"
                        className="form-control"
                        value={search}
                        onChange={(e) => {
                           handleChangeSearch(e);
                        }}
                        placeholder="Search"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                     />
                     <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={onClickSearchButton}
                     >
                        Search
                     </button>
                  </div>
                  <div className="">
                     <button
                        className=""
                        type="button"
                        id="sortDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                     >
                        Sort
                     </button>
                     <ul className="" aria-labelledby="sortDropdown">
                        <li>
                           <button
                              className=""
                              onClick={() => {
                                 handleSetSort('asc');
                              }}
                           >
                              Price: Low - High
                           </button>
                        </li>
                        <li>
                           <button
                              className=""
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

               <div className="">
                  {sort && <p>Currently sort by {sort}</p>}
                  <p>
                     Displaying {products.length} of {count}
                  </p>
                  {products.map((item, idx) => (
                     <div className="" key={idx}>
                        <div className="">
                           <Link
                              className="no-underline"
                              to={`/product/${item.id}`}
                           >
                              <div className="">
                                 <div
                                    className=""
                                    style={{
                                       borderRadius: '15px',
                                    }}
                                 >
                                    <img
                                       className=""
                                       src={
                                          item.mainImageString ||
                                          IMAGE_FALL_BACK_URL
                                       }
                                       alt="product"
                                    />
                                 </div>
                                 <h5 className="">
                                    <p className="">{item.productName}</p>
                                 </h5>
                                 <p className="">
                                    <Link
                                       to={`/product/${item.id}`}
                                       className=""
                                    >{`${item.price.toLocaleString()}$`}</Link>
                                 </p>
                                 {item.salePercent !== 0 && (
                                    <div className="">
                                       {item.salePercent}% OFF
                                    </div>
                                 )}
                                 <div className="d-flex justify-content-center mt-3">
                                    <Link to={`/product/${item.id}`}>
                                       <button className="btn btn-danger me-2">
                                          See the product
                                       </button>
                                    </Link>
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
