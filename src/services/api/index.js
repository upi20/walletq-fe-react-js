import axios from '../../utils/axios';

// Auth APIs
export const authAPI = {
    login: (data) => axios.post('/auth/login', data),
    register: (data) => axios.post('/auth/register', data),
    forgotPassword: (email) => axios.post('/auth/forgot-password', { email }),
    resetPassword: (data) => axios.post('/auth/reset-password', data)
};

// User APIs
export const userAPI = {
    getProfile: () => axios.get('/users/profile'),
    updateProfile: (data) => axios.put('/users/profile', data),
    changePassword: (data) => axios.put('/users/change-password', data)
};

// Transaction APIs
export const transactionAPI = {
    getAll: (params) => axios.get('/transactions', { params }),
    getById: (id) => axios.get(`/transactions/${id}`),
    create: (data) => axios.post('/transactions', data),
    update: (id, data) => axios.put(`/transactions/${id}`, data),
    delete: (id) => axios.delete(`/transactions/${id}`)
};

// Category APIs
export const categoryAPI = {
    getAll: () => axios.get('/categories'),
    create: (data) => axios.post('/categories', data),
    update: (id, data) => axios.put(`/categories/${id}`, data),
    delete: (id) => axios.delete(`/categories/${id}`)
};

// Wallet APIs
export const walletAPI = {
    getAll: () => axios.get('/wallets'),
    getById: (id) => axios.get(`/wallets/${id}`),
    create: (data) => axios.post('/wallets', data),
    update: (id, data) => axios.put(`/wallets/${id}`, data),
    delete: (id) => axios.delete(`/wallets/${id}`)
};
