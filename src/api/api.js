import axios from 'axios';

// Backend URL’ini ortam değişkenine göre ayarlıyoruz
// LOCAL geliştirme -> proxy üzerinden /api
// PROD -> canlı backend URL’i
const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || '/api'; // .env’de VITE_BACKEND_URL tanımlıysa kullan, yoksa proxy

const api = axios.create({
  baseURL: "https://eticaret-1-h4gn.onrender.com/api/products?page=1&limit=12", // canlı backend URL
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});


// Ürünleri çekme fonksiyonu
export const fetchProducts = async (page = 1, limit = 12) => {
  try {
    const response = await api.get('/products', { params: { page, limit } });
    return response.data;
  } catch (error) {
    console.error('API Hatası:', error.message || error);
    return getMockProducts(page, limit);
  }
};

// Mock ürünler (backend çalışmadığında)
const getMockProducts = (page = 1, limit = 12) => ({
  products: [
    { id: 1, name: "Demo Ürün 1", price: 99.99, image: "/images/placeholder.png", category: "elektronik" },
    { id: 2, name: "Demo Ürün 2", price: 149.99, image: "/images/placeholder.png", category: "giyim" },
    { id: 3, name: "Demo Ürün 3", price: 79.99, image: "/images/placeholder.png", category: "ev" },
  ],
  totalPages: 1,
  currentPage: page,
});

export default api;
