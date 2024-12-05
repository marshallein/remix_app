import {
   ActionFunctionArgs,
   json,
   LoaderFunctionArgs,
   redirect,
} from '@remix-run/node';
import { MetaFunction, useFetcher, useLoaderData } from '@remix-run/react';
import { Product } from '@prisma/client';
import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import { IMAGE_FALL_BACK_URL } from '~/modules/domain';
import { getProductById } from '~/modules/server/product.server';
import { addToCart, AddToCartType } from '~/modules/server/user.server';
import { getUser } from '~/modules/server/auth.server';

export const meta: MetaFunction = () => {
   return [{ title: 'Product Page' }];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
   if (!params.id) return;

   const product = (await getProductById(Number(params.id))) as Product;

   return { product };
};

export const action = async ({ request }: ActionFunctionArgs) => {
   const user = await getUser(request);

   if (!user) {
      return redirect("/login");
   }

   const data = await request.formData();
   const action = data.get('_action');
   const productId = data.get('id');
   const quantity = data.get('quantity');

   const payload: AddToCartType = {
      productId: Number(productId),
      quantity: Number(quantity),
      userId: Number(user?.id),
   };

   switch (action) {
      case 'addToCart': {
         await addToCart(payload);
         break;
      }
      case 'buyNow': {
         await addToCart(payload);
         return redirect('/cart');
      }
      default: {
         throw new Response('Bad Request', { status: 400 });
      }
   }
   return json({ success: true });
};

export default function ProductDetail() {
   const [quantity, setQuantity] = useState<number>(1);
   const data = useLoaderData<typeof loader>();
   const [displayImage, setDisplayImage] = useState<string>('');

   const fetcher = useFetcher();

   const handleClickButtonQuantity = useCallback(
      (decrease?: boolean) => {
         if (decrease) {
            setQuantity(_.clamp(quantity - 1, 1, 10));
         } else {
            setQuantity(_.clamp(quantity + 1, 1, 10));
         }
      },
      [quantity],
   );

   const imagesSet = useMemo(() => {
      if (data) {
         return [...data.product.imageSet, data.product.mainImageString]
      } else {
         return [IMAGE_FALL_BACK_URL]
      }
   }, [data])

   const salePrice = useMemo(() => {
      if (data?.product.salePercent) {
         return data.product.price - (data.product.salePercent / 100) * data.product.price
      } else {
         return null
      }

   }, [data?.product.price, data?.product.salePercent])

   return (
      <>
         <div className="container">
            <div className="product-info">
               <div className="product-images">
                  <img
                     src={
                        displayImage !== ''
                           ? displayImage
                           : data?.product.mainImageString ||
                           IMAGE_FALL_BACK_URL
                     }
                     alt="Main_Product_Image"
                  />
                  <div className="thumbnail-images">
                     {imagesSet.map((item, idx) => (
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
                        <img
                           src={item || IMAGE_FALL_BACK_URL}
                           onClick={() => setDisplayImage(item)}
                           key={idx}
                           alt="Thumbnail 1"
                        />
                     ))}
                  </div>
               </div>
               <div className="product-details">
                  <div className="product-title">
                     {data?.product?.productName}
                  </div>
                  <div className="product-price">
                     {salePrice ?
                        <p className='text-price'>
                           <span>{data?.product?.price.toLocaleString()}VND</span> {`${salePrice.toLocaleString()}VND`}
                        </p> :
                        <p className='text-price'>{data?.product?.price.toLocaleString()}VND</p>
                     }
                  </div>
                  <p className="product-description">
                     {data?.product?.description}
                  </p>

                  <h6>Materials:</h6>
                  <p>100% Premium Cloths</p>

                  <div className="color-options">
                     <h6>Color</h6>

                     {data?.product.AvailableColor.map((color, idx) => (
                        <span key={idx}>
                           <span
                              className="color-swatch"
                              style={{
                                 backgroundColor: color,
                              }}
                           >
                              {color}
                           </span>
                        </span>
                     ))}
                  </div>

                  <div
                     className="input-group mb-3"
                     style={{
                        width: '120px',
                     }}
                  >
                     <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="decrease-quantity"
                        onClick={() => handleClickButtonQuantity(true)}
                     >
                        -
                     </button>
                     <input
                        name="quantity"
                        type="text"
                        className="form-control text-center"
                        id="quantity"
                        readOnly
                        value={quantity}
                     />
                     <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="increase-quantity"
                        onClick={() => handleClickButtonQuantity(false)}
                     >
                        +
                     </button>
                  </div>

                  <div className="d-flex">
                     <fetcher.Form method="post">
                        <input
                           type="hidden"
                           name="quantity"
                           readOnly
                           value={quantity}
                        />
                        <input
                           type="hidden"
                           name="id"
                           value={data?.product?.id}
                           readOnly
                        />
                        <button
                           className="btn btn-danger me-2"
                           type="submit"
                           name="_action"
                           value="addToCart"
                        >
                           Add to Cart
                        </button>
                     </fetcher.Form>

                     <fetcher.Form method="post">
                        <input
                           type="hidden"
                           name="quantity"
                           readOnly
                           value={quantity}
                        />
                        <input
                           type="hidden"
                           name="id"
                           value={data?.product?.id}
                           readOnly
                        />
                        <button
                           className="btn btn-secondary"
                           type="submit"
                           name="_action"
                           value="buyNow"
                        >
                           Buy Now
                        </button>
                     </fetcher.Form>
                  </div>
               </div>
            </div>
            {/* TODO: make this display the product more clear */}
            {/* <div className="product-details-section mt-5">
               <h4>Product Description:</h4>
               <p>
                  {data?.product.description}
               </p>
            </div> */}
         </div>
      </>
   );
}
