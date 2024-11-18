import { Link } from "@remix-run/react";
import { FC } from "react";

const FooterComponent: FC = () => {
    return <footer className="footer">
        <div className="container">
            <div className="row text-center text-md-start">
                <div className="col-md-4 d-flex align-items-center justify-content-center justify-content-md-start">
                    <img src="/logo.jpg" alt="Logo" className="logo-img" />
                    <div className="divider d-none d-md-block"></div>
                    <ul className="list-unstyled d-flex flex-wrap justify-content-center">
                        <li className="mx-2"><a href="home.html">Home</a></li>
                        <li className="mx-2"><a href="product.html">Product</a></li>
                        <li className="mx-2"><a href="about.html">About</a></li>
                        <li className="mx-2"><a href="contact.html">Contact</a></li>
                        <li className="mx-2"><a href="policy.html">Policy</a></li>
                    </ul>
                </div>

                <div className="col-md-4 text-center my-3 my-md-0">
                    <div className="copyright">© 2024 The Silk Charm. All rights reserved</div>
                </div>

                <div className="col-md-4 text-center text-md-end">
                    <div className="newsletter d-flex justify-content-center justify-content-md-end">
                        <span className="me-2"><i className="bi bi-envelope"></i> Sign up for news</span>
                        <input type="email" placeholder="Enter your email" className="small-input" />
                        <button className="small-button">SUBSCRIBE</button>
                    </div>

                    <div className="mt-3">
                        <span>Phone: 035-xxx-xx893</span> |
                        <span>Email: <a href="mailto:thesilkcharm@gmail.com">thesilkcharm@gmail.com</a></span>
                    </div>
                    <div className="social-icons mt-3">
                        <Link to="#"><i className="bi bi-youtube"></i></Link>
                        <Link to="#"><i className="bi bi-twitter"></i></Link>
                        <Link to="#"><i className="bi bi-facebook"></i></Link>
                        <Link to="#"><i className="bi bi-music-note"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}
export default FooterComponent;