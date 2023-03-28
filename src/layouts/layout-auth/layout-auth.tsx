import { Outlet } from 'react-router-dom';

import { useIsLoadingTotal } from '../../app/hook';
import { Loader } from '../../components/loader';

import style from './layout-auth.module.css';

export const LayoutAuth = () => {
    useIsLoadingTotal();

    return (
        <section className={style.container} data-test-id='auth'>
            <h3 className={style.header}>Cleverland</h3>
            <div className={style.wrapper}>
                <Loader />
                <Outlet />
            </div>
        </section>
    )
}