import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
});
axios.get("http://localhost:5000/api/user/card")
export default api;
