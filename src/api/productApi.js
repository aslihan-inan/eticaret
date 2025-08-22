import axios from "axios";

export const getProducts = (limit = 25, offset = 0) => {
  return axios.get(`/products?limit=${limit}&offset=${offset}`);
};
