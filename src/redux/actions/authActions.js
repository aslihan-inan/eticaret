// redux/actions/authActions.js
import axios from "axios";

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });

      const response = await axios.post("/api/login", credentials);

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });

      return response.data; // ⚠ Promise döndürdü
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.response?.data });
      throw error; // ⚠ Hata yakalanabilsin
    }
  };
};
