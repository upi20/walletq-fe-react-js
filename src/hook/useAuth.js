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
    }; const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            // Response dari API berisi { data: { token, user } }
            const token = response.data.token;
            const user = response.data.user;

            if (!token) {
                throw new Error('Token not found in response');
            }

            setToken(token);
            // TODO: simpan user data ke state jika diperlukan

            navigate('/'); // Redirect ke dashboard setelah login berhasil
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
