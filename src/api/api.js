// src/api/api.js
import axios from "axios";

// Ortama göre baseURL
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true, // cookie veya session için
  headers: {
    "Content-Type": "application/json",
  },
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
