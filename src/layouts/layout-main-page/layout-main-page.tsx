import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import { useAppSelector } from '../../app/hook';
import { Sidebar } from '../../components/sidebar';

import style from './layout-main-page.module.css';

type ContextType = {searchValue: string, setSearchValue: (arg: string) => void}

export const LayoutMainPage = () => {
  const { isDesktopView } = useAppSelector((state) => state.main);
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className={style.layout__wrapper}>
      {isDesktopView && <Sidebar />}
      <Outlet context={{searchValue, setSearchValue}}/>
    </div>
  );
};

export function useSearchValue() {
  return useOutletContext<ContextType>();
}