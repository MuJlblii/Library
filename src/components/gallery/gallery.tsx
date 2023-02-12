import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import SwiperCore, { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './gallery.css';
import style from './gallery.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([Navigation, Pagination, Thumbs]);
type PropsType = {
  images: string[];
  id?: string;
};

export const Gallery = ({ images, id }: PropsType) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const arrayImages = images.map((el, ind) => {
    if (ind === 0) {
      return (
        <SwiperSlide data-test-id='slide-mini' key={`slide-${id}-${ind+1}`}>
          <img
            src={require('../../assets/img/book.png')} // eslint-disable-line global-require
            alt='Book' 
          />
        </SwiperSlide>
      );
    }
    if (ind % 2 === 0) {
      return (
        <SwiperSlide data-test-id='slide-mini' key={`slide-${id}-${ind+1}`}>
          <img
            src={require('../../assets/img/Book1.jpg')} // eslint-disable-line global-require
            alt='Book' 
          />
        </SwiperSlide>
      );
    }

    return (
        <SwiperSlide data-test-id='slide-mini' key={`slide-${id}-${ind+1}`}>
          <img
            src={require('../../assets/img/Book2.jpg')} // eslint-disable-line global-require
            alt='Book' 
          />
        </SwiperSlide>
    )
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className={style.gallery__container}>
      <Swiper
        data-test-id='slide-big'
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          1440: {
            pagination: false,
          },
        }}
      >
        {arrayImages}
      </Swiper>
      {windowSize > 1439 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={30}
          slidesPerView={5}
          scrollbar={{ draggable: true }}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='swiper__thumbs'
        >
          {arrayImages}
        </Swiper>
      )}
    </div>
  );
};
