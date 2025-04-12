import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// Planet API Calls
export const getAllPlanets = () => api.get('/planets');
export const getPlanetById = (id) => api.get(`/planets/${id}`);
export const createPlanet = (planetData) => api.post('/planets', planetData);
export const updatePlanet = (id, planetData) => api.put(`/planets/${id}`, planetData);
export const deletePlanet = (id) => api.delete(`/planets/${id}`);

// Star API Calls
export const getAllStars = () => api.get('/stars');
export const getStarById = (id) => api.get(`/stars/${id}`);
export const createStar = (starData) => api.post('/stars', starData);
export const updateStar = (id, starData) => api.put(`/stars/${id}`, starData);
export const deleteStar = (id) => api.delete(`/stars/${id}`);

// Authentication API Calls
export const login = (credentials) => api.post('/auth/login', credentials, { withCredentials: true });
export const logout = () => api.post('/auth/logout',{}, { withCredentials: true });

// Check Admin Status
export const checkAdmin = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return { isAdmin: false }; // Or throw an error
    }
    try {
        const response = await api.get('/auth/check', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Expected response: { isAdmin: true } or { isAdmin: false }
    } catch (error) {
        console.error("Error checking admin status:", error);
        return { isAdmin: false }; // Or handle the error as needed
    }
};

export default api;