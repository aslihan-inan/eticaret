import productsData from "../../data/sampleProducts.json";

export const fetchProductsByCategory = (categoryId) => async (dispatch) => {
  await new Promise(res => setTimeout(res, 300));
  const filtered = productsData.filter(p => p.categoryId === Number(categoryId));
  dispatch({ type: "SET_PRODUCTS", payload: filtered });
};
