import {Fragment} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IstateRedux } from '../../app/reducer';
import { IBook } from '../../interface/interface';
import { useSearchValue } from '../../layouts/layout-main-page/layout-main-page';

import { Bookcard } from './bookcard';

import style from './bookshelf.module.css';
import lstyle from './bookshelf-list.module.css';


export const Bookshelf = () => {
    const { searchValue } = useSearchValue();
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
    const dataState = data.find(el => el.path === category)?.list?.slice();
    const sortedData = dataState?.sort((book1, book2) => sortFunc(book1, book2));
    const filteredData = sortedData?.filter(el => el.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <Fragment>
            {dataState?.length && filteredData &&
                <div className={bookShelfView === 'Table' ? style.bookshelf__wrapper : lstyle.bookshelf__wrapper}>
                    {filteredData?.map((book) => <Bookcard {...book} key={book.id} category={category}/>)}
                </div>
            }
            {!filteredData?.length && searchValue.length > 0 &&
                <div className={style.no_books} data-test-id='search-result-not-found'>По запросу ничего не найдено</div>
            }
            {!dataState?.length && searchValue.length === 0 &&
                <div className={style.no_books} data-test-id='empty-category'>В этой категории книг ещё нет</div>
            }
        </Fragment>

        

)};
