import axiosServices from '../utils/axios';
import { jwtDecode } from 'jwt-decode';

class AuthService {
    setToken(token) {
        if (token) {
            localStorage.setItem('token', token);
            axiosServices.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete axiosServices.defaults.headers.common.Authorization;
        }
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isTokenValid(token) {
        if (!token) return false;
        try {
            const decoded = jwtDecode(token);
            return decoded.exp > Date.now() / 1000;
        } catch {
            return false;
        }
    }

    async login(email, password) {
        try {
            const response = await axiosServices.post('/auth/login', {
                email,
                password,
            });
            const { token } = response.data.data;
            this.setToken(token);
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
            throw error;
        }
    }

    async register(data) {
        try {
            const response = await axiosServices.post('/auth/register', data);
            const { token } = response.data.data;
            this.setToken(token);
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
            throw error;
        }
    }

    async forgotPassword(email) {
        try {
            const response = await axiosServices.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
            throw error;
        }
    }

    async resetPassword(token, password) {
        try {
            const response = await axiosServices.post('/auth/reset-password', {
                token,
                password,
                password_confirmation: password,
            });
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
            throw error;
        }
    }

    async logout() {
        try {
            await axiosServices.post('/auth/logout');
        } finally {
            this.setToken(null);
        }
    }

    handleAuthError(error) {
        const { response } = error;
        if (response?.status === 401) {
            this.setToken(null);
        }
        return error;
    }
}

export const authService = new AuthService();
