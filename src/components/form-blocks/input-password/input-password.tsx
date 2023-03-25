import { useState } from 'react';
import { ChangeHandler, FieldErrors, RefCallBack } from 'react-hook-form';
import classNames from 'classnames/bind';

import {ReactComponent as IconHidden} from '../../../assets/img/Icon_hidden.svg';
import {ReactComponent as IconVisible} from '../../../assets/img/Icon_hidden_visible.svg';
import {ReactComponent as IconPassChecked} from '../../../assets/img/Icon_pass_check.svg';
import { HighlightedHintText } from '../input-highlighter';

import style from './input-password.module.css';

export type InputPropsType = {
    inputType: string,
    showEyesIcon: boolean,
    innerRef: RefCallBack,
    onBlur: ChangeHandler,
    onChange: ChangeHandler,
    name: string,
    errors: FieldErrors,
    placeholder: string,
    dirtyFields: {[key: string]: boolean},
    defaultHint: string,
    defaultHintError: string,
    defaultValue?: string
    showDefaultHint: boolean,
    showCheckMark: boolean,
    onChangeMode: boolean,
    checkOnDirtyEyesIcon: boolean,
    isDisabled?: boolean,
}

export const Input = ({
        name,
        inputType,
        showEyesIcon,
        innerRef,
        onBlur,
        onChange,
        errors,
        placeholder,
        dirtyFields,
        defaultHint,
        defaultHintError,
        defaultValue='',
        showDefaultHint,
        showCheckMark,
        onChangeMode,
        checkOnDirtyEyesIcon,
        isDisabled=false,
    }: InputPropsType) => {
    const classes = classNames.bind(style);
    const [isPassVisible, setIsPassVisible] = useState(false);
    const [isLostedBlurInput, setIsLostedBlurInput] = useState(true);
    const [isInFocus, setIsInFocus] = useState(false);
    const confirmValidationCheck = onChangeMode || !isInFocus;

    return (
        <label className={style.label}>
            <input
                data-test-id={name}
                name={name}
                ref={innerRef}
                disabled={isDisabled}
                onFocus={() => {setIsLostedBlurInput(false); setIsInFocus(true)}}
                onBlur={(event) => {setIsLostedBlurInput(true); setIsInFocus(false); onBlur(event);}}
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

            {confirmValidationCheck && errors[name] && errors[name]?.type !== 'checkLength' && 
                <span
                    data-test-id='hint'
                    className={classes(
                        'message_error_default',
                        {'message_error_active': isLostedBlurInput}
                    )}
                >
                    {isLostedBlurInput
                        ? defaultHintError
                        : <HighlightedHintText text={defaultHintError} highlight={errors[name]?.message ? errors[name]?.message as string : ''}/>
                    }
                </span>
            }
            
            {confirmValidationCheck && errors[name] && errors[name]?.type === 'checkLength' &&
                <span
                    data-test-id='hint'
                    className={classes(
                        'message_error_default',
                        {'message_error_active': isLostedBlurInput}
                    )}
                >
                    {!dirtyFields[name] && errors[name]?.message as string}
                    {dirtyFields[name] && defaultHintError}
                </span>
            }
            {!errors[name] && showDefaultHint && <span className={style.message_error_default} data-test-id='hint'>{defaultHint}</span>}
            {!errors[name] && dirtyFields[name] && showCheckMark && <span className={style.password_check_icon} data-test-id='checkmark'><IconPassChecked /></span>}
        </label>
    )
}