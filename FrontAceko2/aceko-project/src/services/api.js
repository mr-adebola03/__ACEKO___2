import axios from 'axios';

const API_URL = 'https://aceko.onrender.com/'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  },
});

export const getPatients = async (stade_mrc = null) => {
  const params = stade_mrc ? { stade_mrc } : {};
  try {
    const response = await api.get('/doc-patient/patients/', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};