import { FaPhone, FaGlobe, FaEnvelope, FaMapMarker } from "react-icons/fa";

export default function ContactPage() {
    return <div className="container contact-us my-5">
        <h2>Contact Us</h2>
        <p style={{ textAlign: "center", lineHeight: "1.5" }}>
            Please leave your information below, and we will send you a 10% discount voucher for<br />
            your entire order and keep you updated on our latest products.
        </p>

        <div className="row">
            <div className="col-md-6">
                <form id="contact-form" className="contact-form">
                    <h2 className="form-title text-start">Your Name</h2>
                    <input type="text" id="name" className="form-control rounded-input" required />

                    <h2 className="form-title text-start">Email Address</h2>
                    <input type="email" id="email" className="form-control rounded-input" required />

                    <h2 className="form-title text-start">Message</h2>
                    <textarea className="form-control rounded-input" rows={5} id="message" required></textarea>

                    <button type="submit" className="btn btn-submit mt-3" style={{ float: "left" }}>Submit</button>
                </form>
            </div>

            <div className="col-md-6 contact-info">
                <br />
                <p className="text-start">
                    <FaPhone />{" "}
                    <a href="tel:+84954567890" className="text-dark">(+84) 095-456-2311</a>
                </p>
                <p className="text-start">
                    <FaGlobe />{" "}
                    <a href="http://www.thesilkcharm.com" target="_blank" className="text-dark" rel="noreferrer">www.thesilkcharm.com</a>
                </p>
                <p className="text-start">
                    <FaEnvelope />{" "}
                    <a href="mailto:thesilkcharm@gmail.com" className="text-dark">thesilkcharm@gmail.com</a>
                </p>
                <p className="text-start">
                    <FaMapMarker />{" "}
                    <a href="https://www.google.com/maps?q=79+Ho+Tung+Mau+Street,+Mai+Dich,+Cau+Giay,+Hanoi"
                        target="_blank" className="text-dark" rel="noreferrer">
                        79 Ho Tung Mau Street, Mai Dich, Cau Giay, Hanoi
                    </a>
                </p>
            </div>
        </div>
    </div>
}