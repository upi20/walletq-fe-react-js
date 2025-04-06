// src/hooks/useAuth.js
const TOKEN_KEY = 'token';

export const useAuth = () => {
    const getToken = () => localStorage.getItem(TOKEN_KEY);

    const login = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
    };

    const isLoggedIn = () => !!getToken();

    return {
        token: getToken(),
        login,
        logout,
        isLoggedIn
    };
};
