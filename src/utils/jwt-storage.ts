const JWT_KEY = 'nixarcade_jwt';

const setCookie = (name: string, value: string): void => {
  // const domain = window.location.hostname === 'localhost' ? 
  //   'localhost' : 
  //   '.nixarcade.fun';

    // document.cookie = `${name}=${value}; domain=${domain}; path=/; Secure; SameSite=None`;
  document.cookie = `${name}=${value}, domain=.nixarcade.fun, Secure, SameSite=None`;
  
};

const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      const val = cookieValue?.split(",")[0];
      return val ? val : null;
    }
    return null;
};
  
const removeCookie = (name: string): void => {
  document.cookie = `${name}=; domain=.nixarcade.fun; Secure; SameSite=None`;
};

export const saveJWT = (token: string): void => {
  setCookie(JWT_KEY, token);
};

export const getJWT = (): string | null => {
  return getCookie(JWT_KEY);
};

export const removeJWT = (): void => {
  removeCookie(JWT_KEY);
};
