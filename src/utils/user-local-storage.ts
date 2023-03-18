import { UserType } from '../app/reducer-user';

export const setUserToLocalStorage = (action: string, user?: UserType) => {
    if (action === 'set' && user) localStorage.setItem('user', JSON.stringify(user));
    if (action === 'remove') localStorage.removeItem('user');
}