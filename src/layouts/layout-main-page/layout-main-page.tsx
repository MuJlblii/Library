import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useOutletContext } from 'react-router-dom';

import { useGetAllBooksQuery, useGetCategoriesQuery } from '../../app/api';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { IstateRedux, setDataFetch, setToasterMsg } from '../../app/reducer';
import { createBooksState } from '../../app/utils';
import { ErrorToaster } from '../../components/error-toaster';
import { Loader } from '../../components/loader';
import { Sidebar } from '../../components/sidebar';
import { Toaster } from '../../components/toaster';
import { IToaster } from '../../interface/interface';

import style from './layout-main-page.module.css';

type ContextType = {searchValue: string, setSearchValue: (arg: string) => void}

export const LayoutMainPage = () => {
  const delayHideToaster = 4;
  const { isDesktopView, toasterMsg } = useAppSelector((state) => state.main);
  const errorObj: IToaster | null = useSelector((state: IstateRedux) => state.main.toasterMsg);
  const [ isShowingToaster, setIsShowingToaster ] = useState(false);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>('');

  const { data: dataCategories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetCategoriesQuery(undefined);
  const { data: dataBooks, isLoading: isLoadingAllBooks, isError: isErrorAllBooks } = useGetAllBooksQuery(undefined);
 
  useEffect(() => {
    if (toasterMsg) {
      setIsShowingToaster(true);
      setTimeout(() => {setIsShowingToaster(false); dispatch(setToasterMsg(null))}, delayHideToaster*1000)
    }
  }, [toasterMsg, dispatch]);

  useEffect(() => {
    if (dataCategories && dataBooks) {
      const dataFetch = createBooksState(dataCategories, dataBooks);

      dispatch(setDataFetch(dataFetch))
    }
  }, [dataBooks, dataCategories, dispatch])

  return (
    <div className={style.layout__wrapper}>
      {(isErrorCategories || isErrorAllBooks) && <ErrorToaster />}
      {(isLoadingCategories || isLoadingAllBooks) && <Loader />}
      {isShowingToaster && errorObj && <Toaster message={errorObj?.message} type={errorObj?.type}/>}
      {isDesktopView && <Sidebar />}
      <Outlet context={{searchValue, setSearchValue}}/>
    </div>
  );
};

export function useSearchValue() {
  return useOutletContext<ContextType>();
}