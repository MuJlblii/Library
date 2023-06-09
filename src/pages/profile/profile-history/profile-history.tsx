import { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProfileCommentType, ProfileHistoryType } from '../../../app/reducer-user';
import { selectIsDesktopView, selectIsMobileView } from '../../../app/selector-main';
import { CommentModal } from '../../../components/comment-modal';
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
    const isDesktopView = useSelector(selectIsDesktopView);
    const isMobileView = useSelector(selectIsMobileView);

    const arrayImages = history?.books?.map((el, ind) =>
        <SwiperSlide data-test-id='history-slide' key={`slide-_${Math.random()*ind}`}>
            <ProfileBookcard
                view='Table'
                bookingId={history.id}
                userId={userId}
                type='comment'
                setBookIdForComment={setBookIdForComment}
                setIsShowingComment={setIsShowingComment}
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
                />
            }
        </div>
    )
}
