import { useSelector } from 'react-redux';

import { UserProfileType } from '../../app/reducer-user';
import { selectProfile } from '../../app/selector-user';

import { BookingSection } from './booking-section';
import { Credentials } from './credentials';
import { HeadProfile } from './headprofile';
import { ProfileHanded } from './profile-handed';
import { ProfileHistory } from './profile-history';

import style from './profile.module.css';


export const Profile = () => {
    const profile: UserProfileType = useSelector(selectProfile);

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