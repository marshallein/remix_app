export default function AboutUsPage() {
    return <div className="container">
        <div className="hero">
            <h1>About Us</h1>
        </div>

        <div className="content">
            <h2>The Silk Charm</h2>
            <div className="text-section">
                <div className="left-column">
                    <p>
                        Welcome to The Silk Charm, where the elegance of traditional Vietnamese Ao Dai meets modern sensibilities. With over 20 years of meticulous tailoring, our high-quality garments celebrate the timeless beauty of silk.
                    </p>
                </div>
                <div className="right-column">
                    <p>
                        Each piece in our collection is thoughtfully designed to bring grace and refinement to every occasion. Discover the harmony of Ao Dai and experience the magic of Vietnamese craftsmanship.
                    </p>
                </div>
            </div>

            <div className="image-box" style={{ backgroundImage: "url('/poster.jpg');" }}>
            </div>

            <div className="commitment-section">
                <div className="image-box" style={{ backgroundImage: "url('/aodai1.jpg');" }}>
                </div>
                <div className="commitment-text">
                    <h2>THE SILK CHARM</h2>
                    <h4>Finest AO DAI Store!</h4>
                    <p>
                        At The Silk Charm, we are dedicated to preserving the rich heritage of Vietnamese fashion while embracing contemporary trends. Our commitment to quality ensures that every garment is crafted to perfection.
                    </p>
                </div>
            </div>
        </div>
    </div >
}