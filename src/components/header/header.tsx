import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useAppSelector } from '../../app/hook';
import avatar from '../../assets/img/avatar.png';
import logo from '../../assets/img/logo.png';
import { Sidebar } from '../sidebar';

import style  from './header.module.css';
import styleMenu from './menu.module.css';

export const Header = () => {
    const desktopView = useAppSelector((state) => state.main.isDesktopView);
    const btnBurgerRef = useRef<HTMLDivElement>(null);
    const classes = classNames.bind(style);

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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
            <div className={style.header__user}>
                <p className={style.header__user_name}>Привет, Иван!</p>
                <img src={avatar} alt="Avatar" />
            </div>
        </div>
    </header>
);
}



