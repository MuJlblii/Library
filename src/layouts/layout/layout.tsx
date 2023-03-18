import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useCheckDesktopView } from '../../app/hook';
import { IstateRedux, setDesktopView, setMobileView, setToasterMsg } from '../../app/reducer';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Toaster } from '../../components/toaster';

import style from './layout.module.css';

export const Layout = () => {
    const delayHideToaster = 4;
    const toasterMsg = useSelector((state: IstateRedux) => state.main.toasterMsg);
    const [ isShowingToaster, setIsShowingToaster ] = useState(false);
  
    const checkDesktopView = useCheckDesktopView('(min-width: 950px)');
    const checkMobileView = useCheckDesktopView('(max-width: 679px)');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (toasterMsg) {
          setIsShowingToaster(true);
          setTimeout(() => {setIsShowingToaster(false); dispatch(setToasterMsg(null))}, delayHideToaster*1000)
        }
      }, [toasterMsg, dispatch]);

    useEffect(() => {
        dispatch(setDesktopView(checkDesktopView))
    },[checkDesktopView, dispatch]);

    useEffect(() => {
        dispatch(setMobileView(checkMobileView))
    },[checkMobileView, dispatch]);

    return (
        <div className={style.layout__wrapper}>
            {isShowingToaster && toasterMsg && <Toaster message={toasterMsg.message} type={toasterMsg.type}/>}
            <Header />
            <Outlet />
            <Footer />
        </div>
        )
    };
