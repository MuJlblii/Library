import { Bookbar } from '../../components/bookbar';
import { Bookshelf } from '../../components/bookshelf';

import style from './main-page.module.css';

export const MainPage = () => (
    <section className={style.main__wrapper}>
        <Bookbar />
        <Bookshelf />
    </section>
);
