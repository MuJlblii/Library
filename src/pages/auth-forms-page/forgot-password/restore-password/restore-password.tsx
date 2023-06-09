import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';

import { useRestorePasswordMutation } from '../../../../app/api';
import { FormStatusBlock } from '../../../../components/form-blocks/form-status-block';
import { Input } from '../../../../components/form-blocks/input-password';
import { PATHS } from '../../../../constants/path-routing';
import { passwordValidation } from '../../../../utils/validation';

import style from './restore-password.module.css';

export type RestorePasswordPropsType = {
    code: string;
}
export type RestorePasswordFormType = {
    password: string,
    passwordConfirmation: string,
}

export const RestorePassword = ({code} : RestorePasswordPropsType) => {
    const classes = classNames.bind(style);
    const { register, getValues, formState: { errors, isValid, dirtyFields }, handleSubmit, reset, } = useForm<RestorePasswordFormType>({mode: 'all'});

    const {onChange: onChangePass1, onBlur: onBlurPass1, name: namePass1, ref: refPass1} = register('password', passwordValidation);
    const {onChange: onChangePass2, onBlur: onBlurPass2, name: namePass2, ref: refPass2} = register('passwordConfirmation', {validate: {checkLength: (value: string) => value?.length > 0 || 'Поле не может быть пустым', checkTheSame: (value: string) => value === getValues('password') ? true : 'Пароли не совпадают'}});
    const [restore, {isSuccess, isError}] = useRestorePasswordMutation();

    const onSubmitForm: SubmitHandler<RestorePasswordFormType> = data => {
        restore({...data, code})
    };
    const [isErrorRestoreResponse, setIsErrorRestoreResponse] = useState(false);
    const [isInFocus, setIsInFocus] = useState(false);

    useEffect(() => {
        if (isError) {
            setIsErrorRestoreResponse(true);
        }
    }, [isError])

    return (
        <div className={style.wrapper}>
            {!isSuccess && !isErrorRestoreResponse &&
            <Fragment><p className={style.form_title}>Восстановление пароля</p>
                <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    data-test-id='reset-password-form'
                    className={style.form}
                >
                    <Input
                        onChange={onChangePass1}
                        onBlur={onBlurPass1}
                        name={namePass1}
                        innerRef={refPass1}
                        dirtyFields={dirtyFields}
                        errors={errors}
                        placeholder='Новый пароль'
                        defaultHint='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        defaultHintError='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        showDefaultHint={true}
                        showCheckMark={true}
                        onChangeMode={true}
                        checkOnDirtyEyesIcon={true}
                        inputType='password'
                        showEyesIcon={true}
                    />
                    <span
                        onFocus={() => setIsInFocus(true)}
                        onBlur={() => setIsInFocus(false)}
                    >
                        <Input
                            onChange={onChangePass2}
                            onBlur={onBlurPass2}
                            name={namePass2}
                            innerRef={refPass2}
                            dirtyFields={dirtyFields}
                            errors={errors}
                            placeholder='Повторите пароль'
                            defaultHint='Поле не может быть пустым'
                            defaultHintError='Пароли не совпадают'
                            showDefaultHint={false}
                            showCheckMark={false}
                            onChangeMode={false}
                            checkOnDirtyEyesIcon={true}
                            inputType='password'
                            showEyesIcon={true}
                        />
                    </span>
                    
                    <button
                        type="submit"
                        className={classes(
                            'btn_submit',
                            {'btn_disabled': !isValid && !isInFocus}
                        )}
                        disabled={!isValid && !isInFocus}
                    >СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                </form>
                <p className={style.additional_msg}>После сохранения войдите в библиотеку, используя новый пароль</p>
            </Fragment>
            }
            {isSuccess &&
                <FormStatusBlock
                    title='Новые данные сохранены'
                    text='Зайдите в личный кабинет, используя свои логин и новый пароль'
                    btnText='вход'
                    btnLink={PATHS.auth}
                />
            }
            {isErrorRestoreResponse &&
                <FormStatusBlock
                    title='Данные не сохранились'
                    text='Что-то пошло не так. Попробуйте ещё раз'
                    btnText='повторить'
                    btnSubmitHandler={() => {setIsErrorRestoreResponse(false); reset()}}
                />
            }
        </div>
        
    )
}