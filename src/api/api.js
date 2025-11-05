import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";

const api = axios.create({
  baseURL: "https://eticaret-backend.onrender.com/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default api;
