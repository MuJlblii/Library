import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { useAddCommentMutation } from '../../../app/api';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { setToasterMsg } from '../../../app/reducer';
import { ReactComponent as CloseIcon } from '../../../assets/img/Icon_close_toaster.svg';
import { ReactComponent as Icon } from '../../../assets/img/Star.svg';
import { Loader } from '../../../components/loader';

import style from './comment-modal.module.css';

export type CommentModalPropsType = {
    isShowingModal: boolean,
    setIsShowingModal: (arg: boolean) => void,
    userId: number | null,
    bookId: number,
}

export const CommentModal = ({isShowingModal, setIsShowingModal, userId, bookId}: CommentModalPropsType) => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const isMobileView = useAppSelector((state) => state.main.isMobileView);
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);
    const ratingStars = (rate: number | null) => {
        const result = [];
        const size = {
            width: isMobileView ? '26' :'35',
            height: isMobileView ? '25': '32.5',
        };

        for (let i=1; i<6; i++) {
            if (rate !== null && i <= rate ) {
                result.push(
                    <button
                        className={style.grade_btn}
                        type='submit'
                        onClick={(e) => {e.preventDefault(); e.stopPropagation(); setRating(i)}}
                        data-test-id='star'
                        key={`comment-star-${Math.random() * i}_${new Date().getTime()}`}
                    >
                        <Icon fill="#FFBC1F" key={i} {...size} data-test-id='star-active'/>
                    </button>
                );
            } else {
                result.push(
                    <button
                        className={style.grade_btn}
                        type='submit'
                        onClick={() => setRating(i)}
                        data-test-id='star'
                        key={`comment-star-${Math.random() * i}_${new Date().getTime()}`}
                    >
                        <Icon key={i} {...size} onClick={(e) => {e.preventDefault(); e.stopPropagation(); setRating(i)}} />
                    </button>
                );
            }
        }

        return result;
    }
    const dispatch = useAppDispatch();
    const [addComment, {isLoading, isError, isSuccess}] = useAddCommentMutation()
    
    const submitHandler = () => {
        addComment({data: {rating, text: commentText, book: bookId, user: userId}})
    }

    useEffect(() => {
        if (isError) {
            dispatch(setToasterMsg({type: 'error', message: 'Оценка не была отправлена. Попробуйте позже!'}));
            setIsShowingModal(false);
        }
        if (isSuccess) {
            dispatch(setToasterMsg({type: 'success', message: 'Спасибо, что нашли время оценить книгу!'}))
            setIsShowingModal(false);
        }
    }, [dispatch, isError, isSuccess, setIsShowingModal]);

    useLayoutEffect(() => {
        const closeModal = (e: Event): void => {
            if (!calendarRef.current?.contains(e.target as Node) && isShowingModal) {
                setIsShowingModal(false);
            }
        }

        document.body.addEventListener('click', closeModal);

        return () => document.body.removeEventListener('click', closeModal);
    },[isShowingModal, setIsShowingModal])

    return (
        <Fragment>
            {(isLoading) && <Loader/>}
            <div className={style.section} data-test-id='modal-outer'>
                <div className={style.wrapper} ref={calendarRef} data-test-id='modal-rate-book'>
                    <button
                        type='button'
                        className={style.close_icon}
                        onClick={() => setIsShowingModal(false)}
                        data-test-id='modal-close-button'
                    >
                        <CloseIcon />
                    </button>
                    <div className={style.modal}>
                        <h3 className={style.title} data-test-id='modal-title'>Оцените книгу</h3>
                        <div className={style.grade} data-test-id='rating'>
                            <p className={style.grade_title}>Ваша оценка</p>
                            <div className={style.grade_btns}>
                                {ratingStars((rating)).map(el => el)}
                            </div>
                        </div>
                        <textarea
                            className={style.textarea}
                            placeholder='Комментарий'
                            onChange={(e) => setCommentText(e.target.value)}
                            data-test-id='comment'
                        />
                        <button
                            className={classNames(style.btn, style.btn_booking)}
                            onClick={submitHandler}
                            type='submit'
                            data-test-id='button-comment'
                        >оценить</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}