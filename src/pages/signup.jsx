import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api from "../api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm();
  const [roles, setRoles] = useState([]);
  const history = useHistory();

  const watchPassword = watch("password");
  const watchRoleId = watch("role_id");

  // Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");
        const rolesArray = Array.isArray(res.data) ? res.data : [];
        setRoles(rolesArray);

        const customerRole = rolesArray.find(r => r.name === "Customer");
        if (customerRole) setValue("role_id", customerRole.id);
      } catch (err) {
        console.error("Roles fetch failed:", err);
        toast.error("Roles yüklenirken hata oluştu");
        setRoles([]);
      }
    };
    fetchRoles();
  }, [setValue]);

  const selectedRoleName = () => {
    const role = roles.find(r => r.id === Number(watchRoleId));
    return role?.name || "";
  };

  const onSubmit = async (data) => {
    try {
      delete data.confirm_password;

      if (selectedRoleName() === "Store") {
        data.store = {
          name: data["store.name"],
          phone: data["store.phone"],
          tax_no: data["store.tax_no"],
          bank_account: data["store.bank_account"]
        };
        delete data["store.name"];
        delete data["store.phone"];
        delete data["store.tax_no"];
        delete data["store.bank_account"];
      }

      await api.post("/signup", data);
      toast.success("Kayıt başarılı! E-posta ile aktivasyon linkine tıklayın.");
      history.goBack();
    } catch (err) {
      console.error("Signup error:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true, minLength: 3 })}
          className="border p-2 rounded"
        />
        {errors.name && <span className="text-red-500 text-sm">Name must be at least 3 characters</span>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          className="border p-2 rounded"
        />
        {errors.email && <span className="text-red-500 text-sm">Invalid email</span>}

        {/* Password */}
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

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirm_password", { required: true, validate: value => value === watchPassword })}
          className="border p-2 rounded"
        />
        {errors.confirm_password && <span className="text-red-500 text-sm">Passwords do not match</span>}

        {/* Role */}
        <select {...register("role_id", { required: true })} className="border p-2 rounded">
          {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
        </select>

        {/* Store fields */}
        {selectedRoleName() === "Store" && (
          <>
            <input type="text" placeholder="Store Name" {...register("store.name", { required: true, minLength: 3 })} className="border p-2 rounded" />
            <input type="text" placeholder="Store Phone (+905xxxxxxxxx)" {...register("store.phone", { required: true, pattern: /^\+90\d{10}$/ })} className="border p-2 rounded" />
            <input type="text" placeholder="Store Tax ID (TXXXXVXXXXXX)" {...register("store.tax_no", { required: true, pattern: /^T\d{4}V\d{6}$/ })} className="border p-2 rounded" />
            <input type="text" placeholder="Store Bank Account (IBAN)" {...register("store.bank_account", { required: true })} className="border p-2 rounded" />
          </>
        )}

        <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white p-2 rounded disabled:opacity-50">
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
