import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hook';
import { IstateRedux } from '../../app/reducer';
import {ReactComponent as IconSpoiler} from '../../assets/img/Icon_spoiler.svg';
import { IBooksState } from '../../interface/interface';

import defaultStyle from './sidebar.module.css';

type PropsType = {
    style?: {readonly [key: string]: string},
    handleClose?: () => void,
}

export const Sidebar = ({style = defaultStyle, handleClose}: PropsType) => {
    const isDesktopView = useAppSelector((state) => state.main.isDesktopView);
    const state = useSelector((stateRedux: IstateRedux) => stateRedux.main);
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

    useEffect(() => {
        if (category !== state.currentCategory && category !== undefined) {dispatch({type: 'main/currentCategorySet', payload: category})};
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
                            <li>
                                <NavLink
                                    onClick={handleClose}
                                    to='/books/all'
                                    data-test-id={isDesktopView ? 'navigation-books' : 'burger-books' }
                                    className={({ isActive }) => isActive ? style.sidebar__category_books_active : undefined}
                                >Все книги</NavLink>
                            </li>

                            {state.data.map((el: IBooksState) => (
                                <li key={el.id}>
                                    <NavLink
                                        onClick={handleClose}
                                        to={`/books/${el.path}`}
                                        className={({ isActive }) => isActive ? style.sidebar__category_books_active : undefined}
                                    >{el.name}<span className={style.sidebar__category_quantity}>{el.list ? el.list.length : '0'}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    }
                </li>
                <li className={style.sidebar__category}>
                    <NavLink
                        onClick={handleClickTermsContract}
                        to='/terms'
                        className={({ isActive }) => isActive ? style.sidebar__category_active : undefined}
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
                        className={({ isActive }) => isActive ? style.sidebar__category_active : undefined}
                    >
                        Договор оферты
                    </NavLink>
                </li>
            </ul>
            {!isDesktopView &&
                <ul className={style.sidebar__category_additional}>
                    <li className={style.sidebar__category}>Профиль</li>
                    <li className={style.sidebar__category}>Выход</li>
                </ul>
            }
        </Fragment>
)};