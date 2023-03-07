import { Outlet } from 'react-router-dom';

import style from './layout-auth.module.css';

export const LayoutAuth = () => (
    <section className={style.container} data-test-id='auth'>
        <h3 className={style.header}>Cleverland</h3>
        <div className={style.wrapper}>
            <Outlet />
        </div>
    </section>
)