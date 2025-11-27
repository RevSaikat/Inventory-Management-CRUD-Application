import axios from 'axios';

const API_URL = 'http://localhost:8080/api/items';
const AUTH_URL = 'http://localhost:8080/api/auth';

export const login = async (username, password) => {
    const response = await axios.post(`${AUTH_URL}/login`, { username, password }, { withCredentials: true });
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const getItems = () => axios.get(API_URL, { withCredentials: true });
export const getItem = (id) => axios.get(`${API_URL}/${id}`, { withCredentials: true });
export const createItem = (item) => axios.post(API_URL, item, { withCredentials: true });
export const updateItem = (id, item) => axios.put(`${API_URL}/${id}`, item, { withCredentials: true });
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`, { withCredentials: true });
