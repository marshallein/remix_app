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
import { HOME_BANNER_IMAGES } from '~/constants/images';

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
   const [search, setSearch] = useState<string>('');
   const [isFilterOpen, setIsFilterOpen] = useState(false);
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

   const openFilterDrawer = useCallback(() => {
      setIsFilterOpen(true);
   }, []);

   const closeFilterDrawer = useCallback(() => {
      setIsFilterOpen(false);
   }, []);

   const totalPages = Math.ceil(count / PRODUCTS_PER_PAGE);

   const categories = [
      { label: 'Modern Ao Dai', value: 'Modern' as Tags },
      { label: 'Traditional Ao Dai', value: 'Traditional' as Tags },
      { label: 'Long Dress', value: 'Long_Dress' as Tags },
      { label: 'Five-panel Ao Dai', value: 'Five_Panel' as Tags },
   ];

   const FilterPanel = ({ onClose }: { onClose?: () => void }) => {
      return (
         <div className="space-y-8">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-xs uppercase tracking-[0.45em] text-secondary">
                        Filter
                     </p>
                     <h3 className="text-2xl font-light text-alternative_2">
                        Categories
                     </h3>
                  </div>
                  {onClose && (
                     <button
                        className="rounded-full border border-secondary/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary transition hover:bg-secondary/10"
                        type="button"
                        onClick={onClose}
                     >
                        Close
                     </button>
                  )}
               </div>
               <p className="text-sm text-alternative_1/80">
                  Choose a silhouette to refine your results.
               </p>
            </div>
            <ul className="space-y-2">
               {categories.map((category) => (
                  <li key={category.value}>
                     <button
                        className={`w-full rounded border border-alternative_1/20 px-4 py-3 text-left text-sm font-semibold transition hover:border-secondary hover:bg-secondary/20 ${
                           tag === category.value
                              ? 'bg-secondary/40 text-alternative_2'
                              : 'text-alternative_1'
                        }`}
                        onClick={() => {
                           handleSetTags(category.value);
                           onClose?.();
                        }}
                     >
                        <span className="inline-flex items-center gap-2">
                           {tag === category.value && (
                              <FaAngleRight className="text-alternative_2" />
                           )}
                           {category.label}
                        </span>
                     </button>
                  </li>
               ))}
            </ul>
         </div>
      );
   };

   return (
      <div className="min-h-screen bg-white">
         {isFilterOpen && (
            <div
               className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
               onClick={closeFilterDrawer}
               aria-hidden="true"
            />
         )}
         <div className="mx-auto max-w-6xl space-y-10 py-10 md:px-4 sm:px-6 lg:px-0">
            <div className="rounded border border-white/60 bg-white/80 p-4 shadow-2xl shadow-primary/25 backdrop-blur">
               <SliderCarousel images={HOME_BANNER_IMAGES} />
            </div>
            <div className="grid gap-10 lg:grid-cols-[280px,1fr]">
               <aside className="hidden lg:block lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:pr-2">
                  <div className="space-y-8 rounded border border-secondary/30 bg-white/80 p-4 shadow-xl shadow-secondary/20 sm:p-6">
                     <FilterPanel />
                  </div>
               </aside>

               <section className="space-y-8 rounded border border-white/70 bg-white/80 p-4 shadow-2xl shadow-primary/30 sm:p-6">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                     <div className="flex flex-col gap-3">
                        <p className="text-xs uppercase tracking-[0.45em] text-secondary">
                           Product listing
                        </p>
                        <h3 className="text-3xl font-light text-alternative_2">
                           Discover your next piece
                        </h3>
                        <p className="text-sm text-alternative_1">
                           Displaying {products.length} of {count}
                        </p>
                     </div>
                     <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center md:w-auto">
                        <div className="flex w-full flex-col gap-2 rounded-3xl border border-secondary/40 bg-white/60 px-3 py-2 shadow-inner shadow-secondary/30 sm:flex-row sm:items-center">
                           <input
                              type="text"
                              name="searchBar"
                              className="flex-1 bg-transparent px-2 text-sm text-alternative_2 placeholder:text-alternative_1/60 focus:outline-none"
                              value={search}
                              onChange={(e) => {
                                 handleChangeSearch(e);
                              }}
                              placeholder="Search product"
                              aria-label="Search products"
                           />
                           <button
                              className="w-full rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase text-alternative_2 transition hover:bg-primary sm:w-auto"
                              type="button"
                              onClick={onClickSearchButton}
                           >
                              Search
                           </button>
                        </div>
                        <button
                           className="w-full rounded-full border border-secondary/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-alternative_2 transition hover:bg-secondary/20 sm:hidden"
                           type="button"
                           onClick={openFilterDrawer}
                        >
                           Open Filters
                        </button>
                        <div className="flex flex-wrap gap-3 sm:flex-nowrap">
                           <button
                              className={`flex-1 rounded-full border px-4 py-2 text-xs font-semibold uppercase transition sm:flex-none ${
                                 sort === 'asc'
                                    ? 'border-secondary bg-secondary/40 text-alternative_2'
                                    : 'border-alternative_1/30 text-alternative_1 hover:border-secondary hover:text-alternative_2'
                              }`}
                              onClick={() => {
                                 handleSetSort('asc');
                              }}
                           >
                              Price ↑
                           </button>
                           <button
                              className={`flex-1 rounded-full border px-4 py-2 text-xs font-semibold uppercase transition sm:flex-none ${
                                 sort === 'desc'
                                    ? 'border-secondary bg-secondary/40 text-alternative_2'
                                    : 'border-alternative_1/30 text-alternative_1 hover:border-secondary hover:text-alternative_2'
                              }`}
                              onClick={() => {
                                 handleSetSort('desc');
                              }}
                           >
                              Price ↓
                           </button>
                        </div>
                     </div>
                  </div>

                  {sort && (
                     <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                        Sorting by price{' '}
                        {sort === 'asc' ? 'Low -> High' : 'High -> Low'}
                     </p>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                     {products.map((item, idx) => (
                        <Link
                           className="group flex h-full flex-col rounded border border-secondary/30 bg-white/90 p-4 shadow-lg shadow-secondary/20 transition hover:-translate-y-1 hover:bg-white"
                           key={idx}
                           to={`/product/${item.id}`}
                        >
                           <div className="relative h-64 overflow-hidden rounded bg-secondary/20">
                              <img
                                 className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                 src={
                                    item.mainImageString || IMAGE_FALL_BACK_URL
                                 }
                                 alt="product"
                              />
                              {item.salePercent !== 0 && (
                                 <div className="absolute left-2 top-2 rounded-full bg-rose-500/80 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-white sm:left-4 sm:top-4 sm:px-3 sm:text-xs sm:tracking-[0.35em]">
                                    {item.salePercent}% off
                                 </div>
                              )}
                           </div>
                           <div className="mt-5 flex flex-1 flex-col justify-between gap-2 box-border">
                              <h5 className="text-sm font-semibold text-alternative_2">
                                 {item.productName}
                              </h5>
                              <p className="text-sm uppercase tracking-[0.4em] text-alternative_1">
                                 {item.price.toLocaleString()} VND
                              </p>
                              <div className="flex justify-between text-xs text-alternative_1">
                                 <span>Tap to view details</span>
                                 <span className="text-secondary">
                                    View product
                                 </span>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
                  {totalPages > 1 && (
                     <div className="pt-6">
                        <Pagination totalPages={totalPages} />
                     </div>
                  )}
               </section>
            </div>
         </div>
         <div
            className={`fixed top-4 bottom-4 left-0 z-50 w-11/12 max-w-sm transform overflow-hidden rounded-r-3xl border border-secondary/30 bg-white/95 p-4 shadow-2xl shadow-secondary/30 transition-transform duration-300 sm:top-6 sm:bottom-6 sm:p-6 lg:hidden ${
               isFilterOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            aria-hidden={!isFilterOpen}
            aria-label="Mobile filters"
         >
            <div className="flex h-full flex-col overflow-y-auto pr-1">
               <FilterPanel onClose={closeFilterDrawer} />
            </div>
         </div>
      </div>
   );
}
