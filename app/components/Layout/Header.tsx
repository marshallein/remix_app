import { Link } from '@remix-run/react';
import { FC } from 'react';
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

type Props = {
   user: {
      id: number;
      email: string;
      name: string;
   } | null;
};

const TabLink: FC<{ to: string; label: string }> = ({ to, label }) => {
   return (
      <Link className="px-2 py-1 hover:bg-primary rounded" to={to}>
         {label}
      </Link>
   );
};

const HeaderComponent: FC<Props> = ({ user }) => {
   return (
      <div className="flex justify-between items-center px-4">
         <div className="size-[100px]">
            <a href="/">
               <img src="/logo.jpg" alt="Logo" className="" />
            </a>
         </div>

         <div className="flex gap-x-16">
            <TabLink to="/" label="Home" />
            <TabLink to="/products" label="Products" />
            <TabLink to="/aboutUs" label="About Us" />
            <TabLink to="/contact" label="Contact" />
         </div>
         <div className="flex gap-x-6">
            {/* <!-- Search Bar --> */}
            {/* <div className="search-bar">
                <input type="text" placeholder="SEARCH" className="form-control" />
                <i className="fas fa-search search-icon"></i>
            </div> */}

            <Link to={`/cart`} className="flex items-center text-base">
               <FaShoppingCart className='size-4' />
            </Link>
            {/* if user are logged, display the name */}
            {user ? (
               <div className="flex items-center text-base">
                  <FaUser /> Hello {user?.name}!
               </div>
            ) : (
               <Link to={'/login'} className="flex items-center text-base">
                  <FaUser />
               </Link>
            )}
            {user && (
               <Link to="/logout" className="flex items-center text-base">
                  <FaSignOutAlt />
               </Link>
            )}
         </div>
      </div>
   );
};

export default HeaderComponent;
