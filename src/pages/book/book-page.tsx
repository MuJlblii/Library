import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

import { useGetBookByIdQuery } from '../../app/api';
import { useAppSelector } from '../../app/hook';
import image from '../../assets/img/default_book.png';
import {ReactComponent as IconSpoiler} from '../../assets/img/Icon_spoiler_black.svg';
import {ReactComponent as SlashIcon} from '../../assets/img/Slash.svg';
import { Booking } from '../../components/booking';
import { ErrorToaster } from '../../components/error-toaster';
import { Gallery } from '../../components/gallery';
import { Loader } from '../../components/loader';
import { Rating } from '../../components/rating';
import { IBooksState, IComments } from '../../interface/interface';

import { Comment } from './comment';
import { CommentModal } from './comment-modal';

import style from './book-page.module.css';

export const BookPage = () => {
  dayjs.locale('ru');
	dayjs.extend(updateLocale);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isShowingBooking, setIsShowingBooking] = useState(false);
  const [isShowCommentModal, setIsShowCommentModal] = useState(false);
  const dataState: IBooksState[] = useAppSelector((state) => state.main.data);
  const userId: number | null = useAppSelector((state) => state.user.User?.id) || null;
  const {bookId, category} = useParams();
  const {data, isLoading, isError, isFetching} = useGetBookByIdQuery(bookId as string);
  const isBooked = data?.booking;
  const isBookedCurrentUser = isBooked && (isBooked.customerId === userId) ? true : false;
  const isBookedAnotherUser = isBooked && (isBooked.customerId !== userId) ? true : false;
  const dateDelivery = dayjs(data?.delivery?.dateHandedTo).format('DD.MM');
  const isOnDelivery = typeof data?.delivery?.dateHandedTo === 'string';
  const isCommentExist = data && data?.comments.filter((element) => element.user.commentUserId === userId).length > 0;

  return (
    <section className={style.section}>
      {(isLoading || isFetching) && <Loader />}
      {isError && <ErrorToaster />}
      {isShowingBooking &&
        <Booking
          isShowingBooking={isShowingBooking}
          setIsShowingBooking={setIsShowingBooking}
          bookCardId={Number(bookId)}
          isBooked={isBookedCurrentUser}
        />}
      {isShowCommentModal &&
        <CommentModal
          isShowingModal={isShowCommentModal}
          setIsShowingModal={setIsShowCommentModal}
          bookId={Number(bookId)}
          userId={userId}
        />
      }
      {!isError && 
        <div className={`${style.crumbs}`}>
          <div className={`${style.crumbs_content} ${style.container}`}>
            <NavLink
              to={`/books/${category}`}
              data-test-id='breadcrumbs-link'
            >{dataState.find((el: IBooksState) => el.path === category)?.name}</NavLink>
            <span>
              <SlashIcon />
            </span>
            <p data-test-id='book-name'>{data?.title}</p>
          </div>
        </div>
      }
      {data?.id && 
        <div className={`${style.container}`}>
          <div className={style.basic__content}>
            <div className={style.basic__content_img}>
              {data?.images === null && <img src={image} alt='Book' />}
              {data?.images?.length === 1 && <img src={`https://strapi.cleverland.by${data?.images[0].url}`} alt='Book' />}
              {data?.images?.length && data?.images?.length > 1 && <Gallery images={data?.images} id={data?.id}/>}
            </div>
              <div className={style.basic__content_header}>
                <h3 className={style.basic__content_title} data-test-id='book-title'>
                  {data?.title}
                </h3>
                <p className={style.basic__content_author}>{data?.authors}, {data?.issueYear}</p>
                <button
                  type='submit'
                  onClick={(e) => {e.preventDefault(); e.stopPropagation(); setIsShowingBooking(true)}}
                  className={classNames(
                    style.basic__content_bill,
                    {[style.basic__content_bill_available]: isBookedCurrentUser,}
                  )}
                  data-test-id='booking-button'
                  disabled={isOnDelivery || isBookedAnotherUser}
                >
                  {isOnDelivery
                    ? `Занята до ${dateDelivery}`
                    : isBooked
                    ? 'ЗАБРОНИРОВАНА'
                    : 'ЗАБРОНИРОВАТЬ'
                  }
                </button>
              </div>
              <div className={style.basic__content_footer}>
                <p className={style.basic__content_footer_title}>О книге</p>
                <hr className={style.basic__content_footer_hr} />
                <div className={style.basic__content_footer_cont}>
                  <p className={style.basic__content_footer_paragraph}>
                      {data?.description}
                  </p>
                </div>
              </div>
          </div>
          <div className={style.additional_block}>
            <div className={style.rating}>
              <p className={style.rating_header}>Рейтинг</p>
              <hr className={style.hr} />
              <Rating page='bookpage' rating={data?.rating} style={style}/>
            </div>
            <div className={style.detailed}>
              <p className={style.detailed_title}>Подробная информация</p>
              <hr className={style.hr} />
              <div className={style.detailed__table}>
                <div className={style.detailed__table_first}>
                  <p className={style.detailed_topic}>Издательство</p>
                  <p className={style.detailed_description}>{data?.producer}</p>
                  <p className={style.detailed_topic}>Год издания</p>
                  <p className={style.detailed_description}>{data?.issueYear}</p>
                  <p className={style.detailed_topic}>Страниц</p>
                  <p className={style.detailed_description}>{data?.pages}</p>
                  <p className={style.detailed_topic}>Переплет</p>
                  <p className={style.detailed_description}>{data?.cover}</p>
                  <p className={style.detailed_topic}>Формат</p>
                  <p className={style.detailed_description}>{data?.format}</p>
                </div>
                <div className={style.detailed__table_two}>
                  <p className={style.detailed_topic}>Жанр</p>
                  <p className={style.detailed_description}>{data?.categories}</p>
                  <p className={style.detailed_topic}>Вес</p>
                  <p className={style.detailed_description}>{data?.weight}</p>
                  <p className={style.detailed_topic}>ISBN</p>
                  <p className={style.detailed_description}>{data?.ISBN}</p>
                  <p className={style.detailed_topic}>Изготовитель</p>
                  <p className={style.detailed_description}>{data?.producer}</p>
                </div>
              </div>
            </div>
            <div className={style.feedback}>
              <div className={style.feedback__header}>
                <p className={style.feedback__title}>
                  Отзывы<span className={style.feedback__title_total}>{data.comments.length}</span>
                </p>
                <IconSpoiler
                  onClick={() => setIsSpoiler(!isSpoiler)}
                  className={isSpoiler ? style.feedback__spoiler_icon : style.feedback__spoiler_icon_active}
                  data-test-id='button-hide-reviews'
                />
              </div>
                  <div className={style.feedback__detailed_wrapper} data-test-id='reviews'>
                    {[...data.comments].sort((a, b) => 
                        dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) === true ? 1 : -1).map((comment: IComments, ind) =>
                        <Comment {...comment} key={`comment-${Math.random() * ind}_${new Date().getTime()}`}
                        />)}
                    <button
                      type='submit'
                      disabled={isCommentExist}
                      className={style.feedback_btn}
                      data-test-id='button-rate-book'
                      onClick={(e) => {e.preventDefault(); e.stopPropagation(); setIsShowCommentModal(true)}}
                    >оценить книгу</button>
                  </div>
            </div>
          </div>
        </div>
      }
    </section>
  )
};
