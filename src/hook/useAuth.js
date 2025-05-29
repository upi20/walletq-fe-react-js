import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const TOKEN_KEY = 'token';

export const useAuth = () => {
    const navigate = useNavigate();
    
    const getToken = () => localStorage.getItem(TOKEN_KEY);

    const setToken = (token) => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            // Pastikan response.data berisi token
            const { token } = response.data;
            if (!token) {
                throw new Error('Token not found in response');
            }
            setToken(token);
            navigate('/'); // Redirect ke dashboard
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setToken(null);
            navigate('/auth/login');
        }
    };

    const isLoggedIn = () => !!getToken();

    return {
        token: getToken(),
        login,
        logout,
        isLoggedIn
    };
};
