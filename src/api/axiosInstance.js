// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/roles", // <— backend port ve /api
  headers: { "Content-Type": "application/json" },
});

export const setToken = (token) => {
  if (token) api.defaults.headers.common["Authorization"] = token;
  else delete api.defaults.headers.common["Authorization"];
};

export default api;
