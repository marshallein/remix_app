import { FC } from 'react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
   images: string[];
   delay?: number;
   loop?: boolean;
   slidePerView?: number;
};

const SliderCarousel: FC<Props> = ({
   images,
   delay = 5000,
   loop = true,
   slidePerView = 1,
}) => {
   return (
      <Swiper
         slidesPerView={slidePerView}
         effect="fade"
         modules={[EffectFade, Autoplay]}
         style={{ maxHeight: '472px' }}
         autoplay={{ delay: delay }}
         loop={loop}
      >
         {images.map((item, idx) => (
            <SwiperSlide key={idx}>
               <img
                  src={item}
                  className=""
                  style={{
                     objectFit: 'cover',
                     height: '472px',
                  }}
                  alt={`banner${idx}`}
               />
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

export default SliderCarousel;
