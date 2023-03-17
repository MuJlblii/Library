import classNames from 'classnames';

import { ReactComponent as CloseIcon } from '../../assets/img/Icon_close_toaster.svg';
import {ReactComponent as IconError} from '../../assets/img/Icon_error.svg';
import {ReactComponent as IconSuccess} from '../../assets/img/Icon_success.svg';

import style from './toaster.module.css';

export type ToasterPropsType = {
    message: string,
    type: string,
}

export const Toaster = ({message, type} : ToasterPropsType) => (
    <div className={style.wrapper} >
        <div
            className={classNames(style.content, {
                [style.content_error]: type === 'error',
                [style.content_success]: type === 'success',
            })}
            data-test-id='error'
        >
            <div className={style.message}>
                { type==='error' ? <IconError /> : <IconSuccess />}
                <p>{message}</p>
            </div>
            <button
                type='button'
                className={style.close_icon}
                data-test-id='alert-close'
            >
                <CloseIcon />
            </button>
        </div>
    </div>
)
