import { Link } from '@remix-run/react';
import { FC } from 'react';
import { FOOTER_BACKGROUND_IMAGE, LOGO_IMAGE } from '~/constants/images';

const FooterComponent: FC = () => {
   return (
      <footer className="bg-alternative_2 text-primary">
         <div
            className="w-full h-[300px] bg-cover bg-center"
            style={{ backgroundImage: `url('${FOOTER_BACKGROUND_IMAGE}')` }}
         />
         <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-0">
            <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-0">
               <div className="space-y-5 lg:max-w-sm">
                  <img
                     src={LOGO_IMAGE}
                     alt="Logo"
                     className="h-14 w-auto rounded border border-white/30 bg-white/80 p-2"
                  />
                  <p className="text-sm text-primary/80">
                     Handcrafted áo dài and contemporary silhouettes for every
                     celebration. Crafted with care in Vietnam.
                  </p>
                  <ul className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.35em]">
                     {[
                        { label: 'Home', href: '/' },
                        { label: 'Product', href: '/products' },
                        { label: 'About', href: '/about' },
                        { label: 'Contact', href: '/contact' },
                        { label: 'Policy', href: '/policy' },
                     ].map((item) => (
                        <li key={item.label}>
                           <Link
                              to={item.href}
                              className="text-primary/80 transition hover:text-primary"
                           >
                              {item.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="flex flex-col gap-4 text-sm text-primary/70">
                  <p>
                     © {new Date().getFullYear()} The Silk Charm. All rights
                     reserved.
                  </p>
                  <p>
                     <span className="font-semibold text-primary">Phone:</span>{' '}
                     035-xxx-xx893
                  </p>
                  <p>
                     <span className="font-semibold text-primary">Email:</span>{' '}
                     <a
                        className="underline underline-offset-4 hover:text-secondary"
                        href="mailto:thesilkcharm@gmail.com"
                     >
                        thesilkcharm@gmail.com
                     </a>
                  </p>
               </div>

               {/* <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                     <span className="text-sm uppercase tracking-[0.45em] text-secondary">
                        Sign up for news
                     </span>
                     <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                           type="email"
                           placeholder="Enter your email"
                           className="flex-1 rounded-full border border-primary/60 bg-white/10 px-4 py-3 text-sm text-primary placeholder:text-primary/60 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
                        />
                        <button className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-alternative_2 transition hover:bg-primary">
                           Subscribe
                        </button>
                     </div>
                  </div>

                  <div className="flex gap-3 text-2xl text-primary/80">
                     {['#', '#', '#', '#'].map((href, idx) => (
                        <Link
                           key={idx}
                           to={href}
                           className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:-translate-y-0.5 hover:text-secondary"
                        >
                           <span className="text-base font-semibold">
                              {idx + 1}
                           </span>
                        </Link>
                     ))}
                  </div>
               </div> */}
            </div>
         </div>
      </footer>
   );
};
export default FooterComponent;
