import { Fragment,useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { useAppSelector } from '../../../app/hook';
import { selectUser } from '../../../app/selector-user';
import imageDef from '../../../assets/img/image.png';
import { ReactComponent as Icon } from '../../../assets/img/Star.svg'
import { IBookCard } from '../../../interface/interface';
import { useSearchValue } from '../../../layouts/layout-main-page/layout-main-page';
import { Booking } from '../../booking';

import style from './bookcard.module.css';
import lstyle from './bookcard-list.module.css';

export const Bookcard = (
    {
        id,
        image,
        category,
        authors: author,
        title,
        rating,
        issueYear: year,
        booking: isBooked,
        delivery
    }: IBookCard) => {
    const { searchValue } = useSearchValue();
    const [isShowingBooking, setIsShowingBooking] = useState(false);
    const User = useSelector(selectUser);
    const isBookedCurrentUser = isBooked && (isBooked.customerId === User?.id) ? true : false;
    const isBookedAnotherUser = isBooked && (isBooked.customerId !== User?.id) ? true : false;
    const dateDelivery = dayjs(delivery?.dateHandedTo).format('DD.MM');
    const isOnDelivery = typeof delivery?.dateHandedTo === 'string';
    const getHighlightedText = (text: string, highlight: string) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

        return (
            <Fragment> 
                {parts.map((part, ind) => {
                    if (part.toLowerCase() === highlight.toLowerCase())
                        return (
                            <span
                                key={`${ part}_${Math.random()*ind}_${ new Date().getTime() }`}
                                style={{ color: '#FF5253' }}
                                data-test-id='highlight-matches'
                            >
                                { part }
                            </span>)

                    return part
                })}
            </Fragment>
        );
    };

    const view = useAppSelector((state) => state.main.bookShelfView);
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

    return (
        <Fragment>
        <NavLink to={`/books/${category}/${id}`} className={view === 'Table' ? style.link : lstyle.link}>
            <div className={view === 'Table' ? style.bookcard__wrapper : lstyle.bookcard__wrapper} data-test-id='card'>
                <div className={view === 'Table' ? style.bookcard__wrapper : lstyle.bookcard__container}>
                    <img src={image === null ? imageDef : `https://strapi.cleverland.by${image.url}`} alt="Nothing" className={view === 'Table' ? style.bookcard__img : lstyle.bookcard__img}/>
                    <div className={view === 'Table' ? style.bookcard__rating : lstyle.bookcard__rating}>
                        {rating === null && <p className={view === 'Table' ? style.bookcard__footer : lstyle.bookcard__footer}>ещё нет оценок</p>}
                        {rating !== null && (<div className={view === 'Table' ? style.bookcard__rating_star : lstyle.bookcard__rating_star}>{ratingStars((rating)).map(el => el)}</div>)}
                    </div>
                    <div className={view === 'Table' ? style.bookcard__text : lstyle.bookcard__text}>
                        <p className={view === 'Table' ? style.bookcard__title : lstyle.bookcard__title}>{getHighlightedText(title, searchValue)}</p>
                        <p className={view === 'Table' ? style.bookcard__footer : lstyle.bookcard__footer}>{author}, {year}</p>
                    </div>
                    <button 
                        type="submit"
                        className={classNames({
                            [style.bookcard__btn]: view === 'Table',
                            [lstyle.bookcard__btn]: view !== 'Table',
                            [style.bookcard__btn_available]: isBookedCurrentUser,

                        })}
                        disabled={isOnDelivery || isBookedAnotherUser}
                        data-test-id='booking-button'
                        onClick={(e) => {e.preventDefault(); e.stopPropagation(); setIsShowingBooking(!isShowingBooking)}}
                    >{isOnDelivery
                        ? `Занята до ${dateDelivery}`
                        : isBooked
                        ? 'забронирована'
                        : 'забронировать'
                      }</button>

                    </div>
            </div>
        </NavLink>
        {isShowingBooking &&
            <Booking
                setIsShowingBooking={setIsShowingBooking}
                isShowingBooking={isShowingBooking}
                bookCardId={id}
                isBooked={isBookedCurrentUser}
                bookingObj={isBooked}
            />
        }
        </Fragment>
)}