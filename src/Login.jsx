import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "./redux/actions/authActions";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(
        { email: data.email, password: data.password },
        data.remember
      ));
      toast.success("Giriş başarılı!");
      history.push("/");
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" {...register("email", { required: true })} className="border p-2 rounded"/>
        <input type="password" placeholder="Password" {...register("password", { required: true })} className="border p-2 rounded"/>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("remember")} /> Remember Me
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
