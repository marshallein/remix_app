import { json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { FaCheckCircle } from 'react-icons/fa';
import { getUser } from '~/modules/server/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
   const user = await getUser(request);
   if (!user) {
      return redirect('/login');
   }

   return json({ user });
};

export default function ThankYouPage() {
   const data = useLoaderData<typeof loader>();

   return (
      <section className="min-h-screen bg-gradient-to-br from-primary/70 via-white to-secondary/40">
         <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-0">
            <div className="rounded border border-white/60 bg-white/85 px-8 py-10 shadow-2xl shadow-primary/30 space-y-6">
               <FaCheckCircle className="mx-auto text-6xl text-secondary" />
               <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.5em] text-secondary">
                     Order confirmed
                  </p>
                  <h1 className="text-4xl font-light text-alternative_2">
                     Thank you, {data.user.name}
                  </h1>
                  <p className="text-sm text-alternative_1 leading-relaxed">
                     Your order has been created successfully. We’ll send a follow-up
                     email with shipping details shortly and reach out if we need
                     anything else.
                  </p>
               </div>
               <div className="rounded border border-alternative_1/20 bg-white/70 px-6 py-4 text-sm text-alternative_2">
                  <p className="font-semibold uppercase tracking-[0.35em] text-secondary">
                     Next steps
                  </p>
                  <p>
                     Keep an eye on your inbox. Our team is preparing your package
                     and will contact you soon about delivery.
                  </p>
               </div>
               <Link
                  className="inline-flex items-center justify-center rounded bg-alternative_2 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-primary shadow-lg shadow-alternative_2/40 transition hover:-translate-y-0.5 hover:bg-alternative_2/90"
                  to={'/'}
               >
                  Back to home
               </Link>
            </div>
         </div>
      </section>
   );
}
