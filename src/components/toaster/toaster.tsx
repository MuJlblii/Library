import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { useAppDispatch } from '../../app/hook';
import { setToasterMsg } from '../../app/reducer';
import { selectToaster } from '../../app/selector-main';
import { ReactComponent as CloseIcon } from '../../assets/img/Icon_close_toaster.svg';
import {ReactComponent as IconError} from '../../assets/img/Icon_error.svg';
import {ReactComponent as IconSuccess} from '../../assets/img/Icon_success.svg';

import style from './toaster.module.css';

export const Toaster = () => {
    const [isShowingToaster, setIsShowingToaster] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const delayHideToaster = 4;
    const toasterMsg = useSelector(selectToaster);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (toasterMsg) {
          setIsShowingToaster(true);
          setTimeout(() => {setIsShowingToaster(false); dispatch(setToasterMsg(null))}, delayHideToaster*1000)
        }
      }, [toasterMsg, dispatch, setIsShowingToaster]);

    useLayoutEffect(() => {
        const closePopUp = (e: Event): void => {
            if (!calendarRef.current?.contains(e.target as Node) && toasterMsg !== null) {
                dispatch(setToasterMsg(null))
            }
        }

        document.body.addEventListener('click', closePopUp);

        return () => document.body.removeEventListener('click', closePopUp);
    },[dispatch, toasterMsg])

    return (
        <Fragment>
            {toasterMsg &&
                <div className={style.wrapper} >
                    <div
                        className={classNames(style.content, {
                            [style.content_error]: toasterMsg.type === 'error',
                            [style.content_success]: toasterMsg.type === 'success',
                        })}
                        data-test-id='error'
                    >
                        <div className={style.message}>
                            { toasterMsg.type==='error' ? <IconError /> : <IconSuccess />}
                            <p>{toasterMsg.message}</p>
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
            }
            {!isShowingToaster && null}
        </Fragment>
    )
}
