import { Fragment,useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../../app/hook';
import { UserStateType } from '../../../app/reducer-user';
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
        booking: isBooked
    }: IBookCard) => {
    const { searchValue } = useSearchValue();
    const [isShowingBooking, setIsShowingBooking] = useState(false);
    const {User} = useSelector((state: UserStateType) => state.user);
    const isBookedCurrentUser = isBooked && (isBooked.customerId === User?.id) ? true : false;
    // console.log('isBookedCurrentUser', isBookedCurrentUser, '// isBooked?.customerId', isBooked?.customerId, '// User?.id', User?.id)
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
        <NavLink to={`/books/${category}/${id}`} className={view === 'Table' ? style.link : lstyle.link} >
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
                    <input 
                        type="button"
                        value={isBooked && !isBookedCurrentUser ? 'ЗАБРОНИРОВАНА' : 'ЗАБРОНИРОВАТЬ'}
                        className={view === 'Table' ? style.bookcard__btn : lstyle.bookcard__btn}
                        disabled={isBooked !== null}
                        onClick={(e) => {e.preventDefault(); e.stopPropagation(); setIsShowingBooking(!isShowingBooking)}}
                    />

                    </div>
            </div>
        </NavLink>
        {isShowingBooking && <Booking setIsShowingBooking={setIsShowingBooking} isShowingBooking={isShowingBooking} bookCardId={id}/>}
        </Fragment>
)}