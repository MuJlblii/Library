import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';

import { useBookingMutation, useChangeBookingMutation, useDeleteBookingMutation } from '../../app/api';
import { useAppDispatch } from '../../app/hook';
import { setToasterMsg } from '../../app/reducer';
import { selectUser } from '../../app/selector-user';
import { ReactComponent as CloseIcon } from '../../assets/img/Icon_close_toaster.svg';
import { BookingType } from '../../types/types';
import { Calendar } from '../calendar';
import { Loader } from '../loader';

import style from './booking.module.css';

type BookingPropsType = {
	isShowingBooking: boolean,
	setIsShowingBooking: (arg: boolean) => void,
    bookCardId: number,
    isBooked: boolean,
    bookingObj?: BookingType | null,
}

export const Booking = ({isShowingBooking, setIsShowingBooking, bookCardId, isBooked, bookingObj = null}: BookingPropsType) => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(bookingObj ? dayjs(bookingObj?.dateOrder) : null);
    const User = useSelector(selectUser)
    const [isCalendarClicked, setIsCalendarClicked] = useState(false);
    const [booking, {isLoading, isError, isSuccess }] = useBookingMutation();
    const [deleteBooking, {isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete}] = useDeleteBookingMutation();
    const [changeBooking, {isLoading: isLoadingChanges, isError: isErrorChanges, isSuccess: isSuccessChanges }] = useChangeBookingMutation();
    const submitHandler = () => {
        if (isBooked) {
            if (selectedDay?.isSame(bookingObj?.dateOrder, 'day')) {
                dispatch(setToasterMsg({type: 'error', message: 'Изменения не были сохранены. Попробуйте позже!'}));
                setIsShowingBooking(false);
            } else {
                changeBooking({id: bookingObj?.id, data: {order: true, dateOrder: selectedDay?.add(3, 'hour')?.toDate(), book: bookCardId, customer: User?.id}}) 
            }
        } else 
        booking({data: {order: true, dateOrder: selectedDay?.add(3, 'hour')?.toDate(), book: bookCardId, customer: User?.id}})
    }
    const submitRemoveBooking = () => {
        deleteBooking({id: bookingObj?.id});
    }

    useEffect(() => {
        if (isError) {
            dispatch(setToasterMsg({type: 'error', message: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!'}));
            setIsShowingBooking(false);
        }
        if (isErrorChanges) {
            dispatch(setToasterMsg({type: 'error', message: 'Изменения не были сохранены. Попробуйте позже!'}));
            setIsShowingBooking(false);
        }
        if (isErrorDelete) {
            dispatch(setToasterMsg({type: 'error', message: 'Не удалось снять бронирование книги. Попробуйте позже!'}));
            setIsShowingBooking(false);
        }
        if (isSuccess) {
            dispatch(setToasterMsg({type: 'success', message: 'Книга забронирована. Подробности можно посмотреть на странице Профиль'}))
            setIsShowingBooking(false);
        }
        if (isSuccessChanges) {
            dispatch(setToasterMsg({type: 'success', message: 'Изменения успешно сохранены!'}))
            setIsShowingBooking(false);
        }
        if (isSuccessDelete) {
            dispatch(setToasterMsg({type: 'success', message: 'Бронирование книги успешно отменено!'}))
            setIsShowingBooking(false);
        }
    }, [dispatch, isError, isSuccess, setIsShowingBooking, isErrorChanges, isSuccessChanges, isErrorDelete, isSuccessDelete]);

    useLayoutEffect(() => {
        const closePopUp = (e: Event): void => {
            if (!calendarRef.current?.contains(e.target as Node) && isShowingBooking) {
                setIsShowingBooking(false);
            }
        }

        document.body.addEventListener('click', closePopUp);

        return () => document.body.removeEventListener('click', closePopUp);
    },[isShowingBooking, setIsShowingBooking])

    return (
        <Fragment>
            {(isLoading || isLoadingChanges || isLoadingDelete) && <Loader/>}
            <div className={style.section} data-test-id='modal-outer'>
                <div className={style.wrapper} ref={calendarRef} data-test-id='booking-modal'>
                    <button
                        type='button'
                        className={style.close_icon}
                        onClick={() => setIsShowingBooking(false)}
                        data-test-id='modal-close-button'
                    >
                        <CloseIcon />
                    </button>
                    <div className={style.modal}>
                        <h3 className={style.title} data-test-id='modal-title'>{isBooked ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}</h3>
                        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} setIsCalendarClicked={setIsCalendarClicked}/>
                        <button
                            disabled={!isCalendarClicked}
                            className={classNames(style.btn, style.btn_booking)}
                            onClick={submitHandler}
                            type='submit'
                            data-test-id='booking-button'
                        >забронировать</button>
                        {isBooked &&
                            <button
                                className={classNames(style.btn, style.btn_delete)}
                                onClick={submitRemoveBooking}
                                type='submit'
                                data-test-id='booking-cancel-button'
                            >отменить бронь</button>}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}