import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectIsMobileView } from '../../../app/selector-main';
import { ReactComponent as Icon } from '../../../assets/img/Star.svg';

import style from './comment-rating-stars.module.css';

export type CommentRatingStarsPropsType = {
    rate: number | null,
    setRating: (arg: number) => void;
}

export const CommentRatingStars = ({rate, setRating} : CommentRatingStarsPropsType) => {
    const isMobileView = useSelector(selectIsMobileView);
    const result = [];
    const size = {
        width: isMobileView ? '26' :'35',
        height: isMobileView ? '25': '32.5',
    };
    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement | SVGSVGElement, MouseEvent>, ind: number) => {
        e.preventDefault();
        e.stopPropagation();
        setRating(ind);
    }

    for (let i=1; i<6; i++) {
        if (rate !== null && i <= rate ) {
            result.push(
                <button
                    className={style.grade_btn}
                    type='submit'
                    onClick={(e) => onClickHandler(e, i)}
                    data-test-id='star'
                    key={`comment-star-${Math.random() * i}_${new Date().getTime()}`}
                >
                    <Icon fill="#FFBC1F" key={i} {...size} data-test-id='star-active'/>
                </button>
            );
        } else {
            result.push(
                <button
                    className={style.grade_btn}
                    type='submit'
                    onClick={(e) => onClickHandler(e, i)}
                    data-test-id='star'
                    key={`comment-star-${Math.random() * i}_${new Date().getTime()}`}
                >
                    <Icon key={i} {...size} onClick={(e) => onClickHandler(e, i)} />
                </button>
            );
        }
    }

    return (
        <Fragment>
            {result.map((el) => el)}
        </Fragment>
    ) 
}