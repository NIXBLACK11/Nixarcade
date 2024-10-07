const JWT_KEY = 'nixarcade_jwt';

const setCookie = (name: string, value: string, days: number): void => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();

  const domain = window.location.hostname === 'localhost' ? 
    'localhost' : 
    '.nixarcade.fun';

  document.cookie = `${name}=${value}; domain=${domain}; path=/; expires=${expires}; Secure; SameSite=None`;
};

const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue ? cookieValue : null;
    }
    return null;
};
  
const removeCookie = (name: string): void => {
  document.cookie = `${name}=; domain=.nixarcade.fun; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=None`;
};

export const saveJWT = (token: string): void => {
  setCookie(JWT_KEY, token, 7); // Set the cookie for 7 days
};

export const getJWT = (): string | null => {
  return getCookie(JWT_KEY);
};

export const removeJWT = (): void => {
  removeCookie(JWT_KEY);
};
