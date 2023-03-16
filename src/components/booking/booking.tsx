import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Dayjs } from 'dayjs';

import { useBookingMutation, useGetAllBooksQuery, useGetCategoriesQuery } from '../../app/api';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setDataFetch } from '../../app/reducer';
import { UserStateType } from '../../app/reducer-user';
import { createBooksState } from '../../app/utils';
import { ReactComponent as CloseIcon } from '../../assets/img/Icon_close_toaster.svg';
import { Calendar } from '../calendar';
import { ErrorToaster } from '../error-toaster';
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
    const { data: dataBooks, isLoading: isLoadingAllBooks, isError: isErrorAllBooks } = useGetAllBooksQuery(undefined);
    const { data: dataCategories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetCategoriesQuery(undefined);
    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
    const {User} = useAppSelector((state: UserStateType) => state.user)
    const [booking, {isLoading, isSuccess, isError, error}] = useBookingMutation();
    const submitHandler = () => {
        booking({data: {order: true, dateOrder: selectedDay?.add(3, 'hour')?.toDate(), book: bookCardId, customer: User?.id}})
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

    useEffect(() => {
        if (isSuccess && dataBooks && dataCategories) {
            const dataFetch = createBooksState(dataCategories, dataBooks);

            dispatch(setDataFetch(dataFetch));
            setIsShowingBooking(false);
        }
    }, [setIsShowingBooking, dataBooks, isSuccess, dataCategories, dispatch])

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
                {isError && error && <ErrorToaster />}
                </div>
            </div>
        </Fragment>
    )
}