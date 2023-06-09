import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useRegisterMutation } from '../../../app/api';
import { FormStatusBlock } from '../../../components/form-blocks/form-status-block';
import { PATHS } from '../../../constants/path-routing';

import { FormInputsFirstStepType, RegistrationFirstSection } from './registration-first-section';
import { FormInputsSecondStepType, RegistrationSecondSection } from './registration-second-section';
import { FormInputsThirdStepType, RegistrationThirdSection } from './registration-third-section';

import styleDefault from '../auth-forms-default.module.css';

export const RegistrationPage = () => {
    const [dataFromForm, setDataFromForm] = useState({});
    const [step, setStep] =useState(1);
    const [register, {isSuccess, error}] = useRegisterMutation();

    const [isErrorRegister, setIsErrorRegister] = useState(false);
    const [isErrorResponse, setIsErrorResponse] = useState(false);
    const onSubmitFirstStep: SubmitHandler<FormInputsFirstStepType> = data => {
        setDataFromForm({...dataFromForm, ...data});
        setStep(step + 1);
    };
    const onSubmitSecondStep: SubmitHandler<FormInputsSecondStepType> = data => {
        setDataFromForm({...dataFromForm, ...data});
        setStep(step + 1);
    };
    const onSubmitThirdStep: SubmitHandler<FormInputsThirdStepType> = data => {
        setDataFromForm({...dataFromForm, ...data});
        setStep(step + 1);
    };
    const resendRegister = () => {
        register(dataFromForm);
    }
    
    useEffect(() => {
        if (step === 4 && dataFromForm) {
            register(dataFromForm);
        }
    }, [dataFromForm, step, register])

    useEffect(() => {
        if (error && 'status' in error && error.status === 400) {
            setIsErrorRegister(true);
        }
        if (error && 'status' in error && error.status !== 400) {
            setIsErrorResponse(true);
        }
    }, [error])

    return (
        <div className={styleDefault.wrapper}>
            {!isErrorRegister && !isErrorResponse &&
                <Fragment>
                    {!isSuccess && step <= 3 && <p className={styleDefault.title}>Регистрация</p>}
                    {!isSuccess && step <= 3 && <p className={styleDefault.stage}>{step} шаг из 3</p>}
                    {step === 1 && <RegistrationFirstSection onSubmitParent={onSubmitFirstStep}/>}
                    {step === 2 && <RegistrationSecondSection onSubmitParent={onSubmitSecondStep}/>}
                    {step === 3 && <RegistrationThirdSection onSubmitParent={onSubmitThirdStep}/>}
                </Fragment>
            }
            {isSuccess &&
                <FormStatusBlock
                    text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
                    title='Регистрация успешна'
                    btnText='вход'
                    btnLink={PATHS.auth}
                />
            }

            {isErrorRegister &&
                <FormStatusBlock
                    text='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail'
                    title='Данные не сохранились'
                    btnSubmitHandler={() => {setStep(1); setDataFromForm({}); setIsErrorRegister(false); setIsErrorResponse(false)}}
                    btnText='назад к регистрации'
                />
            }

            {isErrorResponse &&
                <FormStatusBlock
                    text='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
                    title='Данные не сохранились'
                    btnText='повторить'
                    btnSubmitHandler={resendRegister}
                />
            }

        </div>
    )
}