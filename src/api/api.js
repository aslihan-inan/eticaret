import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // backend adresi
  headers: {
    "Content-Type": "application/json",
  },
});

// Token varsa her isteğe ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
