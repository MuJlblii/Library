import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useGetAllBooksQuery, useGetCategoriesQuery } from '../../app/api';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { createBooksState } from '../../app/utils';
import { ErrorToaster } from '../../components/error-toaster';
import { Loader } from '../../components/loader';
import { Sidebar } from '../../components/sidebar';

import style from './layout-main-page.module.css';

export const LayoutMainPage = () => {
  const { isDesktopView, data } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

  const skip = data.length > 0 ? true : false;
  const { data: dataCategories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetCategoriesQuery(undefined, {skip});
  const { data: dataBooks, isLoading: isLoadingAllBooks, isError: isErrorAllBooks } = useGetAllBooksQuery(undefined, {skip});
 
  useEffect(() => {
    if (dataCategories && dataBooks) {
      const dataFetch = createBooksState(dataCategories, dataBooks);

      dispatch({type: 'main/setDataFetch', payload: dataFetch})
    }
  }, [dataBooks, dataCategories, dispatch])



  return (
    <div className={style.layout__wrapper}>
      {(isErrorCategories || isErrorAllBooks) && <ErrorToaster />}
      {(isLoadingCategories || isLoadingAllBooks) && <Loader />}
      {isDesktopView && <Sidebar />}
      <Outlet />
    </div>
  );
};
