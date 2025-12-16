import axios from 'axios';

let API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
if (API_BASE_URL && !API_BASE_URL.startsWith('http')) {
    API_BASE_URL = `https://${API_BASE_URL}`;
}

// Fallback: If we are in production and the URL is the internal Render host (which fails in browser), force the public URL
if (import.meta.env.PROD && (!API_BASE_URL || API_BASE_URL.includes('crud-backend-g8xv') && !API_BASE_URL.includes('.onrender.com'))) {
    API_BASE_URL = 'https://crud-backend-g8xv.onrender.com';
}

const API_URL = `${API_BASE_URL}/api/items`;
const AUTH_URL = `${API_BASE_URL}/api/auth`;

export const login = async (username, password) => {
    const response = await axios.post(`${AUTH_URL}/login`, { username, password }, { withCredentials: true });
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const register = async (username, password, confirmPassword) => {
    const response = await axios.post(`${AUTH_URL}/register`, {
        username,
        password,
        confirmPassword
    }, { withCredentials: true });
    return response.data;
};

export const getItems = () => axios.get(API_URL, { withCredentials: true });
export const getItem = (id) => axios.get(`${API_URL}/${id}`, { withCredentials: true });
export const createItem = (item) => axios.post(API_URL, item, { withCredentials: true });
export const updateItem = (id, item) => axios.put(`${API_URL}/${id}`, item, { withCredentials: true });
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`, { withCredentials: true });

// Export API_BASE_URL for use in components
export { API_BASE_URL };
