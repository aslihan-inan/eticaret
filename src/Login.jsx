// src/pages/Login.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import api from "./api/axiosInstance.js";
import { login as loginAction } from "./redux/slices/authSlice.js";

export default function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const history = useHistory();
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password
      });

      dispatch(loginAction({
        token: res.data.token,
        user: res.data.user
      }));

      toast.success("Giriş başarılı!");
      const redirect = location.state?.from?.pathname || "/";
      history.push(redirect);
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      const msg = err.response?.data?.message || "Giriş başarısız!";
      toast.error(msg);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 border p-4 rounded-lg shadow"
      >
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email gerekli" })}
          className="border p-2 w-full rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Şifre"
          {...register("password", { required: "Şifre gerekli" })}
          className="border p-2 w-full rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded text-white ${isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
