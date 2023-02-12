import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../../app/hook';
import { Sidebar } from '../../components/sidebar';

import style from './layout-main-page.module.css';

export const LayoutMainPage = () => {
  const isDesktopView = useAppSelector((state) => state.main.isDesktopView);

  return (
    <div className={style.layout__wrapper}>
      {isDesktopView && <Sidebar />}
      <Outlet />
    </div>
  );
};
