import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useForgotPasswordMutation } from '../../../app/api';
import {ReactComponent as IconArrowLeft} from '../../../assets/img/Icon_arrow_left.svg';
import { FormFooter } from '../../../components/form-blocks/form-footer';
import { FormStatusBlock } from '../../../components/form-blocks/form-status-block';
import { Input } from '../../../components/form-blocks/input-password';
import { PATHS } from '../../../constants/path-routing';

import { RestorePassword } from './restore-password';

import styleDefault from '../auth-forms-default.module.css';
import style from './forgot-password.module.css';


export type FormForgotPasswordType = {
    email: string
}

export const ForgotPasswordPage = () => {
    const classesDefault = classNames.bind(styleDefault);
    const [forgot, {isSuccess, error}] = useForgotPasswordMutation();
    const { register, formState: { errors, isValid, dirtyFields }, handleSubmit } = useForm<FormForgotPasswordType>({mode: 'all'});
    const classes = classNames.bind(style);
    const onSubmit: SubmitHandler<FormForgotPasswordType> = data => {
        forgot(data);
    };
    const [ searchValue ] = useSearchParams();
    const codeRestore = searchValue.get('code') || '';
    const [isRestorePassword] = useState(searchValue.get('code') ? true : false);

    const {onChange: onChangeSecondInput, onBlur: onBlurSecondInput, name: nameSecondInput, ref: refSecondInput} = register(
        'email', {
        validate: {
            checkLength: (value: string) => value?.length > 0 || 'Поле не может быть пустым',
            validateEmail: (value) => value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null || 'Введите корректный e-mail'
        }}
    );
    
    return (
        <div className={style.form_container}>
            {!isSuccess && !isRestorePassword &&
                <Fragment>
                    <div className={style.form_header}> 
                        <NavLink to={PATHS.auth} className={style.form_header_link}><IconArrowLeft /><span>вход в личный кабинет</span></NavLink>
                    </div>
                    <div className={style.form_wrapper}>
                        <p className={styleDefault.title}>Восстановление пароля</p>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={style.form}
                            data-test-id='send-email-form'
                        >
                            <Input
                                name={nameSecondInput}
                                innerRef={refSecondInput}
                                onBlur={onBlurSecondInput}
                                onChange={onChangeSecondInput}
                                defaultHint='На это email  будет отправлено письмо с инструкциями по восстановлению пароля'
                                defaultHintError='Введите корректный e-mail'
                                dirtyFields={dirtyFields}
                                errors={errors}
                                placeholder='E-mail'
                                showCheckMark={false}
                                showDefaultHint={true}
                                onChangeMode={false}
                                checkOnDirtyEyesIcon={false}
                                inputType='text'
                                showEyesIcon={false}
                            />
                            {error &&
                                <span
                                    data-test-id='hint'
                                    className={classes('message_error_response'
                                    )}
                                >
                                    {error && 'error'}
                                </span>
                            }

                            <button
                                type="submit"
                                className={classesDefault(
                                    'btn__submit_form',
                                    {'btn__submit_form_disabled': !isValid }
                                )}
                                disabled={!isValid}
                            >восстановить</button>
                        </form>
                        <FormFooter
                            link={PATHS.registration}
                            linkMessage='РЕГИСТРАЦИЯ'
                            questionMessage='Нет учётной записи?'
                        />
                    </div>
                </Fragment>
            }

            {isSuccess &&
                <div className={style.status_block}>
                    <FormStatusBlock
                        text='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
                        title='Письмо выслано'
                    />
                </div>
            }

            {isRestorePassword &&
                <RestorePassword code={codeRestore}/>
            }
        </div>
       
    )
}