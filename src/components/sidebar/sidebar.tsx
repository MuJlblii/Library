import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useAppDispatch } from '../../app/hook';
import { currentCategorySet } from '../../app/reducer';
import { setJWTtoken, setUser } from '../../app/reducer-user';
import { selectIsDesktopView, selectMain } from '../../app/selector-main';
import {ReactComponent as IconSpoiler} from '../../assets/img/Icon_spoiler.svg';
import { PATHS } from '../../constants/path-routing';
import { BooksStateType } from '../../types/types';
import { setJWTtokenToLocalStorage } from '../../utils/jwt-token';
import { setUserToLocalStorage } from '../../utils/user-local-storage';

import defaultStyle from './sidebar.module.css';

type PropsType = {
    style?: {readonly [key: string]: string},
    handleClose?: () => void,
}

export const Sidebar = ({style = defaultStyle, handleClose}: PropsType) => {
    const classes = classNames.bind(style);
    const isDesktopView = useSelector(selectIsDesktopView);
    const state = useSelector(selectMain);
    const {category} = useParams();
    const dispatch = useAppDispatch();
    const [spoiler, setSpoiler] = useState(category === '' ? false : true);
    const handleSpoiler = () => {
        setSpoiler(!spoiler);
    }
    const handleClickTermsContract = () => {
        if (handleClose) {
            handleClose();
        }
        setSpoiler(true);
    }
    const handleClickExitBtn = () => {
        dispatch(setJWTtoken(null));
        dispatch(setUser(null));
        setJWTtokenToLocalStorage('remove');
        setUserToLocalStorage('remove');
    }

    useEffect(() => {
        if (category !== state.currentCategory && category !== undefined) {dispatch(currentCategorySet(category))};
    },[category, dispatch, state]);

    useEffect(() => 
        category === undefined ? setSpoiler(true) : setSpoiler(false)
    , [category, setSpoiler]);

    return (
        <Fragment>
            <ul className={style.sidebar__wrapper} >
                <li className={style.sidebar__category}>
                    <div className={style.sidebar__category_head}>
                        <div
                            role='presentation'
                            onClick={handleSpoiler}
                            data-test-id={isDesktopView ? 'navigation-showcase' : 'burger-showcase'}
                            className={category ? style.sidebar__category_active : ''}
                        >Витрина книг</div>
                        {category && state.data.length > 0 &&
                            <IconSpoiler onClick={handleSpoiler} className={spoiler ? style.sidebar__category_spoiler_icon : style.sidebar__category_spoiler_icon_active}/>
                        }
                    </div>
                    {state.data.length > 0 && 
                        <ul className={` ${spoiler ? style.unvisible : ''} ${style.sidebar__category_books}`}>
                            {state.data.map((el: BooksStateType) => (
                                <li key={el.id}>
                                    <NavLink
                                        onClick={handleClose}
                                        to={`/books/${el.path}`}
                                        className={({ isActive }) => isActive ? style.sidebar__category_books_active : ''}
                                        data-test-id={isDesktopView ? `navigation-${el.path === 'all' ? 'books' : el.path}` : `burger-${el.path === 'all' ? 'books' : el.path}`}
                                    >
                                        {el.name}
                                    </NavLink>
                                    {el.path !== 'all' &&
                                        <span
                                            className={style.sidebar__category_quantity}
                                            data-test-id={
                                                isDesktopView
                                                ? `navigation-book-count-for-${el.path === 'all' ? 'books' : el.path}`
                                                : `burger-book-count-for-${el.path === 'all' ? 'books' : el.path}`
                                            }
                                        >
                                            {el.list ? el.list.length : '0'}
                                        </span>
                                    }
                                </li>
                            ))}
                        </ul>
                    }
                </li>
                <li className={style.sidebar__category}>
                    <NavLink
                        onClick={handleClickTermsContract}
                        to='/terms'
                        className={({ isActive }) => isActive ? style.sidebar__category_active : ''}
                        data-test-id={isDesktopView ? 'navigation-terms' : 'burger-terms' }
                    >
                        Правила пользования
                    </NavLink>
                </li>
                <li className={style.sidebar__category}>
                    <NavLink
                        onClick={handleClickTermsContract}
                        to='/contract' 
                        data-test-id={isDesktopView ? 'navigation-contract' : 'burger-contract'}
                        className={({ isActive }) => isActive ? style.sidebar__category_active : ''}
                    >
                        Договор оферты
                    </NavLink>
                </li>
            </ul>
            {!isDesktopView &&
                <ul className={style.sidebar__category_additional}>
                    <NavLink to={PATHS.profile} className={style.sidebar__category}>Профиль</NavLink>
                    <button
                        type='button'
                        onClick={handleClickExitBtn}
                        className={classes('sidebar__category', 'sidebar__category_btn_exit')}
                        data-test-id='exit-button'
                    >Выход</button>
                </ul>
            }
        </Fragment>
)};