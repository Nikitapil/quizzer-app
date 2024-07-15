const TOKEN_KEY = 'token';

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string) => {
  return localStorage.setItem(TOKEN_KEY, token);
};

export const removeAuthToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};
