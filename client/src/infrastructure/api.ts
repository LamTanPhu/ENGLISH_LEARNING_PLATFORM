import axios from 'axios';

const api = axios.create({
    baseURL: typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'http://localhost:3000',
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
    create: (data: { word: string; meaning: string; example?: string }) => api.post('/vocabulary', data),
    },
  votes: {
    create: (payload: { resourceId: string; type: 'upvote' | 'downvote'; onModel: 'Vocabulary' | 'FlashcardSet' }) =>
      api.post('/votes', payload),
  },
  comments: {
    list: (params: { targetType: 'Vocabulary' | 'FlashcardSet'; targetId: string }) =>
      api.get('/comments', { params }),
    create: (payload: { targetType: 'Vocabulary' | 'FlashcardSet'; targetId: string; content: string }) =>
      api.post('/comments', payload),
  },
  flashcardSets: {
    getAll: () => api.get('/flashcard-sets'),
    create: (payload: { title: string; description?: string; cards?: Array<{ word: string; meaning: string; example?: string }> }) =>
      api.post('/flashcard-sets', payload),
    getOne: (id: string) => api.get(`/flashcard-sets/${id}`),
    update: (id: string, payload: any) => api.put(`/flashcard-sets/${id}`, payload),
    delete: (id: string) => api.delete(`/flashcard-sets/${id}`),
  },
};