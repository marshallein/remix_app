import { Link } from '@remix-run/react';

export default function NotFoundPage() {
   return (
      <section className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
         <div className="max-w-xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-secondary">
               Error
            </p>
            <h1 className="mt-4 text-6xl font-light text-alternative_2">404</h1>
            <p className="mt-4 text-2xl font-semibold text-alternative_2">
               Page not found
            </p>
            <p className="mt-2 text-sm text-alternative_1">
               Something went wrong. Please check again later or return home to continue browsing.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold uppercase tracking-[0.3em]">
               <Link
                  to="/"
                  className="rounded border border-alternative_2/40 px-6 py-3 text-alternative_2 transition hover:bg-secondary/30"
               >
                  Back home
               </Link>
               <Link
                  to="/products"
                  className="rounded bg-alternative_2 px-6 py-3 text-primary shadow-lg shadow-alternative_2/30 transition hover:-translate-y-0.5 hover:bg-alternative_2/90"
               >
                  Shop products
               </Link>
            </div>
         </div>
      </section>
   );
}
