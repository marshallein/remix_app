import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";


export const meta: MetaFunction = () => {
    return [
        { title: "Product Page" },
    ];
};


export const loader = async ({ params }: LoaderFunctionArgs) => {

    if (!params.id) return;

    const product = await prisma.product.findFirst({
        where: {
            id: Number(params.id)
        }
    })

    return { product };
}
export default function Product() {
    const data = useLoaderData<typeof loader>();

    return <>
        <div className="container">

            <div className="product-info">
                <div className="product-images">
                    <img src="/aodai1.jpg" alt="Main_Product_Image" />
                    <div className="thumbnail-images">
                        <img src="/aodai1.jpg" alt="Thumbnail 1" />
                        <img src="/aodai1.jpg" alt="Thumbnail 2" />
                        <img src="/aodai1.jpg" alt="Thumbnail 3" />
                    </div>
                </div>
                <div className="product-details">
                    <div className="product-title">{data?.product?.productName}</div>
                    <div className="product-price">{data?.product?.price}$</div>
                    <p className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum
                        vestibulum.</p>

                    <h6>Materials:</h6>
                    <p>Lorem, ipsum, dolor</p>

                    <div className="color-options">
                        <h6>Color</h6>
                        <span className="color-swatch bg-danger"></span>
                        <span className="color-swatch bg-primary"></span>
                        <span className="color-swatch bg-success"></span>
                        <span className="color-swatch bg-dark"></span>
                    </div>

                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="button" id="decrease-quantity">-</button>
                        <input type="text" className="form-control text-center" id="quantity" />
                        <button className="btn btn-outline-secondary" type="button" id="increase-quantity">+</button>
                    </div>

                    <div className="d-flex">
                        <a href="shoppingcart.html">
                            <button className="btn btn-danger me-2">Add to Cart</button>
                        </a>

                        <a href="checkout.html">
                            <button className="btn btn-secondary">Buy Now</button>
                        </a>

                    </div>
                </div>
            </div>

            <div className="product-details-section mt-5">
                <h4>Product Details:</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            </div>

        </div>
    </>
}