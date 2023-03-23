import { useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setJWTtoken, setUser, UserStateType } from '../../app/reducer-user';
import avatar from '../../assets/img/default_avatar.svg';
import logo from '../../assets/img/logo.png';
import { PATHS } from '../../constants/path-routing';
import { setJWTtokenToLocalStorage } from '../../utils/jwt-token';
import { setUserToLocalStorage } from '../../utils/user-local-storage';
import { Sidebar } from '../sidebar';

import style  from './header.module.css';
import styleMenu from './menu.module.css';

export const Header = () => {
    const desktopView = useAppSelector((state) => state.main.isDesktopView);
    const userProfile = useSelector((state: UserStateType) => state.user.userProfile);
    const btnBurgerRef = useRef<HTMLDivElement>(null);
    const classes = classNames.bind(style);
    const dispatch = useAppDispatch();

    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickExitBtn = () => {
        dispatch(setJWTtoken(null));
        dispatch(setUser(null));
        setJWTtokenToLocalStorage('remove');
        setUserToLocalStorage('remove');
    }

    const handleBurgerClick = () => {
        setShowMenu(!showMenu);
    }

    useLayoutEffect(() => {
        const closeMenu = (e: Event): void => {
            if (e.target === btnBurgerRef.current || btnBurgerRef.current?.contains(e.target as Node)) {
                setShowMenu(!showMenu);
            }
            if (!menuRef.current?.contains(e.target as Node) && showMenu) {
                setShowMenu(!showMenu);
            }
        }

        document.body.addEventListener('click', closeMenu);

        return () => document.body.removeEventListener('click', closeMenu);
    },[showMenu])

    return (
    <header className={style.wrapper}>
        <div className={style.header}>
            <NavLink to='/books/all' className={style.header__logo}>
                <img src={logo} alt="Logo" />
            </NavLink>
                <div 
                    ref={btnBurgerRef}
                    className={style.menu__btn}
                    role='presentation'
                    data-test-id='button-burger'
                >
                        <span className={classes({menu__btn_rotate: showMenu, menu__btn_span: true})} />
                        {!showMenu && <span className={classes('menu__btn_span')}/>}
                        <span className={classes({menu__btn_rotate_rev: showMenu, menu__btn_span: true})}/>
                </div>
                { !desktopView &&
                <div
                    className={`${styleMenu.menu__wrapper} ${(showMenu) ? styleMenu.active : ''}`}
                    ref={menuRef}
                    data-test-id='burger-navigation'
                >
                    <Sidebar style={styleMenu} handleClose={handleBurgerClick}/>
                </div>

            }
            <h3 className={style.header__title}>Библиотека</h3>
            <div
                className={style.header__user}
                onMouseEnter={(e) => {e.preventDefault(); e.stopPropagation(); setShowProfile(true)}}
                onMouseLeave={(e) => {e.preventDefault(); e.stopPropagation(); setShowProfile(false)}}
            >
                <p className={style.header__user_name}>Привет, {userProfile?.firstName} {userProfile?.lastName}!</p>
                {userProfile?.avatar
                    ? <img className={style.header__avatar} src={`https://strapi.cleverland.by${userProfile.avatar}`} alt="Avatar" />
                    : <img className={style.header__avatar} src={avatar} alt="Avatar" />}
                <div className={classes({'header__profile': showProfile, 'header__profile_hidden': !showProfile})}>
                    <NavLink to={PATHS.profile} data-test-id='profile-button'>Профиль</NavLink>
                    <button
                        type='button'
                        onClick={handleClickExitBtn}
                        className={style.header__profile_btn_exit}
                        data-test-id='exit-button'
                    >Выход</button>
                </div>
            </div>
        </div>
    </header>
);
}



