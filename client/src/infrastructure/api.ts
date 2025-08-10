import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const apiClient = {
    auth: {
        register: (email: string, password: string, username: string) =>
        api.post('/auth/register', { email, password, username }),
        login: (email: string, password: string) => api.post('/auth/login', { email, password }),
    },
    vocabulary: {
        getAll: () => api.get('/vocabulary'),
        create: (data: { word: string; meaning: string; example?: string }) =>
        api.post('/vocabulary', data),
    },
};