export const setJWTtokenToLocalStorage = (action: string, JWTtoken?: string) => {
    if (action === 'set' && JWTtoken) localStorage.setItem('JWTtoken', JWTtoken);
    if (action === 'remove') localStorage.removeItem('JWTtoken');
}