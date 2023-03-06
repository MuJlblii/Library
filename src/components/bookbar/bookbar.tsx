import { Fragment, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setBookShelfView } from '../../app/reducer';
import { ReactComponent as ListIcon } from '../../assets/img/Icon_list.svg';
import { ReactComponent as TableIcon } from '../../assets/img/Icon_plate.svg';
import { ReactComponent as SortingIcon } from '../../assets/img/Icon_sort.svg';

import { SearchBtn } from './search-btn';

import style from './bookbar.module.css';


export const Bookbar = () => {
    const {sorting, bookShelfView } = useAppSelector((state) => state.main)
    const dispatch = useAppDispatch();
    const [isMobileSearch, setMobileSearch] = useState(false);
    
    return (
        <div className={style.bookbar__wrapper}>
            <SearchBtn isMobileSearch={isMobileSearch} setMobileSearch={setMobileSearch}/>
            {!isMobileSearch &&
            <Fragment>
                <input
                    type="checkbox"
                    id='sort'
                    value="По рейтингу"
                    checked={sorting}
                    className={`${style.bookbar__btn_sort}`}
                    onChange={() => dispatch({type: 'main/sorting', payload: !sorting})}
                />
                <label htmlFor="sort" className={`${style.bookbar__btn_sort} ${style.bookbar__btn}` } data-test-id='sort-rating-button' >
                    <SortingIcon fill='#A7A7A7' className={`${style.bookbar__btn_sort_svg} ${sorting ? style.bookbar__btn_sort_svg_active: ''}`} />
                    <span className={style.bookbar__btn_sort_text}>
                        По рейтингу
                    </span>
                </label>
                <div className={style.bookbar__radio_group}>
                    <input 
                        type="radio"
                        name="tableView"
                        id='tableView'
                        checked={bookShelfView === 'Table' && true}
                        className={style.bookbar__btn_radio}
                        onChange={() => dispatch(setBookShelfView('Table'))}
                    />
                    <label
                        htmlFor="tableView"
                        className={`${style.bookbar__btn_radio_label} ${style.bookbar__btn_radio}`}
                        data-test-id='button-menu-view-window'
                    >
                        <TableIcon className={style.bookbar__btn_radio_svg} fill={bookShelfView === 'Table' ? '#FFFFFF' : '#A7A7A7'} />
                    </label>
                    <input
                        type="radio"
                        name="listView"
                        id='ListView'
                        checked={bookShelfView === 'List' && true}
                        className={style.bookbar__btn_radio}
                        onChange={() => dispatch(setBookShelfView('List'))}
                    />
                    <label
                        htmlFor="ListView"
                        className={style.bookbar__btn_radio}
                        data-test-id='button-menu-view-list'
                    >
                        <ListIcon className={style.bookbar__btn_radio_svg} fill={bookShelfView === 'List' ? 'white' : '#A7A7A7'} />
                    </label>
               </div>
            </Fragment>
            }
        </div>
    )
};