import { useSelector } from 'react-redux';

import { UserProfileType, UserStateType } from '../../app/reducer-user';

import { Credentials } from './credentials';
import { HeadProfile } from './headprofile';

import style from './profile.module.css';


export const Profile = () => {
    const profile: UserProfileType = useSelector((state: UserStateType) => state.user.userProfile);

    return (
        <section className={style.profile__section}>
            <div className={style.profile__wrapper}>
                <HeadProfile {...profile} />
                <Credentials {...profile}/>
                <div className={style.profile__booking}>
                    <p className={style.profile__section_title}>Забронированная книга</p>
                    <p className={style.profile__section_comment}>Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь</p>
                    <div className={style.profile__booking_form_wrapper}>
                        booking
                    </div>
                </div>
                <div className={style.profile__delivery}>
                    <p className={style.profile__section_title}>Книга которую взяли</p>
                    <p className={style.profile__section_comment}>Здесь можете просмотреть информацию о книге и узнать сроки возврата</p>
                    <div className={style.profile__delivery_form_wrapper}>
                        delivery
                    </div>
                </div>
                <div className={style.profile__history}>
                    <p className={style.profile__section_title}>История</p>
                    <p className={style.profile__section_comment}>Список прочитанных книг</p>
                    <div className={style.profile__history_form_wrapper}>
                        history
                    </div>
                </div>
            </div>
        </section>
    )
}