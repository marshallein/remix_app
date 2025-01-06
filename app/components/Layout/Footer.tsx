import { Link } from '@remix-run/react';
import { FC } from 'react';

const FooterComponent: FC = () => {
   return (
      <footer className="">
         <div className="">
            <div className="">
               <div className="">
                  <img src="/logo.jpg" alt="Logo" className="" />
                  <div className=""></div>
                  <ul className="">
                     <li className="">
                        <a href="home.html">Home</a>
                     </li>
                     <li className="">
                        <a href="product.html">Product</a>
                     </li>
                     <li className="">
                        <a href="about.html">About</a>
                     </li>
                     <li className="">
                        <a href="contact.html">Contact</a>
                     </li>
                     <li className="">
                        <a href="policy.html">Policy</a>
                     </li>
                  </ul>
               </div>

               <div className="">
                  <div className="copyright">
                     © 2024 The Silk Charm. All rights reserved
                  </div>
               </div>

               <div className="">
                  <div className="">
                     <span className="">
                        <i className=""></i> Sign up for news
                     </span>
                     <input
                        type="email"
                        placeholder="Enter your email"
                        className=""
                     />
                     <button className="">SUBSCRIBE</button>
                  </div>

                  <div className="">
                     <span>Phone: 035-xxx-xx893</span> |
                     <span>
                        Email:{' '}
                        <a href="mailto:thesilkcharm@gmail.com">
                           thesilkcharm@gmail.com
                        </a>
                     </span>
                  </div>
                  <div className="">
                     <Link to="#">
                        <i className=""></i>
                     </Link>
                     <Link to="#">
                        <i className=""></i>
                     </Link>
                     <Link to="#">
                        <i className=""></i>
                     </Link>
                     <Link to="#">
                        <i className=""></i>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
};
export default FooterComponent;
