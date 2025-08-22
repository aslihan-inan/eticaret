import categoriesData from "../../data/sampleCategories.json";

export const fetchCategories = () => async (dispatch) => {
  await new Promise(res => setTimeout(res, 500));
  dispatch({ type: "SET_CATEGORIES", payload: categoriesData });
};
