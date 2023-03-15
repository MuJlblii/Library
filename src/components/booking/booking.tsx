import { useLayoutEffect, useRef, useState } from 'react';
import { Dayjs } from 'dayjs';

import { Calendar } from '../calendar';

import style from './booking.module.css';

type BookingPropsType = {
	isShowingBooking: boolean,
	setIsShowingBooking: (arg: boolean) => void,
}

export const Booking = ({isShowingBooking, setIsShowingBooking}: BookingPropsType) => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);

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
        <div className={style.section}>
            <div className={style.wrapper} ref={calendarRef}>
                <div className={style.modal}>
                    <h3 className={style.title}>Выбор даты бронирования</h3>
                    <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
                    <button
                        disabled={!selectedDay}
                        className={style.btn}
                        type='submit'
                    >забронировать</button>
                </div>
            </div>
        </div>
    )
}