export const EmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export const PhoneMasks = {
    placeholderChar: /x/,
    codePhoneRegex: /^(\+375 \((29|44|25|33)\)\s)/,
    phoneMask: ['+','3', '7', '5', ' ', '(', /[2,3,4]/, /[5,9,3,4]/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
}