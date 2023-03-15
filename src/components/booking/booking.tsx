import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { Dayjs } from 'dayjs';

import { useBookingMutation } from '../../app/api';
import { useAppSelector } from '../../app/hook';
import { UserStateType } from '../../app/reducer-user';
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
    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
    const {User} = useAppSelector((state: UserStateType) => state.user)
    const [booking, {isLoading, isSuccess, isError, error}] = useBookingMutation();
    const submitHandler = () => {
        booking({data: {order: true, dateOrder: selectedDay, book: bookCardId, customer: User?.id}})
    }

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
            <div className={style.section}>
                <div className={style.wrapper} ref={calendarRef}>
                    <div className={style.modal}>
                        <h3 className={style.title}>Выбор даты бронирования</h3>
                        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
                        <button
                            disabled={!selectedDay}
                            className={style.btn}
                            onClick={submitHandler}
                            type='submit'
                        >забронировать</button>
                    </div>
                {isError && error && 'message' in error && <p>{error.message}</p>}
                </div>
            </div>
        </Fragment>
    )
}