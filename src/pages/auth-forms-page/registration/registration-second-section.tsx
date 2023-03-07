import { SubmitHandler,useForm } from 'react-hook-form';
import classNames from 'classnames/bind';

import { FormFooter } from '../../../components/form-blocks/form-footer';
import { Input } from '../../../components/form-blocks/input-password';
import { PATHS } from '../../../constants/path-routing';

import styleDefault from '../auth-forms-default.module.css';

export type FormInputsSecondStepType = {
    firstName: string
    lastName: string
}
type PropsType = {
    onSubmitParent: SubmitHandler<FormInputsSecondStepType>
}

export const RegistrationSecondSection = ({onSubmitParent}: PropsType) => {
    const { register, formState: { errors, isValid, dirtyFields }, handleSubmit } = useForm<FormInputsSecondStepType>({mode: 'all'});
    const classesDefault = classNames.bind(styleDefault);

    const {onChange: onChangeFirstInput, onBlur: onBlurFirstInput, name: nameFirstInput, ref: refFirstInput} = register('firstName', {required: 'Поле не может быть пустым'});
    const {onChange: onChangeSecondInput, onBlur: onBlurSecondInput, name: nameSecondInput, ref: refSecondInput} = register('lastName', {required: 'Поле не может быть пустым'});

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
                
            />

            <button
                type="submit"
                className={classesDefault(
                    'btn__submit_form',
                    {'btn__submit_form_disabled': !isValid }
                )}
                disabled={!isValid}
            >ПОСЛЕДНИЙ ШАГ</button>

            <FormFooter link={PATHS.auth} linkMessage='ВОЙТИ' questionMessage='Есть учетная запись?'/>
        </form>
    )
}