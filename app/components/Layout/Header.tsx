import { Link } from '@remix-run/react';
import { FC } from 'react';

type Props = {
   user: {
      id: number;
      email: string;
      name: string;
   } | null;
};

const HeaderComponent: FC<Props> = ({ user }) => {
   return (
      <div className="header">
         <div className="logo-container">
            <a href="home.html">
               <img src="/logo.jpg" alt="Logo" className="logo-img" />
            </a>
         </div>

         <div className="nav">
            <Link className="nav-link" to={'/'}>
               Home
            </Link>
            <Link className="nav-link" to={'/products'}>
               Products
            </Link>
            <a href="about.html">About Us</a>
            <a href="contact.html">Contact Us</a>
         </div>
         <div className="search-cart">
            {/* <!-- Search Bar --> */}
            {/* <div className="search-bar">
                <input type="text" placeholder="SEARCH" className="form-control" />
                <i className="fas fa-search search-icon"></i>
            </div> */}

            <Link to={''} className="fas fa-shopping-cart icon">
               Cart
            </Link>
            {/* if user are logged, display the name */}
            {user ? (
               <div className="fas icon">Hello {user?.name}!</div>
            ) : (
               <Link to={'/login'} className="fas fa-user icon">
                  User
               </Link>
            )}
         </div>
      </div>
   );
};

export default HeaderComponent;
