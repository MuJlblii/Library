import { ProfileHistoryType } from '../../../app/reducer-user';
import { ProfileBlueCard } from '../profile-blue-card';
import { ProfileBookcard } from '../profile-bookcard';

import parentStyle from '../profile.module.css';
import style from './profile-history.module.css';

export type ProfileHistoryPropsType = {
    history: ProfileHistoryType 
}


export const ProfileHistory = ({history}: ProfileHistoryPropsType) => {
    console.log('handed');

    return (
        <div className={style.profile__history}>
            <p className={parentStyle.profile__section_title}>История</p>
            <p className={parentStyle.profile__section_comment}>Список прочитанных книг</p>
            <div className={parentStyle.profile__history_form_wrapper}>
                {history?.books && 
                    history.books.map((el) => <ProfileBookcard view='List' bookingId={history.id} {...el}/>) }
                {!history?.books && <ProfileBlueCard text='Вы не читали книг из нашей библиотеки'/>}
            </div>
        </div>
    )
}