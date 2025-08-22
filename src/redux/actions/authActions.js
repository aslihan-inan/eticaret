// src/redux/actions/authActions.js
import { setUser } from "../reducers/clientReducer";
import api, { setToken } from '../../api/axiosInstance';


// App load token check
export const checkToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  setToken(token); // axios header'a token ekle
  try {
    const res = await api.get("/verify"); // token doğrulama
    dispatch(setUser(res.data)); // user bilgilerini redux’a koy
    localStorage.setItem("token", res.data.token); // token yenilenebilir
    setToken(res.data.token); // header'ı güncelle
  } catch (err) {
    localStorage.removeItem("token");
    setToken(null); // header'dan token sil
  }
};

// Login action
export const loginUser = (credentials, remember) => async (dispatch) => {
  try {
    const res = await api.post("/login", credentials);
    const { token, user } = res.data;
    dispatch(setUser(user));

    if (remember) {
      localStorage.setItem("token", token);
    }
    setToken(token); // axios header'a ekle
  } catch (err) {
    console.error(err);
    throw err;
  }
};
