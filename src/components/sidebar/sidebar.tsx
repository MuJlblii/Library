import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hook';
import { IstateRedux } from '../../app/reducer';
import {ReactComponent as IconSpoiler} from '../../assets/img/Icon_spoiler.svg';
import dataJSON from '../../assets/mock-data/books.json';
import booksCategoryJSON from '../../assets/mock-data/books-category.json';

import defaultStyle from './sidebar.module.css';

type BookType = {
    id: string,
    image: string,
    category: string,
    author: string,
    title: string,
    rating: number,
    year: number,
    isBooked: boolean,
    bookedTill: string
}
type BooksType = {
    [key: string]: BookType[]
}
type PropsType = {
    style?: {readonly [key: string]: string},
    handleClose?: () => void,
}

export const Sidebar = ({style = defaultStyle, handleClose}: PropsType) => {
    const isDesktopView = useAppSelector((state) => state.main.isDesktopView);
    const dataObject: BooksType = Object.create(dataJSON);
    const booksCategory = Object.keys(dataJSON);
    const booksCategoryRu = Object.values(booksCategoryJSON);
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
                    {category &&
                        <IconSpoiler onClick={handleSpoiler} className={spoiler ? style.sidebar__category_spoiler_icon : style.sidebar__category_spoiler_icon_active}/>
                    }
                </div>
                    <ul className={` ${spoiler ? style.unvisible : ''} ${style.sidebar__category_books}`}>
                        <li>
                            <NavLink
                                onClick={handleClose}
                                to='/books/all'
                                data-test-id={isDesktopView ? 'navigation-books' : 'burger-books' }
                                className={({ isActive }) => isActive ? style.sidebar__category_books_active : undefined}
                            >Все книги</NavLink>
                        </li>
                        {booksCategory.map((el: string, ind: number) => (
                            <li key={el}>
                                <NavLink
                                    onClick={handleClose}
                                    to={`/books/${el}`}
                                    className={({ isActive }) => isActive ? style.sidebar__category_books_active : undefined}
                                >{booksCategoryRu[ind]}<span className={style.sidebar__category_quantity}>{`${dataObject[el].length}`}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
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