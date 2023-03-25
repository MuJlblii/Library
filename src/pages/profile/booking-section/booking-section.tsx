import { ProfileBookingType } from '../../../app/reducer-user';
import { ProfileBlueCard } from '../profile-blue-card';
import { ProfileBookcard } from '../profile-bookcard';

import parentStyle from '../profile.module.css';
import style from './booking-section.module.css';

export type BookingSectionPropsType = {
    booking: ProfileBookingType;
}

export const BookingSection = ({booking} : BookingSectionPropsType) => (
        <div className={parentStyle.section__container}>
        <p className={parentStyle.profile__section_title}>Забронированная книга</p>
        <p className={parentStyle.profile__section_comment}>Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь</p>
        <div className={style.profile__booking_form_wrapper}>
            {booking?.book && <ProfileBookcard view='List' bookingId={booking.id} type='booking' date={booking.dateOrder} {...booking.book}/>}
            {!booking?.book && <ProfileBlueCard text='Забронируйте книгу и она отобразится '/>}
        </div>
    </div>
)
