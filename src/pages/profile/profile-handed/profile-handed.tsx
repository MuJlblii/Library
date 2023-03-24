import { ProfileDeliveryType } from '../../../app/reducer-user';
import { ProfileBlueCard } from '../profile-blue-card';
import { ProfileBookcard } from '../profile-bookcard';

import parentStyle from '../profile.module.css';
import style from './profile-handed.module.css';

export type ProfileHandedType = {
    delivery: ProfileDeliveryType 
}


export const ProfileHanded = ({delivery}: ProfileHandedType) => {
    console.log('handed');

    return (
        <div className={parentStyle.profile__delivery}>
            <p className={parentStyle.profile__section_title}>Книга которую взяли</p>
            <p className={parentStyle.profile__section_comment}>Здесь можете просмотреть информацию о книге и узнать сроки возврата</p>
            <div className={parentStyle.profile__delivery_form_wrapper}>
                {delivery?.book && <ProfileBookcard view='List' bookingId={delivery.id} {...delivery.book}/>}
                {!delivery?.book && <ProfileBlueCard text='Прочитав книгу, она отобразится в истории'/>}
            </div>
        </div>
    )
}