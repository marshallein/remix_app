export const carouselResponsive = {
   desktop: {
      breakpoint: {
         max: 3000,
         min: 1024,
      },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
   },
   tablet: {
      breakpoint: {
         max: 1024,
         min: 464,
      },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
   },
   mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
   },
};

export type Tags = 'Modern' | 'Traditional' | 'Long_Dress' | 'Five_Panel';

export const PRODUCTS_PER_PAGE: number = 3;

export const IMAGE_FALL_BACK_URL = "https://placehold.co/600x400"