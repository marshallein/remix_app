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
         className={[
            'flex items-center justify-between gap-3 text-xs uppercase tracking-[0.35em]',
            className,
         ]
            .filter(Boolean)
            .join(' ')}
         {...attrs}
      >
         {currentPage <= 1 ? (
            <span className="inline-flex items-center gap-2 rounded border border-alternative_1/30 px-3 py-2 text-alternative_1/60">
               <FaAngleLeft /> Previous Page
            </span>
         ) : (
            <Link
               className="inline-flex items-center gap-2 rounded border border-alternative_2/40 px-3 py-2 text-alternative_2 transition hover:bg-secondary/30"
               to={`?${previousQuery.toString()}`}
            >
               <FaAngleLeft /> Previous Page
            </Link>
         )}
         <span className="rounded border border-transparent px-3 py-2 text-alternative_2">
            Page {currentPage} of {totalPages}
         </span>
         {currentPage >= totalPages ? (
            <span className="inline-flex items-center gap-2 rounded border border-alternative_1/30 px-3 py-2 text-alternative_1/60">
               Next Page <FaAngleRight />
            </span>
         ) : (
            <Link
               className="inline-flex items-center gap-2 rounded border border-alternative_2/40 px-3 py-2 text-alternative_2 transition hover:bg-secondary/30"
               to={`?${nextQuery.toString()}`}
            >
               Next Page <FaAngleRight />
            </Link>
         )}
      </nav>
   );
};

export default Pagination;
