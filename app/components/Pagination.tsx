import { FC } from 'react';
import { Link, useSearchParams } from '@remix-run/react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

type Props = {
   totalPages: number | string;
   pageParam?: string;
   className?: string;
};

const Pagination: FC<Props> = ({
   totalPages = Number.MAX_SAFE_INTEGER,
   pageParam = 'page',
   className = '',
   ...attrs
}) => {
   const [queryParams] = useSearchParams();
   const currentPage = Number(queryParams.get(pageParam) || 1);
   totalPages = Number(totalPages);

   const previousQuery = new URLSearchParams(queryParams);
   if (previousQuery.has(pageParam)) previousQuery.delete(pageParam);
   previousQuery.append(pageParam, String(currentPage - 1));
   const nextQuery = new URLSearchParams(queryParams);
   if (nextQuery.has(pageParam)) nextQuery.delete(pageParam);
   nextQuery.append(pageParam, String(currentPage + 1));

   return (
      <nav
         className={['', className].filter(Boolean).join(' ')}
         {...attrs}
      >
         {currentPage <= 1 && (
            <span className="">
               <FaAngleLeft />
               Previous Page
            </span>
         )}
         {currentPage > 1 && (
            <Link
               className=""
               to={`?${previousQuery.toString()}`}
            >
               <FaAngleLeft />
               Previous Page
            </Link>
         )}
         {currentPage >= totalPages && (
            <span className="">
               Next Page
               <FaAngleRight />
            </span>
         )}
         {currentPage < totalPages && (
            <Link
               className=""
               to={`?${nextQuery.toString()}`}
            >
               Next Page
               <FaAngleRight />
            </Link>
         )}
      </nav>
   );
};

export default Pagination;
