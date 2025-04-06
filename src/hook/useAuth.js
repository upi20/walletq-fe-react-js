import { useNavigate } from 'react-router-dom';

const TOKEN_KEY = 'token';
export const useAuth = () => {
    const navigate = useNavigate();
    const getToken = () => localStorage.getItem(TOKEN_KEY);

    const login = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
    };

    const isLoggedIn = () => !!getToken();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return {
        token: getToken(),
        login,
        logout,
        isLoggedIn,
        handleLogout
    };
};
