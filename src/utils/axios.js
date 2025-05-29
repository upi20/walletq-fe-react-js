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

axiosServices.interceptors.response.use((response) => {
    // Successful response handling
    const { data } = response;

    // Return the data directly since the API already wraps it properly
    return data;
},
    (error) => {
        // Error handling
        if (error.response) {
            // Server responded with error
            const { status, data } = error.response;            // We'll let the components handle auth errors instead of redirecting here
            // This prevents unwanted page reloads

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
