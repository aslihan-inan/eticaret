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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email gerekli" })}
              className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Şifre"
              {...register("password", { required: "Şifre gerekli" })}
              className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded text-white font-medium transition-colors duration-300 ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
