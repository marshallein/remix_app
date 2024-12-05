import { Link } from "@remix-run/react";

export default function ThankYouPage() {
    return <main>
        <div className="thank-you-container">
            <div className="checkmark">✔</div>
            <h1>Thank you!</h1>
            <p>This process took only a few minutes of your time.<br />Thank you Minh Anh; you are so kind! Your contributions are always very helpful.</p>
            <Link to={"/"}>Back to Home</Link>
        </div>
    </main>
}
