import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IstateRedux } from '../../app/reducer';
import { IBook } from '../../interface/interface';

import { Bookcard } from './bookcard';

import style from './bookshelf.module.css';
import lstyle from './bookshelf-list.module.css';


export const Bookshelf = () => {
    const {data, sorting, bookShelfView } = useSelector((stateRedux: IstateRedux) => stateRedux.main);
    const { category } = useParams();
    const direction = sorting ? -1 : 1;

    const sortFunc = ({rating: rating1}: IBook, {rating: rating2}: IBook) => {
        switch (true) {
            case (rating1 === null && rating2 === null):
                return 0;
            case (rating1 === null && rating2 !== null):
                return 1 * direction;
            case (rating1 !== null && rating2 === null):
                return -1 * direction;
            case (rating1 === rating2):
                return 0;
            case (rating1 !== null && rating2 !== null && rating1 > rating2):
                return -1 * direction
            case (rating1 !== null && rating2 !== null && rating1 < rating2):
                return 1 * direction
            default:
                return 0
        }
    }

    return (
        <div className={bookShelfView === 'Table' ? style.bookshelf__wrapper : lstyle.bookshelf__wrapper}>
            {data !== null && data.find(el => el.path === category)?.list?.slice().sort((book1, book2) => sortFunc(book1, book2)).map((book) => <Bookcard {...book} key={book.id} category={category}/>)}
        </div>

)};
