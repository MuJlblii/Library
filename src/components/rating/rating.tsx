import { Fragment } from 'react';

import { useAppSelector } from '../../app/hook';
import { ReactComponent as Icon } from '../../assets/img/Star.svg';

type PropsType = {
  rating: number | null | undefined;
  page: string;
  style: {
    readonly [key: string]: string;
  };
  view?: string;
};

export const Rating = ({ rating, page, view, style }: PropsType) => {
  const { isMobileView } = useAppSelector((state) => state.main);
  const ratingStars = (rate: number | null | undefined) => {
    const result = [];
    let size;

    switch (true) {
      case page === 'bookcard' && view === 'List' && isMobileView:
        size = {
          width: '13',
          height: '12',
        };
        break;
      case page === 'bookpage' && isMobileView:
        size = {
          width: '28',
          height: '28',
        };
        break;
      default:
        size = {
          width: '20',
          height: '19',
        };
        break;
    }

    for (let i = 1; i < 6; i++) {
      if (rate !== null && rate !== undefined && i <= rate) {
        result.push(<Icon fill='#FFBC1F' key={i} {...size} />);
      } else {
        result.push(<Icon key={i} {...size} />);
      }
    }

    return result;
  };

  return (
    <div className={style.rating__wrapper}>
      {rating === null && page === 'bookcard' && <p className={style.rating__msg}>ещё нет оценок</p>}
      {rating === null && page === 'bookpage' && (
        <Fragment>
          <div className={style.rating__star}>{ratingStars(rating).map((el) => el)}</div>
          <p className={style.rating__num}>{rating}</p>
          <p className={style.rating__msg}>ещё нет оценок</p>
        </Fragment>
      )}
      {rating !== null && (
        <Fragment>
          <div className={style.rating__star}>{ratingStars(rating).map((el) => el)}</div>
          <p className={style.rating__num}>{rating}</p>
          {rating === (null || undefined) && page === 'bookpage' && <p className={style.rating__msg}>ещё нет оценок</p>}
        </Fragment>
      )}
    </div>
  );
};
