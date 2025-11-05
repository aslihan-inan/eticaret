import axios from 'axios';

// --- Ortam durumuna göre backend URL belirleme ---
// VITE_BACKEND_URL .env dosyanda varsa onu kullanır (canlı ortam)
// Yoksa (örneğin local geliştirmede) proxy ile /api'ye yönlendirir
const BASE_URL = import.meta.env.VITE_BACKEND_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});


// --- Ürünleri API'den çekme ---
export const fetchProductsFromAPI = async (page = 1, limit = 12) => {
  try {
    const response = await api.get(`/products`, { params: { page, limit } });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API HATASI:', error);
    return { 
      success: false, 
      data: getMockProducts(page, limit),
      errorMessage: 'Sunucuya bağlanılamadı. Demo veriler gösteriliyor.'
    };
  }
};

// --- Demo ürünler ---
const getMockProducts = (page = 1, limit = 12) => ({
  products: [
    { id: 1, name: "Demo Ürün 1", price: 99.99, image: "/placeholder.png", category: "elektronik" },
    { id: 2, name: "Demo Ürün 2", price: 149.99, image: "/placeholder.png", category: "giyim" },
    { id: 3, name: "Demo Ürün 3", price: 79.99, image: "/placeholder.png", category: "ev" },
  ],
  totalPages: 1,
  currentPage: page,
});

export default api;
