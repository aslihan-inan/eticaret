import axios from 'axios';

const api = axios.create({
  baseURL: '/api',          // Artık Vercel backend’e gidiyor
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchProducts = async (page = 1, limit = 12) => {
  try {
    const response = await api.get('/products', { params: { page, limit } });
    return response.data;
  } catch (error) {
    console.error('API Hatası:', error);
    return getMockProducts(page, limit);
  }
};

const getMockProducts = (page = 1, limit = 12) => ({
  products: [
    { id: 1, name: "Demo Ürün 1", price: 99.99, image: "/images/placeholder.jpg", category: "elektronik" },
    { id: 2, name: "Demo Ürün 2", price: 149.99, image: "/images/placeholder.jpg", category: "giyim" },
    { id: 3, name: "Demo Ürün 3", price: 79.99, image: "/images/placeholder.jpg", category: "ev" },
  ],
  totalPages: 1,
  currentPage: page,
});

export default api;
