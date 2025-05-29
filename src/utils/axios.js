import axios from 'axios';

const axiosServices = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosServices.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosServices.interceptors.response.use(
    (response) => {
        // Successful response handling
        const { data } = response;
        if (data.status === false) {
            return Promise.reject({
                ...data,
                isApiError: true
            });
        }
        return data;
    },
    (error) => {
        // Error handling
        if (error.response) {
            // Server responded with error
            const { status, data } = error.response;

            // Handle 401 Unauthorized
            if (status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/auth/login';
            }

            // Handle 403 Forbidden
            if (status === 403) {
                console.error('Access forbidden');
            }

            return Promise.reject({
                ...data,
                isApiError: true,
                status: status
            });
        }

        // Network error
        return Promise.reject({
            message: 'Terjadi kesalahan jaringan. Silakan coba lagi.',
            isNetworkError: true
        });
    }
);
export default axiosServices;
