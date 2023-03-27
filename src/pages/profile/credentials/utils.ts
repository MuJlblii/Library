import { FormAuthInputsType } from './credentials';

export const getOnlyChangedValues = (valueFields: FormAuthInputsType) => {
    const arrValueFields = Object.entries(valueFields);
    const clearArrValueFields = arrValueFields.filter((el: [string, string | undefined]) => el[1] !== undefined);
    const result = clearArrValueFields.reduce((obj, element) => ({ ...obj, [element[0]]: element[1] }), {});

    return result
}