import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import { useGetAllBooksQuery, useGetCategoriesQuery, useGetProfileUserQuery } from '../../app/api';
import { useAppDispatch, useCheckDesktopView, useIsLoading } from '../../app/hook';
import { setCategories, setDataFetch, setDesktopView, setMobileView, setToasterMsg } from '../../app/reducer';
import { setUserProfile } from '../../app/reducer-user';
import { selectIsLoading } from '../../app/selector-main';
import { createBooksState } from '../../app/utils';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Loader } from '../../components/loader';
import { Toaster } from '../../components/toaster';
import { ToasterMsg } from '../../constants/toaster-message';

import style from './layout.module.css';

export const Layout = () => {
    const isLoadingFetching = useSelector(selectIsLoading);
    const params = useParams();
    const skipFetchBooks = params?.bookId ? true : false;
  
    const checkDesktopView = useCheckDesktopView('(min-width: 950px)');
    const checkMobileView = useCheckDesktopView('(max-width: 679px)');
    const dispatch = useAppDispatch();

    const { data: dataUserProfile, isLoading: isLoadingUserProfile, isFetching: isFetchingUserProfile } = useGetProfileUserQuery(undefined);
    const { data: dataCategories, isLoading: isLoadingCategories, isError: isErrorCategories, isFetching: isFetchingCategories } = useGetCategoriesQuery(undefined);
    const { data: dataBooks, isLoading: isLoadingAllBooks, isError: isErrorAllBooks, isFetching: isFetchingAllBooks } = useGetAllBooksQuery(undefined, {skip: skipFetchBooks});

    useIsLoading(isLoadingUserProfile);
    useIsLoading(isLoadingCategories);
    useIsLoading(isLoadingAllBooks);
    useIsLoading(isFetchingUserProfile);
    useIsLoading(isFetchingCategories);
    useIsLoading(isFetchingAllBooks);

    useEffect(() => {
        if (isErrorAllBooks || isErrorCategories) {
            dispatch(setToasterMsg(ToasterMsg.books.error));
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
        dispatch(setDesktopView(checkDesktopView))
    },[checkDesktopView, dispatch]);

    useEffect(() => {
        dispatch(setMobileView(checkMobileView))
    },[checkMobileView, dispatch]);

    return (
        <div className={style.layout__wrapper} data-test-id='main-page'>
            {isLoadingFetching && <Loader />}
            <Toaster />
            <Header />
            <Outlet />
            <Footer />
        </div>
        )
    };
