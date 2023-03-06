import { useState } from 'react';
import { Controller,SubmitHandler, useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames/bind';

import { FormFooter } from '../../../components/form-blocks/form-footer';
import { Input } from '../../../components/form-blocks/input-password';
import { PATHS } from '../../../constants/path-routing';

import styleDefault from '../auth-forms-default.module.css';
import style from './registration.module.css';

export interface IFormInputsThirdStep {
    number: string
    email: string
    phone: string
}
type PropsType = {
    onSubmitParent: SubmitHandler<IFormInputsThirdStep>
}

export const RegistrationThirdSection = ({onSubmitParent}: PropsType) => {
    const { register, formState: { errors, isValid, dirtyFields }, handleSubmit, control } = useForm<IFormInputsThirdStep>({mode: 'all'});
    const [isLostedBlurSecondInput] = useState(true);
    const classes = classNames.bind(style);
    const classesDefault = classNames.bind(styleDefault);

    const {onChange: onChangeSecondInput, onBlur: onBlurSecondInput, name: nameSecondInput, ref: refSecondInput} = register(
        'email', {
        validate: {
            checkLength: (value: string) => value.length > 0 || 'Поле не может быть пустым',
            validateEmail: (value) => value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null || 'Введите корректный e-mail'
        }}
    );
    

    return (
        <form
            onSubmit={handleSubmit(onSubmitParent)}
            className={classesDefault('form')}
            data-test-id='register-form'
        >
            <Controller
                control={control}
                name="phone"
                defaultValue=''
                rules={{
                    required: 'Поле не может быть пустым',
                    validate: {
                        hasXsymbols: (value) => value.match(/x/) === null || 'В формате +375 (xx) xxx-xx-xx',
                        hasWrongCode: (value) => value.match(/^(\+375 \((29|44|25|33)\)\s)/) !== null || 'Проверьте код оператора'}
                    }}
                render={({
                    field,
                  }) => (
                    <label className={style.label}>
                        <MaskedInput
                            name="phone"
                            value={field.value}
                            type='tel'
                            inputMode='tel'
                            mask={['+','3', '7', '5', ' ', '(', /[2,3,4]/, /[5,9,3,4]/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            placeholderChar='x'
                            className={classes(
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
                                className={classes(
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
                                className={classes(
                                    'message_error_default',
                                    {'message_error_active': isLostedBlurSecondInput}
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
                name={nameSecondInput}
                innerRef={refSecondInput}
                onBlur={onBlurSecondInput}
                onChange={onChangeSecondInput}
                defaultHint=''
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

            <button
                type="submit"
                className={classesDefault(
                    'btn__submit_form',
                    {'btn__submit_form_disabled': !isValid }
                )}
                disabled={!isValid}
            >ЗАРЕГИСТРИРОВАТЬСЯ</button>

            <FormFooter link={PATHS.auth} linkMessage='ВОЙТИ' questionMessage='Есть учетная запись?'/>
        </form>
    )
}