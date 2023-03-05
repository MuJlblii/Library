import { Outlet } from 'react-router-dom';

import style from './layout-auth.module.css';

export const LayoutAuth = () => (
    <section className={style.container}>
        <div className={style.wrapper}>
            <Outlet />
        </div>
    </section>
)