import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Dayjs } from 'dayjs';

import { useBookingMutation } from '../../app/api';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setToasterMsg } from '../../app/reducer';
import { UserStateType } from '../../app/reducer-user';
import { ReactComponent as CloseIcon } from '../../assets/img/Icon_close_toaster.svg';
import { Calendar } from '../calendar';
import { Loader } from '../loader';

import style from './booking.module.css';

type BookingPropsType = {
	isShowingBooking: boolean,
	setIsShowingBooking: (arg: boolean) => void,
    bookCardId: number
}

export const Booking = ({isShowingBooking, setIsShowingBooking, bookCardId}: BookingPropsType) => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
    const {User} = useAppSelector((state: UserStateType) => state.user)
    const [booking, {isLoading, isError, isSuccess }] = useBookingMutation();
    const submitHandler = () => {
        booking({data: {order: true, dateOrder: selectedDay?.add(3, 'hour')?.toDate(), book: bookCardId, customer: User?.id}})
    }

    useEffect(() => {
        if (isError) {
            dispatch(setToasterMsg({type: 'error', message: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!'}));
            setIsShowingBooking(false);

        }
        if (isSuccess) {
            dispatch(setToasterMsg({type: 'success', message: 'Книга забронирована. Подробности можно посмотреть на странице Профиль'}))
            setIsShowingBooking(false);
        }
    }, [dispatch, isError, isSuccess, setIsShowingBooking]);

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
            {isLoading && <Loader/>}
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
                        <h3 className={style.title} data-test-id='modal-title'>Выбор даты бронирования</h3>
                        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
                        <button
                            disabled={!selectedDay}
                            className={style.btn}
                            onClick={submitHandler}
                            type='submit'
                            data-test-id='booking-button'
                        >забронировать</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}