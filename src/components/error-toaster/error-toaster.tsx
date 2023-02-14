import { ReactComponent as CloseIcon } from '../../assets/img/Icon_close_toaster.svg';
import {ReactComponent as IconError} from '../../assets/img/Icon_error.svg';

import style from './error-toaster.module.css';

export const ErrorToaster = () => (
    <div className={style.wrapper} data-test-id='error'>
        <div className={style.content}>
            <div className={style.message}>
                <IconError />
                <p>Что-то пошло не так. Обновите страницу через некоторое время.</p>
            </div>
            <button
                type='button'
                className={style.close_icon}
            >
                <CloseIcon />
            </button>
        </div>
    </div>
);