import { Link } from "@remix-run/react";
import { FC } from "react";


const HeaderComponent: FC = () => {

    return (<div className="header">
        <div className="logo-container">
            <a href="home.html">
                <img src="/logo.jpg" alt="Logo" className="logo-img" />
            </a>
        </div>


        <div className="nav">
            <a href="home.html">Home</a>
            <Link className="nav-link" to={"#"}>Product</Link>
            <a href="about.html">About Us</a>
            <a href="contact.html">Contact Us</a>
        </div>
        <div className="search-cart">
            {/* <!-- Search Bar --> */}
            <div className="search-bar">
                <input type="text" placeholder="SEARCH" className="form-control" />
                <i className="fas fa-search search-icon"></i>
            </div>

            {/* <!-- Shopping Cart Icon --> */}
            <i className="fas fa-shopping-cart icon"></i>

            {/* <!-- User Icon --> */}
            <i className="fas fa-user icon"></i>
        </div>
    </div>)
}

export default HeaderComponent;