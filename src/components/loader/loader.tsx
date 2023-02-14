import { ReactComponent as LoaderImg } from '../../assets/img/Loader.svg';

import style from './loader.module.css';

export const Loader = () => (
    <div className={style.wrapper} data-test-id='loader' >
        <div className={style.content}>
            <LoaderImg className={style.loader} />
        </div>
    </div>
);