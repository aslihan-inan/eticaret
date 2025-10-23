// src/api/api.js
import axios from "axios";

// Ortama göre baseURL
const BASE_URL = import.meta.env.VITE_API_URL || "https://eticaret-backend.onrender.com/api";


const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Global hata yakalama
api.interceptors.response.use(
  response => response,
  error => {
    // Network hatası veya server yanıtı yoksa
    if (!error.response) {
      console.error("API HATASI: Sunucuya bağlanılamadı veya network hatası");
    } else {
      console.error("API HATASI:", error.response.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
