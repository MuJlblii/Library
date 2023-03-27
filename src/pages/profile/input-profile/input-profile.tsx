import { useState } from 'react';
import { ChangeHandler, FieldErrors, RefCallBack } from 'react-hook-form';
import classNames from 'classnames/bind';

import {ReactComponent as IconHidden} from '../../../assets/img/Icon_hidden.svg';
import {ReactComponent as IconVisible} from '../../../assets/img/Icon_hidden_visible.svg';

import style from './input-profile.module.css';

export type InputProfilePropsType = {
    inputType: string,
    showEyesIcon: boolean,
    innerRef: RefCallBack,
    onBlur: ChangeHandler,
    onChange: ChangeHandler,
    name: string,
    errors: FieldErrors,
    placeholder: string,
    dirtyFields: {[key: string]: boolean},
    defaultHintError: string,
    defaultValue?: string
    checkOnDirtyEyesIcon: boolean,
    isDisabled?: boolean,
}

export const InputProfile = ({
        name,
        inputType,
        showEyesIcon,
        innerRef,
        onBlur,
        onChange,
        errors,
        placeholder,
        dirtyFields,
        defaultHintError,
        defaultValue='',
        checkOnDirtyEyesIcon,
        isDisabled=false,
    }: InputProfilePropsType) => {
    const classes = classNames.bind(style);
    const [isPassVisible, setIsPassVisible] = useState(false);

    return (
        <label className={style.label}>
            <input
                data-test-id={name}
                name={name}
                ref={innerRef}
                disabled={isDisabled}
                onBlur={(event) => {onBlur(event);}}
                onChange={(event) => {onChange(event); }}
                type={(inputType === 'text' || isPassVisible) ? 'text' : 'password'}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className={classes(
                    'input',
                    {'input__border_without_error': !errors[name]?.message}
                )}
            />
            <span className={style.placeholder}>{placeholder}</span>
            {showEyesIcon && (dirtyFields[name] || checkOnDirtyEyesIcon) &&
                <button
                    type='button'
                    className={style.btn_hide}
                    onClick={() => setIsPassVisible(!isPassVisible)}
                >
                    {isPassVisible ? <IconVisible data-test-id='eye-opened' /> : <IconHidden data-test-id='eye-closed'/>}
                </button>
            }
            <span
                data-test-id='hint'
                className={classes(
                    'message_error_default',
                    {'message_error_active': errors[name]},
                )}
            >
                {(errors[name]?.type === 'required' ||errors[name]?.type === 'checkLength' ) ? errors[name]?.message as string : defaultHintError}
            </span>
        </label>
    )
}