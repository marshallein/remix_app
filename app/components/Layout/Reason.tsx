import { FC } from 'react';
import { REASON_IMAGE_PATHS } from '~/constants/images';

export const ReasonComponent: FC = () => {
   return (
      <section className="rounded p-4">
         <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 text-slate-900 md:gap-12">
            <header className="text-center">
               <p className="text-sm uppercase tracking-[0.3em] text-secondary">
                  Why choose us
               </p>
               <h2 className="mt-3 text-3xl font-semibold text-alternative_2 md:text-4xl">
                  Silk Charm on You
               </h2>
            </header>
            <div className="grid gap-x-[50px] sm:grid-cols-2 lg:grid-cols-3">
               {[
                  {
                     title: 'Complimentary Shipping',
                     description:
                        'We care about your experience, so we offer shipping across of the world for all orders, big or small.',
                     imageUrl: REASON_IMAGE_PATHS.complimentaryShipping,
                  },
                  {
                     title: 'Consciously Crafted',
                     description:
                        'We prioritize handmade, small-batch production to minimize waste and support local artisans.',
                     imageUrl: REASON_IMAGE_PATHS.consciouslyCrafted,
                  },
                  {
                     title: 'Come Say Hi',
                     description:
                        'We love connecting with our customers! Visit us in-store for personalized service and styling tips.',
                     imageUrl: REASON_IMAGE_PATHS.comeSayHi,
                  },
               ].map((reason) => (
                  <article
                     key={reason.title}
                     className=" flex flex-col items-center rounded-2xl text-center bg-white p-6 transition-transform duration-150 hover:-translate-y-1 "
                  >
                     <img
                        className="w-[200px] h-[200px]"
                        src={reason.imageUrl}
                        alt={reason.title}
                     />
                     <h3 className="text-xl font-semibold text-slate-900">
                        {reason.title}
                     </h3>
                     <p className="mt-3 text-base text-slate-600">
                        {reason.description}
                     </p>
                  </article>
               ))}
            </div>
         </div>
      </section>
   );
};
