// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/'; // Remplacez par votre URL Django

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Pour gérer les fichiers (images)
const apiFormData = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const registerUser = async (userData) => {
  try {
    // Si on a des fichiers, on utilise apiFormData
    if (userData.photo_profil || userData.medical_license) {
      const formData = new FormData();
      
      // Ajoutez tous les champs au FormData
      for (const key in userData) {
        if (userData[key] !== null && userData[key] !== undefined) {
          formData.append(key, userData[key]);
        }
      }

      const response = await apiFormData.post('/auth/register/', formData);
      return response.data;
    } else {
      const response = await api.post('/auth/register/', userData);
      return response.data;
    }
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await api.get(`/auth/check-email/?email=${email}`);
    return response.data.exists;
  } catch (error) {
    console.error('Email check error:', error);
    return false;
  }
};