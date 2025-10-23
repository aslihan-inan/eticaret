// src/api/api.js
import axios from "axios";

// Ortama göre baseURL (Vercel frontend ile backend URL’si)
const BASE_URL = import.meta.env.VITE_API_URL || "https://eticaret-backend.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // cookie/session kullanıyorsan
  headers: { "Content-Type": "application/json" },
});

// Global hata yakalama
api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error("API HATASI: Sunucuya bağlanılamadı veya network hatası");
    } else {
      console.error("API HATASI:", error.response.data || error.message);
    }
    return Promise.reject(error);
  }
);
axios.get("/api/products?page=1&limit=12")

export default api;
