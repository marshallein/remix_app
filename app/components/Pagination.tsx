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
         className={['pagination', className].filter(Boolean).join(' ')}
         {...attrs}
      >
         {currentPage <= 1 && (
            <span className="pagination button">
               <FaAngleLeft />
               Previous Page
            </span>
         )}
         {currentPage > 1 && (
            <Link
               className="pagination button link"
               to={`?${previousQuery.toString()}`}
            >
               <FaAngleLeft />
               Previous Page
            </Link>
         )}
         {currentPage >= totalPages && (
            <span className="pagination button">
               Next Page
               <FaAngleRight />
            </span>
         )}
         {currentPage < totalPages && (
            <Link
               className="pagination button link"
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
