import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',  // адрес твоего Laravel API
    withCredentials: true,
});

export default api;
