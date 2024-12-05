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

export const PRODUCTS_PER_PAGE: number = 9;

export const IMAGE_FALL_BACK_URL = 'https://placehold.co/600x400';

export const generateRandomId = (length = 8) => {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let result = '';
   for (let i = 0; i < length; i++) {
       const randomIndex = Math.floor(Math.random() * characters.length);
       result += characters[randomIndex];
   }
   return result;
}
