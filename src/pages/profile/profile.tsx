import { useSelector } from 'react-redux';

import { UserProfileType, UserStateType } from '../../app/reducer-user';

import { BookingSection } from './booking-section';
import { Credentials } from './credentials';
import { HeadProfile } from './headprofile';
import { ProfileHanded } from './profile-handed';
import { ProfileHistory } from './profile-history';

import style from './profile.module.css';


export const Profile = () => {
    const profile: UserProfileType = useSelector((state: UserStateType) => state.user.userProfile);

    return (
        <section className={style.profile__section}>
            <div className={style.profile__wrapper}>
                <HeadProfile {...profile} />
                <Credentials {...profile}/>
                <BookingSection {...profile} />
                <ProfileHanded {...profile}/>
                <ProfileHistory {...profile} />
            </div>
        </section>
    )
}