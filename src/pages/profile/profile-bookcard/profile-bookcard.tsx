import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { useDeleteBookingMutation } from '../../../app/api';
import { useAppDispatch } from '../../../app/hook';
import { setToasterMsg } from '../../../app/reducer';
import { BookProfileType, ProfileCommentType, UserStateType } from '../../../app/reducer-user';
import imageDef from '../../../assets/img/image.png';
import { ReactComponent as Icon } from '../../../assets/img/Star.svg'
import { ProfileBlueCard } from '../profile-blue-card';

import style from './profile-bookcard.module.css';
import lstyle from './profile-bookcard-list.module.css';

export type ProfileBookcardType = BookProfileType & {
    view: string,
    bookingId: number,
    date?: string,
    type?: string,
    userId?: number,
    setBookIdForComment?: (arg: number) => void,
    setIsShowingComment?: (arg: boolean) => void,
    setPreviousComment?: (arg: ProfileCommentType) => void,
    existComment?: ProfileCommentType
}

export const ProfileBookcard = (
    {
        id,
        image,
        authors: author,
        title,
        rating,
        issueYear: year,
        view,
        bookingId,
        date,
        type,
        userId,
        setBookIdForComment,
        setIsShowingComment,
        setPreviousComment,
        existComment,
    }: ProfileBookcardType) => {
    const [deleteBooking, { isSuccess: isSuccessBooking, isError: isErrorBooking }] = useDeleteBookingMutation();
    const dispatch = useAppDispatch();
    const expired = dayjs().isAfter(dayjs(date), 'day');
    const submitRemoveBooking = () => {
        deleteBooking({id: bookingId});
    }
    const {User} = useSelector((state: UserStateType) => state.user);

    const [windowSize, setWindowSize] = useState(window.innerWidth);
    
      useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize(window.innerWidth);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      },[]);

    const ratingStars = (rate: number | null) => {
        const result = [];
        const size = {
            width: (view === 'List' && windowSize < 768) ? '13' : '20',
            height: (view === 'List' && windowSize < 768) ? '12' : '19'
        };

        for (let i=1; i<6; i++) {
            if (rate !== null && i <= rate ) {
                result.push(<Icon fill="#FFBC1F" key={i} {...size} />);
            } else {
                result.push(<Icon key={i} {...size}/>);
            }
        }

        return result;
    }

    useEffect (() => {
        if (isSuccessBooking) {
            dispatch(setToasterMsg({type: 'success', message: 'Бронирование книги успешно отменено!'}));
        }
        if (isErrorBooking) {
            dispatch(setToasterMsg({type: 'error', message: 'Не удалось снять бронирование книги. Попробуйте позже!'}));
        }
    })

    return (
        <NavLink to={`/books/all/${id}`} className={view === 'Table' ? style.link : lstyle.link}>
            <div className={view === 'Table' ? style.bookcard__wrapper : lstyle.bookcard__wrapper} data-test-id='card'>
                <div className={view === 'Table' ? style.bookcard__wrapper : lstyle.bookcard__container}>
                    <img src={image === null ? imageDef : `https://strapi.cleverland.by${image}`} alt="Nothing" className={view === 'Table' ? style.bookcard__img : lstyle.bookcard__img}/>
                    <div className={view === 'Table' ? style.bookcard__rating : lstyle.bookcard__rating}>
                        {rating === null && <p className={view === 'Table' ? style.bookcard__footer : lstyle.bookcard__footer}>ещё нет оценок</p>}
                        {rating !== null && (<div className={view === 'Table' ? style.bookcard__rating_star : lstyle.bookcard__rating_star}>{ratingStars((rating)).map(el => el)}</div>)}
                    </div>
                    <div className={view === 'Table' ? style.bookcard__text : lstyle.bookcard__text}>
                        <p className={view === 'Table' ? style.bookcard__title : lstyle.bookcard__title}>{title}</p>
                        <p className={view === 'Table' ? style.bookcard__footer : lstyle.bookcard__footer}>{author}, {year}</p>
                    </div>

                    {type==='booking' &&
                        <button
                            data-test-id='cancel-booking-button'
                            type='submit'
                            className={classNames(style.bookcard__btn_available, {
                                [style.bookcard__btn]: view === 'Table',
                                [lstyle.bookcard__btn]: view !== 'Table',
                            })}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                submitRemoveBooking()
                            }}
                        >
                            Отменить бронь
                        </button>
                    }
                    {type==='delivery' &&
                        <p className={style.delivery_date}>Возврат {dayjs(date).format('DD.MM')}</p>
                    }
                    {type==='comment' && setIsShowingComment && setBookIdForComment &&
                        <button
                            data-test-id='history-review-button'
                            type='submit'
                            className={classNames(style.bookcard__btn_available, {
                                [style.bookcard__btn]: view === 'Table',
                                [lstyle.bookcard__btn]: view !== 'Table',
                            })}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (existComment && setPreviousComment) {setPreviousComment(existComment)}
                                setBookIdForComment(id);
                                setIsShowingComment(true);
                            }}
                        >
                            {existComment ? 'Изменить оценку' : 'Оставить отзыв'}
                        </button>
                    }
                </div>
                {type==='booking' && expired &&
                    <ProfileBlueCard text='Дата бронирования книги истекла' comment='Через 24 часа книга будет  доступна всем' type='red'/>
                }
                {type==='delivery' && expired &&
                    <ProfileBlueCard text='Вышел срок пользования книги' comment='Верните книгу, пожалуйста' type='red'/>
                }
            </div>
        </NavLink>
    )
}