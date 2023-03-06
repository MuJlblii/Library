import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import { useGetAllBooksQuery, useGetCategoriesQuery } from '../../app/api';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setDataFetch } from '../../app/reducer';
import { createBooksState } from '../../app/utils';
import { ErrorToaster } from '../../components/error-toaster';
import { Loader } from '../../components/loader';
import { Sidebar } from '../../components/sidebar';

import style from './layout-main-page.module.css';

type ContextType = {searchValue: string, setSearchValue: (arg: string) => void}

export const LayoutMainPage = () => {
  const { isDesktopView, data } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>('');

  const skip = data.length > 0 ? true : false;
  const { data: dataCategories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetCategoriesQuery(undefined, {skip});
  const { data: dataBooks, isLoading: isLoadingAllBooks, isError: isErrorAllBooks } = useGetAllBooksQuery(undefined, {refetchOnMountOrArgChange: true});
 
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
      {isDesktopView && <Sidebar />}
      <Outlet context={{searchValue, setSearchValue}}/>
    </div>
  );
};

export function useSearchValue() {
  return useOutletContext<ContextType>();
}