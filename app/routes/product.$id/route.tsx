import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";
import { Product } from "@prisma/client";
import { useCallback, useState } from "react";
import _ from "lodash"

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
    }) as Product

    return { product };
}
export default function ProductDetail() {
    const [quantity, setQuantity] = useState<number>(0);
    const data = useLoaderData<typeof loader>();

    const handleClickButtonQuantity = useCallback((decrease?: boolean) => {

        if (decrease) {
            setQuantity(_.clamp(quantity - 1, 0, 10));
        } else {
            setQuantity(_.clamp(quantity + 1, 0, 10));
        }

    }, [quantity])

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
                    <p className="product-description">{data?.product?.description}</p>

                    <h6>Materials:</h6>
                    <p>Lorem, ipsum, dolor</p>

                    <div className="color-options">
                        <h6>Color</h6>

                        {data?.product.AvailableColor.map((color, idx) => (
                            <span key={idx}>
                                <span className="color-swatch" style={{ backgroundColor: color }}>{color}</span>
                            </span>
                        ))}
                    </div>

                    <div className="input-group mb-3" style={{ width: "120px" }}>
                        <button className="btn btn-outline-secondary" type="button" id="decrease-quantity" onClick={() => handleClickButtonQuantity(true)}>-</button>
                        <input type="text" className="form-control text-center" id="quantity" value={quantity} />
                        <button className="btn btn-outline-secondary" type="button" id="increase-quantity" onClick={() => handleClickButtonQuantity(false)}>+</button>
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