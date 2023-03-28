import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useAuthorizationMutation } from '../../../app/api';
import { useAppDispatch } from '../../../app/hook';
import { setJWTtoken, setUser } from '../../../app/reducer-user';
import { FormFooter } from '../../../components/form-blocks/form-footer';
import { FormStatusBlock } from '../../../components/form-blocks/form-status-block';
import { Input } from '../../../components/form-blocks/input-password';
import { Loader } from '../../../components/loader';
import { PATHS } from '../../../constants/path-routing';
import { setJWTtokenToLocalStorage } from '../../../utils/jwt-token';
import { setUserToLocalStorage } from '../../../utils/user-local-storage';

import styleDefault from '../auth-forms-default.module.css';
import style from './auth.module.css';

type FormAuthInputsType = {
    identifier: string
    password: string
}

export const AuthPage = () => {
    const classes = classNames.bind(style);
    const classesDefault = classNames.bind(styleDefault);
    const [isErrorAuth, setIsErrorAuth] = useState(false);
    const [isErrorResponse, setIsErrorResponse] = useState(false);
    const { register, formState: { errors, dirtyFields, isValid }, handleSubmit, reset } = useForm<FormAuthInputsType>({mode: 'all'});
    const {onChange: onChangeIdent, onBlur: onBlurIdent, name: nameIdent, ref: refIdent} = register('identifier', {validate: {checkLength: (value: string) => value.length > 0 || 'Поле не может быть пустым'}});
    const {onChange: onChangePass, onBlur: onBlurPass, name: namePass, ref: refPass} = register('password', {validate: {checkLength: (value: string) => value.length > 0 || 'Поле не может быть пустым'}});

    const [auth, {data, error}] = useAuthorizationMutation();
    const dispatch = useAppDispatch();
    const onSubmitForm: SubmitHandler<FormAuthInputsType> = ({identifier, password}) => {
        setIsErrorAuth(false);
        auth({identifier, password})
    };
    
    useEffect(() => {
        if (data?.jwt) {
            dispatch(setJWTtoken(data.jwt));
            setJWTtokenToLocalStorage('set', data.jwt);
        }
        if (data?.user) {
            dispatch(setUser(data.user));
            setUserToLocalStorage('set', data.user);
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (error && 'status' in error && error.status === 400) {
            setIsErrorAuth(true);
        }
        if (error && 'status' in error && error.status !== 400) {
            setIsErrorResponse(true);
        }
    }, [error])

    return (
        <div className={styleDefault.wrapper}>
            {/* {isLoading && <Loader />} */}
            <Loader />
            {!isErrorResponse &&
                <Fragment>
                    <h3 className={styleDefault.title}>Вход в личный кабинет</h3>
                    <form
                        onSubmit={handleSubmit(onSubmitForm)}
                        autoComplete='on'
                        data-test-id='auth-form'
                        className={style.form}
                    >
                        <Input
                            inputType='text'
                            showEyesIcon={false}
                            onChange={onChangeIdent}
                            onBlur={onBlurIdent}
                            name={nameIdent}
                            innerRef={refIdent}
                            dirtyFields={dirtyFields}
                            errors={errors}
                            placeholder='Логин'
                            defaultHint=''
                            defaultHintError=''
                            showDefaultHint={false}
                            showCheckMark={false}
                            onChangeMode={true}
                            checkOnDirtyEyesIcon={false}
                        />
                        <Input
                            inputType='password'
                            showEyesIcon={true}
                            onChange={onChangePass}
                            onBlur={onBlurPass}
                            name={namePass}
                            innerRef={refPass}
                            dirtyFields={dirtyFields}
                            errors={errors}
                            placeholder='Пароль'
                            defaultHint=''
                            defaultHintError=''
                            showDefaultHint={false}
                            showCheckMark={false}
                            onChangeMode={true}
                            checkOnDirtyEyesIcon={false}
                        />
                        {isErrorAuth && <span className={classes('message_error_default', 'message_error_active')} data-test-id='hint'>Неверный логин или пароль!</span>}
                        <NavLink to={PATHS.restorePass} className={styleDefault.forgot_link}>{isErrorAuth ? 'Восстановить?' : 'Забыли логин или пароль?'}</NavLink>
                        <button
                            type="submit"
                            className={classesDefault(
                                'btn__submit_form',
                                {'btn__submit_form_disabled': !isValid }
                            )}
                            disabled={!isValid}
                        >вход</button>

                    </form>
                    <FormFooter
                        link={PATHS.registration}
                        linkMessage='регистрация'
                        questionMessage='Нет учетной записи?'
                    />
                </Fragment>
            }
            {isErrorResponse &&
                <FormStatusBlock
                    text='Что-то пошло не так. Попробуйте ещё раз'
                    title='Вход не выполнен'
                    btnText='повторить'
                    btnSubmitHandler={() => {reset(); setIsErrorResponse(false);}}
                />
            }
        </div>
    )
}