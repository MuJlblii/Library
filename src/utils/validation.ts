export const passwordValidation = {
    validate: {
        checkLength: (value: string) => value.length > 0 || 'Поле не может быть пустым',
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
