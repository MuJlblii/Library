import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useCheckDesktopView } from '../../app/hook';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';

import style from './layout.module.css';

export const Layout = () => {
    const checkDesktopView = useCheckDesktopView('(min-width: 950px)');
    const checkMobileView = useCheckDesktopView('(max-width: 679px)');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({type: 'main/setDesktopView', payload: checkDesktopView})
    },[checkDesktopView, dispatch]);

    useEffect(() => {
        dispatch({type: 'main/setMobileView', payload: checkMobileView})
    },[checkMobileView, dispatch]);

    return (
        <div className={style.layout__wrapper}>
            <Header />
            <Outlet />
            <Footer />
        </div>
        )
    };
