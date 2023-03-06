import { SubmitHandler,useForm } from 'react-hook-form';
import classNames from 'classnames/bind';

import { FormFooter } from '../../../components/form-blocks/form-footer';
import { Input } from '../../../components/form-blocks/input-password';
import { PATHS } from '../../../constants/path-routing';
import { loginValidation, passwordValidation } from '../../../utils/validation';

import styleDefault from '../auth-forms-default.module.css';

export type FormInputsFirstStepType = {
    username: string
    password: string
}
type PropsType = {
    onSubmitParent: SubmitHandler<FormInputsFirstStepType>
}

export const RegistrationFirstSection = ({onSubmitParent}: PropsType) => {
    
    const { register, formState: { errors, isValid, dirtyFields }, handleSubmit } = useForm<FormInputsFirstStepType>({mode: 'all'});
    const classesDefault = classNames.bind(styleDefault);

    const {onChange: onChangeFirstInput, onBlur: onBlurFirstInput, name: nameFirstInput, ref: refFirstInput} = register('username', loginValidation);
    const {onChange: onChangeSecondInput, onBlur: onBlurSecondInput, name: nameSecondInput, ref: refSecondInput} = register('password', passwordValidation);

    return (
        <form
            onSubmit={handleSubmit(onSubmitParent)}
            className={classesDefault('form')}
            data-test-id='register-form'
        >
            <Input
                name={nameFirstInput}
                innerRef={refFirstInput}
                errors={errors}
                onBlur={onBlurFirstInput}
                onChange={onChangeFirstInput}
                defaultHint='Используйте для логина латинский алфавит и цифры'
                defaultHintError='Используйте для логина латинский алфавит и цифры'
                checkOnDirtyEyesIcon={false}
                placeholder='Придумайте логин для входа'
                dirtyFields={dirtyFields}
                inputType='text'
                showCheckMark={false}
                showDefaultHint={true}
                showEyesIcon={false}
                onChangeMode={true}
            />
            
            <Input 
                name={nameSecondInput}
                innerRef={refSecondInput}
                onBlur={onBlurSecondInput}
                onChange={onChangeSecondInput}
                defaultHint='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                defaultHintError='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                dirtyFields={dirtyFields}
                errors={errors}
                placeholder='Пароль'
                showCheckMark={true}
                showDefaultHint={true}
                onChangeMode={true}
                checkOnDirtyEyesIcon={false}
                inputType='password'
                showEyesIcon={true}
                
            />
            
            <button
                type="submit"
                className={classesDefault(
                    'btn__submit_form',
                    {'btn__submit_form_disabled': !isValid }
                )}
                disabled={!isValid}
            >СЛЕДУЮЩИЙ ШАГ</button>
            <FormFooter link={PATHS.auth} linkMessage='ВОЙТИ' questionMessage='Есть учетная запись?'/>
        </form>
    )
}