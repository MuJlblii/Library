import { Fragment, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import { useAppSelector } from '../../../app/hook';
import { ReactComponent as SearchIcon } from '../../../assets/img/Icon_Action.svg';
import { ReactComponent as CloseIcon } from '../../../assets/img/Icon_close.svg';

import style from './search-btn.module.css';

type PropsType = {
    isMobileSearch: boolean,
    setMobileSearch: (props: boolean) => void
}

export const SearchBtn = ({isMobileSearch, setMobileSearch} : PropsType) => {
    const isMobileView = useAppSelector((state) => state.main.isMobileView);
    const refInputSearch = useRef<HTMLInputElement>(null);
    const classes = classNames.bind(style);

    useEffect(() => {
        if (isMobileSearch) {
            refInputSearch.current?.focus();
        }
    })

    return (
        <Fragment>
            {!isMobileSearch && isMobileView &&
                <button
                    type='button'
                    onClick={() => setMobileSearch(true)}
                    className={`${style.bookbar__btn} ${style.bookbar__btn_search_mob}`}
                    data-test-id='button-search-open'
                >
                    <SearchIcon />
                </button>
            }
       
            <input
                type="text"
                id='search'
                placeholder="Поиск книги или автора..."
                data-test-id='input-search'
                className={classes(
                    'bookbar__btn_search',
                    'bookbar__btn',
                    {
                        'bookbar__btn_search_active': isMobileSearch,
                        'hidden': isMobileView
                    }
                )}
            />

            {isMobileSearch && isMobileView &&
                <label className={`${style.bookbar__search}`}>
                    <input
                        ref={refInputSearch}
                        type="text"
                        id='search'
                        placeholder="Поиск книги или автора..."
                        data-test-id='input-search'
                        className={`${style.bookbar__btn_search} ${style.bookbar__btn} ${isMobileSearch ? style.bookbar__btn_search_active : ''}`}
                    />
                    <button
                        type='button'
                        className={style.bookbar__search_close_icon}
                        onClick={() => setMobileSearch(false)}
                        data-test-id='button-search-close'
                    >
                        <CloseIcon />
                    </button>
                </label>
                } 
        </Fragment>
    )
};