import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import { useGetAllBooksQuery, useGetCategoriesQuery, useGetProfileUserQuery } from '../../app/api';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setDataFetch } from '../../app/reducer';
import { createBooksState } from '../../app/utils';
import { ErrorToaster } from '../../components/error-toaster';
import { Loader } from '../../components/loader';
import { Sidebar } from '../../components/sidebar';

import style from './layout-main-page.module.css';

type ContextType = {searchValue: string, setSearchValue: (arg: string) => void}

export const LayoutMainPage = () => {
  const { isDesktopView } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>('');

  const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, isFetching: isFetchingUserProfile } = useGetProfileUserQuery(undefined); 
  const { data: dataCategories, isLoading: isLoadingCategories, isError: isErrorCategories, isFetching: isFetchingCategories } = useGetCategoriesQuery(undefined);
  const { data: dataBooks, isLoading: isLoadingAllBooks, isError: isErrorAllBooks, isFetching: isFetchingAllBooks } = useGetAllBooksQuery(undefined);
 
  useEffect(() => {
    if (dataCategories && dataBooks) {
      const dataFetch = createBooksState(dataCategories, dataBooks);

      dispatch(setDataFetch(dataFetch))
    }
  }, [dataBooks, dataCategories, dispatch])

  return (
    <div className={style.layout__wrapper}>
      {(isErrorCategories || isErrorAllBooks || isErrorUserProfile) && <ErrorToaster />}
      {(isLoadingCategories || isLoadingAllBooks || isFetchingAllBooks || isLoadingUserProfile || isFetchingUserProfile || isFetchingCategories) && <Loader />}
      {isDesktopView && <Sidebar />}
      <Outlet context={{searchValue, setSearchValue}}/>
    </div>
  );
};

export function useSearchValue() {
  return useOutletContext<ContextType>();
}