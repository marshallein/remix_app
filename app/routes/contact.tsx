import { FaPhone, FaGlobe, FaEnvelope, FaMapMarker } from "react-icons/fa";

export default function ContactPage() {
    return <div className="">
        <h2>Contact Us</h2>
        <p style={{ textAlign: "center", lineHeight: "1.5" }}>
            Please leave your information below, and we will send you a 10% discount voucher for<br />
            your entire order and keep you updated on our latest products.
        </p>

        <div className="">
            <div className="">
                <form id="contact-form" className="">
                    <h2 className="">Your Name</h2>
                    <input type="text" id="name" className="" required />

                    <h2 className="form-title text-start">Email Address</h2>
                    <input type="email" id="email" className="" required />

                    <h2 className="">Message</h2>
                    <textarea className="" rows={5} id="message" required></textarea>

                    <button type="submit" className="" style={{ float: "left" }}>Submit</button>
                </form>
            </div>

            <div className="">
                <br />
                <p className="">
                    <FaPhone />{" "}
                    <a href="tel:+84954567890" className="">(+84) 095-456-2311</a>
                </p>
                <p className="">
                    <FaGlobe />{" "}
                    <a href="http://www.thesilkcharm.com" target="_blank" className="" rel="noreferrer">www.thesilkcharm.com</a>
                </p>
                <p className="">
                    <FaEnvelope />{" "}
                    <a href="mailto:thesilkcharm@gmail.com" className="">thesilkcharm@gmail.com</a>
                </p>
                <p className="">
                    <FaMapMarker />{" "}
                    <a href="https://www.google.com/maps?q=79+Ho+Tung+Mau+Street,+Mai+Dich,+Cau+Giay,+Hanoi"
                        target="_blank" className="" rel="noreferrer">
                        10D Ho Tung Mau Street, Mai Dich, Cau Giay, Hanoi
                    </a>
                </p>
            </div>
        </div>
    </div>
}