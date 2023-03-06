import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useCheckDesktopView } from '../../app/hook';
import { setDesktopView, setMobileView } from '../../app/reducer';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';

import style from './layout.module.css';

export const Layout = () => {
    const checkDesktopView = useCheckDesktopView('(min-width: 950px)');
    const checkMobileView = useCheckDesktopView('(max-width: 679px)');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setDesktopView(checkDesktopView))
    },[checkDesktopView, dispatch]);

    useEffect(() => {
        dispatch(setMobileView(checkMobileView))
    },[checkMobileView, dispatch]);

    return (
        <div className={style.layout__wrapper}>
            <Header />
            <Outlet />
            <Footer />
        </div>
        )
    };
