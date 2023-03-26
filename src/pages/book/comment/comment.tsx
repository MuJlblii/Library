import dayjs from 'dayjs';

import logo from '../../../assets/img/Ellipse 10.png';
import { ReactComponent as Icon } from '../../../assets/img/Star.svg';
import { PATHS } from '../../../constants/path-routing';
import { CommentsType } from '../../../types/types';

import style from './comment.module.css';

export const Comment = ({createdAt, rating, text, user} : CommentsType) => {
    const ratingStars = (rate: number | null) => {
        const result = [];
        const size = {
            width: '20',
            height: '19',
        };

        for (let i=1; i<6; i++) {
            if (rate !== null && i <= rate ) {
                result.push(
                    <button className={style.grade_btn} type='submit' data-test-id='star' key={`raiting-star-${Math.random() * i}_${new Date().getTime()}`}>
                        <Icon fill="#FFBC1F" key={i} {...size} data-test-id='star-active'/>
                    </button>
                );
            } else {
                result.push(
                    <button className={style.grade_btn} type='submit' data-test-id='star' key={`raiting-star-${Math.random() * i}_${new Date().getTime()}`}>
                        <Icon key={i} {...size} />
                    </button>
                );
            }
        }

        return result;
    }

    return (
        <div className={style.feedback__detailed} data-test-id='comment-wrapper'>
            <div className={style.feedback__detailed_header}>
                <img className={style.avatar_img} src={user.avatarUrl ? `${PATHS.baseUrl}${user.avatarUrl}` : logo} alt='Logo' />
                <div className={style.feedback__detailed_text_wrapper}>
                    <p className={style.feedback__detailed_text} data-test-id='comment-author'>{user.firstName} {user.lastName}</p>
                    <p className={style.feedback__detailed_text} data-test-id='comment-date'>{dayjs(createdAt).format('DD MMMM YYYY')}</p>
                </div>
            </div>
            <div className={style.feedback__grade} data-test-id='rating'>
                {ratingStars(rating)}
            </div>
            <p className={style.feedback__detailed_text} data-test-id='comment-text'>
                {text}
            </p>
        </div>
    )
}