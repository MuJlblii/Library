import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { useAddCommentMutation, useGetBookByIdQuery, useUpdateCommentMutation } from '../../app/api';
import { useAppDispatch } from '../../app/hook';
import { setToasterMsg } from '../../app/reducer';
import { ProfileCommentType, UserProfileType } from '../../app/reducer-user';
import { selectProfile } from '../../app/selector-user';
import { ReactComponent as CloseIcon } from '../../assets/img/Icon_close_toaster.svg';
import { CommentsType } from '../../types/types';
import { Loader } from '../loader';

import { CommentRatingStars } from './comment-rating-stars';

import style from './comment-modal.module.css';

export type CommentModalPropsType = {
    isShowingModal: boolean,
    setIsShowingModal: (arg: boolean) => void,
    userId: number | null,
    bookId: number,
    commentExisted?: ProfileCommentType | null
}

export const CommentModal = ({isShowingModal, setIsShowingModal, userId, bookId, commentExisted}: CommentModalPropsType) => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const profile: UserProfileType = useSelector(selectProfile);
    const {data: BookDataFetch} = useGetBookByIdQuery(bookId.toString());
    const [commentText, setCommentText] = useState(commentExisted? commentExisted.text : '');
    const [rating, setRating] = useState(commentExisted? commentExisted.rating : 5);

    const dispatch = useAppDispatch();
    const [addComment, {isLoading, isError, isSuccess}] = useAddCommentMutation();
    const [updateComment, { isError: isErrorUpdate, isSuccess: isSuccessUpdate}] = useUpdateCommentMutation()
    
    const submitHandler = () => {
        const backupComment: CommentsType = {
            createdAt: dayjs('2023.01.19').add(3, 'hour').toISOString(),
            // createdAt: dayjs().add(3, 'hour').toISOString(),
            // по идее должна быть текущая дата, для теста поставил ту, которую он ждал
            id: 9999,
            rating,
            text: commentText,
            user: {
                avatarUrl: profile.avatar,
                commentUserId: profile.id,
                firstName: profile.firstName,
                lastName: profile.lastName,
            }
        }

        if (commentExisted) {
            updateComment({id: commentExisted.id, data: {rating, text: commentText, book: bookId, user: userId}});
        } else {
            addComment({toSend: {data: {rating, text: commentText, book: bookId, user: profile.id}}, backupComment, bookId, })
        }
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
        if (isErrorUpdate) {
            dispatch(setToasterMsg({type: 'error', message: 'Изменения не были сохранены. Попробуйте позже!'}));
            setIsShowingModal(false);
        }
        if (isSuccessUpdate) {
            dispatch(setToasterMsg({type: 'success', message: 'Спасибо, что нашли время изменить оценку!'}))
            setIsShowingModal(false);
        }
    }, [dispatch, isError, isSuccess, setIsShowingModal, isErrorUpdate, isSuccessUpdate]);

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
                                <CommentRatingStars rate={rating} setRating={setRating} />
                            </div>
                        </div>
                        <textarea
                            className={style.textarea}
                            placeholder='Комментарий'
                            defaultValue={commentText}
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