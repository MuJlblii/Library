import classNames from 'classnames';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import { Input } from '../../../components/form-blocks/input-password';
import { EmailRegex, PhoneMasks } from '../../../constants/regex';
import { loginValidation, passwordValidation } from '../../../utils/validation';

import styleParent from '../profile.module.css';
import style from './credentials.module.css';

export type CredentialsPropsType = {
    // id: number,
    username: string,
    email: string,
    // provider: string,
    // confirmed: boolean,
    // blocked: boolean,
    // createdAt: string,
    // updatedAt: string,
    firstName: string,
    lastName: string,
    phone: string,
}
type FormAuthInputsType = {
    identifier: string
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
}
export const Credentials = ({username, firstName, lastName, phone, email}: CredentialsPropsType) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const { register, formState: { errors, dirtyFields, isValid }, handleSubmit, reset, control } = useForm<FormAuthInputsType>({mode: 'all'});
    const {onChange: onChangeIdent, onBlur: onBlurIdent, name: nameIdent, ref: refIdent} = register('identifier', loginValidation);
    const {onChange: onChangePass, onBlur: onBlurPass, name: namePass, ref: refPass} = register('password', passwordValidation);
    const {onChange: onChangeFirstInput, onBlur: onBlurFirstInput, name: nameFirstInput, ref: refFirstInput} = register('firstName', {required: 'Поле не может быть пустым'});
    const {onChange: onChangeSecondInput, onBlur: onBlurSecondInput, name: nameSecondInput, ref: refSecondInput} = register('lastName', {required: 'Поле не может быть пустым'});
    const {onChange: onChangeEmailInput, onBlur: onBlurEmailInput, name: nameEmailInput, ref: refEmailInput} = register(
        'email', {
        validate: {
            checkLength: (value: string) => value.length > 0 || 'Поле не может быть пустым',
            validateEmail: (value) => value.match(EmailRegex) !== null || 'Введите корректный e-mail'
        }}
    );
    
    return (
        <div className={classNames(style.profile__credentials, styleParent.section__container)}>
            <p className={styleParent.profile__section_title}>Учётные данные</p>
            <p className={styleParent.profile__section_comment}>Здесь вы можете отредактировать информацию о себе</p>
            <div className={style.profile__credentials_form_wrapper}>
                <form
                    onSubmit={() => console.log('handle form')}
                    // autoComplete='on'
                    data-test-id='profile-form'
                    className={style.form}
                >
                    <Input
                        defaultHint='Используйте для логина латинский алфавит и цифры'
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
                        showDefaultHint={false}
                        showCheckMark={false}
                        onChangeMode={true}
                        checkOnDirtyEyesIcon={false}
                        isDisabled={isDisabled}
                    />
                    <Input
                        name={namePass}
                        innerRef={refPass}
                        onBlur={onBlurPass}
                        onChange={onChangePass}
                        defaultHint='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        defaultHintError='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        dirtyFields={dirtyFields}
                        errors={errors}
                        placeholder='Пароль'
                        showCheckMark={false}
                        showDefaultHint={false}
                        onChangeMode={true}
                        checkOnDirtyEyesIcon={false}
                        inputType='password'
                        showEyesIcon={true}
                        isDisabled={isDisabled}
                    />

                    <Input
                        name={nameFirstInput}
                        innerRef={refFirstInput}
                        errors={errors}
                        onBlur={onBlurFirstInput}
                        onChange={onChangeFirstInput}
                        defaultHint=''
                        defaultHintError='Поле не может быть пустым'
                        checkOnDirtyEyesIcon={false}
                        placeholder='Имя'
                        dirtyFields={dirtyFields}
                        inputType='text'
                        showCheckMark={false}
                        showDefaultHint={true}
                        showEyesIcon={false}
                        onChangeMode={true}
                        isDisabled={isDisabled}
                    />
                    
                    <Input 
                        name={nameSecondInput}
                        innerRef={refSecondInput}
                        onBlur={onBlurSecondInput}
                        onChange={onChangeSecondInput}
                        defaultHint=''
                        defaultHintError='Поле не может быть пустым'
                        dirtyFields={dirtyFields}
                        errors={errors}
                        placeholder='Фамилия'
                        showCheckMark={false}
                        showDefaultHint={false}
                        onChangeMode={true}
                        checkOnDirtyEyesIcon={false}
                        inputType='text'
                        showEyesIcon={false}
                        isDisabled={isDisabled}
                        
                    />


                    <Controller
                        control={control}
                        name="phone"
                        defaultValue=''
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
                                    className={classNames(
                                        'input',
                                        {'input_without_error_required': !errors.phone || errors.phone?.message === ''}
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
                                        className={classNames(
                                            'message_error_default',
                                            'message_error_active',
                                        )}
                                    >
                                        {errors.phone.message}
                                    </span>
                                }
                                {errors.phone && errors.phone?.type !== 'required' &&
                                    <span
                                        data-test-id='hint'
                                        className={classNames(
                                            'message_error_default',
                                            // {'message_error_active': isLostedBlurSecondInput}
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

                    <Input 
                        name={nameEmailInput}
                        innerRef={refEmailInput}
                        onBlur={onBlurEmailInput}
                        onChange={onChangeSecondInput}
                        defaultHint=''
                        defaultHintError='Введите корректный e-mail'
                        dirtyFields={dirtyFields}
                        errors={errors}
                        placeholder='E-mail'
                        showCheckMark={false}
                        showDefaultHint={true}
                        onChangeMode={true}
                        checkOnDirtyEyesIcon={false}
                        inputType='text'
                        showEyesIcon={false}
                        isDisabled={isDisabled}
                    />

                    <button
                        type='button'
                        data-test-id='edit-button'
                        onClick={() => setIsDisabled(!isDisabled)}
                    >редактировать</button>

                    <button
                        type="submit"
                        data-test-id='save-button'
                        className={classNames(
                            'btn__submit_form',
                            {'btn__submit_form_disabled': !isValid }
                        )}
                        disabled={!isValid}
                    >вход</button>

                </form>
            </div>
        </div>
    );
}