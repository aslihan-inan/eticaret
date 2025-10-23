// /api/products.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { page = 1, limit = 12 } = req.query;
    const apiUrl = `https://eticaret-backend.onrender.com/api/products?page=${page}&limit=${limit}`;
    const response = await axios.get(apiUrl);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Proxy Hatası:', error.message);
    res.status(500).json({ error: 'API isteği başarısız oldu.' });
  }
}
