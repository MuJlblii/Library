import { useState } from 'react';
import classNames from 'classnames';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAppSelector } from '../../../app/hook';
import { ProfileCommentType, ProfileHistoryType } from '../../../app/reducer-user';
import { CommentModal } from '../../book/comment-modal';
import { ProfileBlueCard } from '../profile-blue-card';
import { ProfileBookcard } from '../profile-bookcard';

import './gallery.css';
import parentStyle from '../profile.module.css';
import style from './profile-history.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

export type ProfileHistoryPropsType = {
    comments: ProfileCommentType[]
    history: ProfileHistoryType,
    id: number,
}


export const ProfileHistory = ({ history, id: userId, comments }: ProfileHistoryPropsType) => {
    const [isShowingComment, setIsShowingComment] = useState(false);
    const [bookIdForComment, setBookIdForComment] = useState<number | null>(null);
    const [previousComment, setPreviousComment] = useState<ProfileCommentType | null>(null);
    const isDesktopView = useAppSelector((state) => state.main.isDesktopView);
    const isMobileView = useAppSelector((state) => state.main.isMobileView);

    const arrayImages = history?.books?.map((el, ind) =>
        <SwiperSlide data-test-id='history-slide' key={`slide-_${Math.random()*ind}`}>
            <ProfileBookcard
                view='Table'
                bookingId={history.id}
                userId={userId}
                type='comment'
                setBookIdForComment={setBookIdForComment}
                setIsShowingComment={setIsShowingComment}
                setPreviousComment={setPreviousComment}
                existComment={comments?.find(comment => comment?.bookId === el.id)}
                {...el} />
        </SwiperSlide>
    )

    return (
        <div className={classNames(style.profile)} data-test-id='history'>
            <p className={parentStyle.profile__section_title}>История</p>
            <p className={parentStyle.profile__section_comment}>Список прочитанных книг</p>
            <div className={style.profile__history_form_wrapper}>
                {history?.books &&
                    <Swiper
                        slidesPerView={isDesktopView? 4 : isMobileView ? 1 : 3}
                        spaceBetween={30}
                        pagination={{
                        clickable: true,
                        }}
                        modules={[Pagination]}
                        className='swiper__thumbs'
                    >
                        {arrayImages}
                    </Swiper>
                }
                {!history?.books && <ProfileBlueCard text='Вы не читали книг из нашей библиотеки' />}
            </div>
            {isShowingComment && userId &&
                <CommentModal
                    isShowingModal={isShowingComment}
                    setIsShowingModal={setIsShowingComment}
                    bookId={Number(bookIdForComment)}
                    userId={userId}
                    commentExisted={previousComment}
                />
            }
        </div>
    )
}










// import { useEffect, useState } from 'react';
// import type { Swiper as SwiperType } from 'swiper';
// import SwiperCore, { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

// import './gallery.css';
// import style from './gallery.module.css';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// SwiperCore.use([Navigation, Pagination, Thumbs]);
// type PropsType = {
//   images: Array<{url: string}>;
//   id?: number;
// };

// export const Gallery = ({ images, id }: PropsType) => {
//     const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
//     const [windowSize, setWindowSize] = useState(window.innerWidth);
//     const arrayImages = images.map((el, ind) =>
//         <SwiperSlide data-test-id='slide-mini' key={`slide-${id}-${ind + 1}`}>
//             <img
//                 src={`https://strapi.cleverland.by${el.url}`}
//                 alt='Book'
//             />
//         </SwiperSlide>

//     )

//     useEffect(() => {
//         const handleWindowResize = () => {
//             setWindowSize(window.innerWidth);
//         };

//         window.addEventListener('resize', handleWindowResize);

//         return () => {
//             window.removeEventListener('resize', handleWindowResize);
//         };
//     }, []);

//     return (
//         <div className={style.gallery__container}>
//             <Swiper
//                 data-test-id='slide-big'
//                 spaceBetween={10}
//                 navigation={true}
//                 thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                 modules={[FreeMode, Navigation, Thumbs, Pagination]}
//                 pagination={{
//                     clickable: true,
//                 }}
//                 breakpoints={{
//                     1440: {
//                         pagination: false,
//                     },
//                 }}
//             >
//                 {arrayImages}
//             </Swiper>
//             {windowSize > 1439 && (
//                 <Swiper
//                     onSwiper={setThumbsSwiper}
//                     spaceBetween={30}
//                     slidesPerView={5}
//                     scrollbar={{ draggable: true }}
//                     watchSlidesProgress={true}
//                     modules={[FreeMode, Navigation, Thumbs]}
//                     className='swiper__thumbs'
//                 >
//                     {arrayImages}
//                 </Swiper>
//             )}
//         </div>
//     );
// };
