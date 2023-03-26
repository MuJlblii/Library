import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import { useChangeProfileInfoMutation, useGetAllBooksQuery, useGetCategoriesQuery, useGetProfileUserQuery, useImageUploadMutation } from '../../app/api';
import { useAppDispatch, useCheckDesktopView } from '../../app/hook';
import { IstateRedux, setCategories, setDataFetch, setDesktopView, setMobileView, setToasterMsg } from '../../app/reducer';
import { setUserProfile } from '../../app/reducer-user';
import { createBooksState } from '../../app/utils';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Loader } from '../../components/loader';
import { Toaster } from '../../components/toaster';

import style from './layout.module.css';

export const Layout = () => {
    const delayHideToaster = 4;
    const toasterMsg = useSelector((state: IstateRedux) => state.main.toasterMsg);
    const [ isShowingToaster, setIsShowingToaster ] = useState(false);
    const params = useParams();
    const skipFetchBooks = params?.bookId ? true : false;
  
    const checkDesktopView = useCheckDesktopView('(min-width: 950px)');
    const checkMobileView = useCheckDesktopView('(max-width: 679px)');
    const dispatch = useAppDispatch();

    const { data: dataUserProfile, isLoading: isLoadingUserProfile, isError: isErrorUserProfile, isFetching: isFetchingUserProfile } = useGetProfileUserQuery(undefined);
    const [, {isLoading: isLoadingImageUpload}] = useImageUploadMutation();
    const [, {isLoading: isLoadingChangeProfile}] = useChangeProfileInfoMutation();
    const { data: dataCategories, isLoading: isLoadingCategories, isError: isErrorCategories, isFetching: isFetchingCategories } = useGetCategoriesQuery(undefined);
    const { data: dataBooks, isLoading: isLoadingAllBooks, isError: isErrorAllBooks, isFetching: isFetchingAllBooks } = useGetAllBooksQuery(undefined, {skip: skipFetchBooks});

    useEffect(() => {
        if (isErrorAllBooks || isErrorCategories) {
            dispatch(setToasterMsg({type:'error', message: 'Что-то пошло не так. Обновите страницу через некоторое время.'}))
        }
    }, [dispatch, isErrorAllBooks, isErrorCategories])

    useEffect(() => {
        if (dataCategories && dataBooks) {
            const dataFetch = createBooksState(dataCategories, dataBooks);
    
            dispatch(setDataFetch(dataFetch));
        }
        if (dataCategories) {
            dispatch(setCategories(dataCategories));
        }
    }, [dataBooks, dataCategories, dispatch])

    useEffect(() => {
        if (dataUserProfile) {
            dispatch(setUserProfile(dataUserProfile));
        }
    }, [dispatch, dataUserProfile]);
    
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
        <div className={style.layout__wrapper} data-test-id='main-page'>
            {(
                isLoadingCategories
                || isLoadingAllBooks
                || isFetchingAllBooks
                || isLoadingUserProfile
                || isFetchingUserProfile
                || isFetchingCategories
                || isLoadingImageUpload
                || isLoadingChangeProfile
                ) && <Loader />}
            {isShowingToaster && toasterMsg && <Toaster message={toasterMsg.message} type={toasterMsg.type}/>}
            <Header />
            <Outlet />
            <Footer />
        </div>
        )
    };
