// src/pages/Signup.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom"; // v5
import api from "../api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("Customer");
  const history = useHistory();

  const watchPassword = watch("password");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");
        setRoles(res.data);
        const customerRole = res.data.find(r => r.name === "Customer");
        if (customerRole) setValue("role_id", customerRole.id);
      } catch (err) {
        console.error("Roles fetch failed:", err);
      }
    };
    fetchRoles();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await api.post("/signup", data);
      toast.success("You need to click link in email to activate your account!");
      history.goBack(); // önceki sayfaya dön
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true, minLength: 3 })}
          className="border p-2 rounded"
        />
        {errors.name && <span className="text-red-500 text-sm">Name must be at least 3 characters</span>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          className="border p-2 rounded"
        />
        {errors.email && <span className="text-red-500 text-sm">Invalid email</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { 
            required: true, 
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/ 
          })}
          className="border p-2 rounded"
        />
        {errors.password && <span className="text-red-500 text-sm">
          Password must be 8+ chars including upper, lower, number & special char
        </span>}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirm_password", { 
            required: true,
            validate: value => value === watchPassword
          })}
          className="border p-2 rounded"
        />
        {errors.confirm_password && <span className="text-red-500 text-sm">Passwords do not match</span>}

        <select
          {...register("role_id", { required: true })}
          onChange={e => setSelectedRole(e.target.value)}
          className="border p-2 rounded"
        >
          {roles.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>

        {selectedRole.toLowerCase() === "store" && (
          <>
            <input
              type="text"
              placeholder="Store Name"
              {...register("store.name", { required: true, minLength: 3 })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Store Phone"
              {...register("store.phone", { 
                required: true, 
                pattern: /^(\+90|0)?5\d{9}$/ 
              })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Store Tax ID"
              {...register("store.tax_no", { 
                required: true, 
                pattern: /^T\d{4}V\d{6}$/ 
              })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Store Bank Account (IBAN)"
              {...register("store.bank_account", { required: true })}
              className="border p-2 rounded"
            />
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 flex justify-center items-center"
        >
          {isSubmitting ? <span className="loader mr-2"></span> : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
