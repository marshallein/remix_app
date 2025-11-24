import { Link } from '@remix-run/react';
import { FC } from 'react';
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { LOGO_IMAGE } from '~/constants/images';

type Props = {
   user: {
      id: number;
      email: string;
      name: string;
   } | null;
   cartItemCount?: number;
};

const TabLink: FC<{ to: string; label: string }> = ({ to, label }) => (
   <Link
      className="text-sm font-semibold uppercase tracking-[0.35em] text-alternative_2 transition hover:text-secondary"
      to={to}
   >
      {label}
   </Link>
);

const HeaderComponent: FC<Props> = ({ user, cartItemCount }) => {
   return (
      <header className="sticky top-0 z-50 bg-secondary/60 backdrop-blur shadow-sm shadow-secondary/20">
         <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-0">
            <div className="flex items-center gap-3">
               <a href="/" className="inline-flex items-center gap-2">
                  <img
                     src={LOGO_IMAGE}
                     alt="Logo"
                     className="h-12 w-12 rounded-3xl border border-secondary/40 object-cover"
                  />
                  <span className="hidden text-sm font-semibold uppercase tracking-[0.5em] text-alternative_2 sm:inline">
                     Silk Charm
                  </span>
               </a>
            </div>

            <nav className="hidden gap-10 md:flex">
               <TabLink to="/" label="Home" />
               <TabLink to="/products" label="Products" />
               <TabLink to="/aboutUs" label="About Us" />
               <TabLink to="/contact" label="Contact" />
            </nav>
            <div className="flex items-center gap-5 text-alternative_2">
               <Link
                  to={`/cart`}
                  className="relative flex items-center justify-center rounded-full border border-alternative_2/50 bg-secondary/20 p-2 text-sm transition hover:bg-white/90"
                  aria-label="Cart"
               >
                  <FaShoppingCart className="size-4" />
                  {cartItemCount && cartItemCount > 0 && (
                     <span className="absolute -right-1 -top-1 inline-flex min-h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                        {cartItemCount}
                     </span>
                  )}
               </Link>
               {user ? (
                  <div className="flex items-center gap-2 rounded-full border border-primary/60 bg-primary/40 px-4 py-2 text-xs font-semibold uppercase ">
                     <FaUser />
                     <span>Hello {user?.name}!</span>
                  </div>
               ) : (
                  <Link
                     to={'/login'}
                     className="flex items-center gap-2 rounded-full border border-alternative_2/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition hover:bg-white/90 hover:border-alternative_2 hover:text-alternative_2"
                  >
                     <FaUser />
                     <span className="hidden sm:inline">Login</span>
                  </Link>
               )}
               {user && (
                  <Link
                     to="/logout"
                     className="flex items-center bg-white justify-center rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-rose-500 transition hover:bg-rose-50"
                  >
                     <FaSignOutAlt />
                  </Link>
               )}
            </div>
         </div>
      </header>
   );
};

export default HeaderComponent;
