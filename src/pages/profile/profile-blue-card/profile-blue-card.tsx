import style from './profile-blue-card.module.css';

export type ProfileBlueCardType = {
    text: string;
}
export const ProfileBlueCard = ({ text } : ProfileBlueCardType) => (
    <div className={style.wrapper} data-test-id='empty-blue-card'>
        <p className={style.text}>
            {text}
        </p>
    </div>
)