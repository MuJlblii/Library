export const passwordValidation = {
    validate: {
        checkLength: (value: string) => value?.length > 0 || 'Поле не может быть пустым',
        validatePass: (value: string) => {
            const checkConditions = [
                value.length < 8 && value.match(/[A-Z0-9]/) === null ? 'Пароль' : '',
                value.length < 8 ? 'не менее 8 символов,' : '',
                value.match(/[A-Z]/) === null ? 'с заглавной буквой' : '',
                value.match(/[0-9]/) === null ? 'и цифрой' : ''
            ];
            const resultche = checkConditions.filter((el) => el !== '').join('\\');
            
            return resultche === '' ? true : resultche
        },
    }
};
export const loginValidation = {
    validate: {
        checkLength: (value: string) => value?.length > 0 || 'Поле не может быть пустым',
        validatePass: (value: string) => {
            const checkConditions = [
                value.match(/^[a-zA-Z0-9_.-]+$/) === null ? 'Используйте для логина ' : '',
                value.match(/^[a-zA-Z]/) === null ? 'латинский алфавит' : '',
                value.match(/[0-9]/) === null ? ' и цифры' : ''
            ];
            const result = checkConditions.filter((el) => el !== '').join('\\');

            return result === '' ? true : result
        },
    }
};