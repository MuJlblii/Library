import { Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { useAppSelector } from '../../../app/hook';
import { ReactComponent as SearchIcon } from '../../../assets/img/Icon_Action.svg';
import { ReactComponent as CloseIcon } from '../../../assets/img/Icon_close.svg';
import { useSearchValue } from '../../../layouts/layout-main-page/layout-main-page';

import style from './search-btn.module.css';

type PropsType = {
    isMobileSearch: boolean,
    setMobileSearch: (props: boolean) => void
}

export const SearchBtn = ({isMobileSearch, setMobileSearch} : PropsType) => {
    const {searchValue, setSearchValue} = useSearchValue();
    const [activeSearch, setActiveSearch] = useState(false);
    const isMobileView = useAppSelector((state) => state.main.isMobileView);
    const refInputSearch = useRef<HTMLInputElement>(null);
    const classes = classNames.bind(style);

    useEffect(() => {
        if (isMobileSearch) {
            refInputSearch.current?.focus();
        }
    }, [isMobileSearch]);
    useEffect(() => {
        if (!isMobileView) {
            setMobileSearch(false);
        }
    }, [isMobileView, setMobileSearch])

    return (
        <Fragment>
            <button
                type='button'
                onClick={() => setMobileSearch(true)}
                className={classes({
                    'bookbar__btn': isMobileView && !isMobileSearch,
                    'bookbar__btn_search_mob': isMobileView && !isMobileSearch,
                    'hidden': !isMobileView || isMobileSearch,
                })}
                data-test-id='button-search-open'
            >
                <SearchIcon fill='#A7A7A7'/>
            </button>
            <label className={`${style.bookbar__search}`}>
                <SearchIcon
                    className={classes('bookbar__search_search_icon', {'hidden': isMobileView})}
                    fill={activeSearch ? '#F83600' : '#A7A7A7'}
                />
                <input
                    ref={refInputSearch}
                    type="text"
                    id='search'
                    placeholder="Поиск книги или автора…"
                    data-test-id='input-search'
                    value={searchValue}
                    onFocus={() => setActiveSearch(true)}
                    onBlur={() => setActiveSearch(false)}
                    onChange={(event) => setSearchValue(event.target.value)}
                    className={classes(
                        'bookbar__btn_search',
                        'bookbar__btn',
                        {
                            'bookbar__btn_search_active': isMobileSearch,
                            'hidden': isMobileView && !isMobileSearch
                        }
                    )}
                />
                <button
                    type='button'
                    className={classes({
                        'bookbar__search_close_icon': (isMobileSearch && isMobileView),
                        'hidden': !isMobileSearch
                    })}
                    onClick={() => setMobileSearch(false)}
                    data-test-id='button-search-close'
                >
                    <CloseIcon />
                </button>
            </label>
        </Fragment>
    )
};