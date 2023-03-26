import { useEffect, useLayoutEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';

import { useChangeProfileInfoMutation } from '../../../app/api';
import { useAppDispatch } from '../../../app/hook';
import { setToasterMsg } from '../../../app/reducer';
import { UserProfileType } from '../../../app/reducer-user';
import { EmailRegex, PhoneMasks } from '../../../constants/regex';
import { loginValidation, passwordValidation } from '../../../utils/validation';
import { InputProfile } from '../input-profile';

import { getOnlyChangedValues } from './utils';

import styleParent from '../profile.module.css';
import style from './credentials.module.css';

export type CredentialsPropsType = {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
}
export type FormAuthInputsType = {
    login: string
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
}
export const Credentials = ({ username, firstName, lastName, phone, email, id: userId }: UserProfileType) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [changeProfileInfo, { isError, isSuccess }] = useChangeProfileInfoMutation();
    const dispatch = useAppDispatch();
    const { register, formState: { errors, dirtyFields }, control, getValues, reset } = useForm<FormAuthInputsType>({ mode: 'all', defaultValues: { phone } });
    const { onChange: onChangeIdent, onBlur: onBlurIdent, name: nameIdent, ref: refIdent } = register('login', loginValidation);
    const { onChange: onChangePass, onBlur: onBlurPass, name: namePass, ref: refPass } = register('password', passwordValidation);
    const { onChange: onChangeFirstInput, onBlur: onBlurFirstInput, name: nameFirstInput, ref: refFirstInput } = register('firstName', { required: 'Поле не может быть пустым' });
    const { onChange: onChangeSecondInput, onBlur: onBlurSecondInput, name: nameSecondInput, ref: refSecondInput } = register('lastName', { required: 'Поле не может быть пустым' });
    const { onChange: onChangeEmailInput, onBlur: onBlurEmailInput, name: nameEmailInput, ref: refEmailInput } = register(
        'email', {
        validate: {
            checkLength: (value: string) => value?.length > 0 || 'Поле не может быть пустым',
            validateEmail: (value) => value.match(EmailRegex) !== null || 'Введите корректный e-mail'
        }
    }
    );

    const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); e.stopPropagation();
        const valueFields = getOnlyChangedValues(getValues());
        
        await changeProfileInfo({ userId, ...valueFields });
    }

    useEffect(() => {
        if (isError) {
            dispatch(setToasterMsg({ type: 'error', message: 'Изменения не были сохранены. Попробуйте позже!' }))
        }
        if (isSuccess) {
            dispatch(setToasterMsg({ type: 'success', message: 'Изменения успешно сохранены!' }));
            setIsDisabled(true);
        }
    }, [dispatch, isError, isSuccess]);

    useLayoutEffect(() => {
        reset({ phone })
    }, [phone, reset])

    return (
        <div className={classNames(style.profile__credentials, styleParent.section__container)}>
            <p className={styleParent.profile__section_title}>Учётные данные</p>
            <p className={styleParent.profile__section_comment}>Здесь вы можете отредактировать информацию о себе</p>
            <div className={style.profile__credentials_form_wrapper}>
                <form
                    onSubmit={(e) => handleUpdateSubmit(e)}
                    data-test-id='profile-form'
                    className={style.form}
                >
                    <InputProfile
                        defaultHintError='Используйте для логина латинский алфавит и цифры'
                        inputType='text'
                        showEyesIcon={false}
                        onChange={onChangeIdent}
                        onBlur={onBlurIdent}
                        name={nameIdent}
                        innerRef={refIdent}
                        dirtyFields={dirtyFields}
                        errors={errors}
                        placeholder='Логин'
                        checkOnDirtyEyesIcon={false}
                        isDisabled={isDisabled}
                        defaultValue={username}
                    />
                    <InputProfile
                        name={namePass}
                        innerRef={refPass}
                        onBlur={onBlurPass}
                        onChange={onChangePass}
                        defaultHintError='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        dirtyFields={dirtyFields}
                        errors={errors}
                        placeholder='Пароль'
                        checkOnDirtyEyesIcon={false}
                        inputType='password'
                        showEyesIcon={true}
                        isDisabled={isDisabled}
                        defaultValue='HelloWorld123'
                    />

                    <InputProfile
                        name={nameFirstInput}
                        innerRef={refFirstInput}
                        errors={errors}
                        onBlur={onBlurFirstInput}
                        onChange={onChangeFirstInput}
                        defaultHintError='Поле не может быть пустым'
                        checkOnDirtyEyesIcon={false}
                        placeholder='Имя'
                        dirtyFields={dirtyFields}
                        inputType='text'
                        showEyesIcon={false}
                        isDisabled={isDisabled}
                        defaultValue={firstName}
                    />

                    <InputProfile
                        name={nameSecondInput}
                        innerRef={refSecondInput}
                        onBlur={onBlurSecondInput}
                        onChange={onChangeSecondInput}
                        defaultHintError='Поле не может быть пустым'
                        dirtyFields={dirtyFields}
                        errors={errors}
                        placeholder='Фамилия'
                        checkOnDirtyEyesIcon={false}
                        inputType='text'
                        showEyesIcon={false}
                        isDisabled={isDisabled}
                        defaultValue={lastName}
                    />


                    <Controller
                        control={control}
                        name="phone"
                        rules={{
                            required: 'Поле не может быть пустым',
                            validate: {
                                hasXsymbols: (value) => value.match(PhoneMasks.placeholderChar) === null || 'В формате +375 (xx) xxx-xx-xx',
                                hasWrongCode: (value) => value.match(PhoneMasks.codePhoneRegex) !== null || 'Проверьте код оператора'}
                            }}
                        render={({
                            field,
                        }) => (
                            <label className={style.label}>
                                <MaskedInput
                                    name="phone"
                                    value={field.value}
                                    disabled={isDisabled}
                                    type='tel'
                                    inputMode='tel'
                                    mask={PhoneMasks.phoneMask}
                                    placeholderChar='x'
                                    className={classNames(style.input,
                                        {[style.input_without_error_required]: !errors.phone || errors.phone?.message === ''}
                                    )}
                                    placeholder='Номер телефона'
                                    guide={true}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                                <span className={style.placeholder}>Номер телефона</span>
                                {errors.phone?.type === 'required' &&
                                    <span
                                        data-test-id='hint'
                                        className={classNames(style.message_error_default,style.message_error_active)}
                                    >
                                        {errors.phone.message}
                                    </span>
                                }
                                {errors.phone && errors.phone?.type !== 'required' &&
                                    <span
                                        data-test-id='hint'
                                        className={classNames(style.message_error_default,style.message_error_active
                                        )}
                                        >
                                            {errors.phone.message}
                                    </span>
                                }
                                {!errors.phone && 
                                    <span
                                        className={style.message_error_default}
                                        data-test-id='hint'
                                    >В формате +375 (xx) xxx-xx-xx</span>
                                }
                            </label>
                        )}
                    />

                    <InputProfile
                        name={nameEmailInput}
                        innerRef={refEmailInput}
                        onBlur={onBlurEmailInput}
                        onChange={onChangeEmailInput}
                        defaultHintError='Введите корректный e-mail'
                        dirtyFields={dirtyFields}
                        errors={errors}
                        placeholder='E-mail'
                        checkOnDirtyEyesIcon={false}
                        inputType='text'
                        showEyesIcon={false}
                        isDisabled={isDisabled}
                        defaultValue={email}
                    />

                    <div className={style.btns_wrapper}>
                        <button
                            type='button'
                            className={classNames(style.btn, style.btn_edit)}
                            data-test-id='edit-button'
                            onClick={() => setIsDisabled(!isDisabled)}
                        >Редактировать</button>

                        <button
                            type="submit"
                            data-test-id='save-button'
                            className={classNames(style.btn, style.btn_submit)}
                            disabled={isDisabled || Object.keys(errors)?.length > 0}
                        >сохранить изменения</button>
                    </div>

                </form>
            </div>
        </div>
    );
}