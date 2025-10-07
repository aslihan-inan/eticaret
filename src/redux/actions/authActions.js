import api from "../../api/api"; 
import { loginSuccess } from "../reducers/authReducer";
import toast from "react-hot-toast";

export const loginUser = (data, remember) => async (dispatch) => {
  try {
    const res = await api.post("/login", data);
    const { token, user } = res.data;

    dispatch(loginSuccess(user, token));

    if (remember) {
      localStorage.setItem("token", token);
    }

    toast.success("Giriş başarılı 🎉");
    return true;
  } catch (err) {
    toast.error("Giriş başarısız. Email veya şifre hatalı.");
    return false;
  }
};
