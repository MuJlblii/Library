import classNames from 'classnames';

import style from './profile-blue-card.module.css';

export type ProfileBlueCardType = {
    text: string;
    type?: string,
    comment?: string
}
export const ProfileBlueCard = ({ type = 'blue', text, comment } : ProfileBlueCardType) => (
    <div 
        className={classNames(
            style.wrapper,
            {
                [style.wrapper_blue_card]: type === 'blue',
                [style.wrapper_red_card]: type === 'red',
            }
        )}
        data-test-id={type === 'blue' ? 'empty-blue-card' : 'expired'}
    >
        <p className={style.text}>{text}</p>
        {comment && 
            <p className={style.comment}>{comment}</p>
        }
    </div>
)