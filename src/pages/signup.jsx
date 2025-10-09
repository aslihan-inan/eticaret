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

  // Seçili rol
  const selectedRoleName = () => {
    const role = roles.find(r => r.id === Number(watchRoleId));
    return role?.name || "";
  };

  // Roller fetch
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");
        const rolesArray = Array.isArray(res.data) ? res.data : [];

        let filteredRoles = rolesArray.filter(r => ["Customer", "Admin", "Store"].includes(r.name));

        // Admin yoksa manuel ekle
        if (!filteredRoles.some(r => r.name === "Admin")) {
          filteredRoles.push({ id: 999, name: "Admin" });
        }

        setRoles(filteredRoles);

        // Default role Customer
        const customerRole = filteredRoles.find(r => r.name === "Customer");
        if (customerRole) setValue("role_id", customerRole.id);
      } catch (err) {
        console.error("Roles fetch failed:", err);
        toast.error("Roller yüklenirken hata oluştu");
        setRoles([
          { id: 1, name: "Customer" },
          { id: 2, name: "Store" },
          { id: 999, name: "Admin" }
        ]);
      }
    };
    fetchRoles();
  }, [setValue]);

  // ------------------------
  // onSubmit: Backend ile uyumlu
  // ------------------------
  const onSubmit = async (data) => {
    console.log("Submitting signup data:", data); // Frontend log
    try {
      // confirm_password backend’e gönderilmeyecek
      delete data.confirm_password;

      // role_id sayıya çevir
      data.role_id = Number(data.role_id);

      // store alanlarını sadece Store seçildiyse gönder
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
      } else {
        data.store = null;
      }

      const res = await api.post("/signup", data);
      console.log("Signup response:", res.data); // Backend response log
      toast.success("Kayıt başarılı! E-posta ile aktivasyon linkine tıklayın.");
      history.push("/login");
    } catch (err) {
      console.error("Signup error frontend:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <Toaster position="top-right" />
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true, minLength: 3 })}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <span className="text-red-500 text-sm">Name must be at least 3 characters</span>}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && <span className="text-red-500 text-sm">
            Password must be 8+ chars including upper, lower, number & special char
          </span>}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirm_password", { required: true, validate: value => value === watchPassword })}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.confirm_password && <span className="text-red-500 text-sm">Passwords do not match</span>}

          {/* Role */}
          <select
            {...register("role_id", { required: true })}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>

          {/* Store fields */}
          {selectedRoleName() === "Store" && (
            <div className="flex flex-col gap-3 mt-2">
              <input type="text" placeholder="Store Name" {...register("store.name", { required: true, minLength: 3 })} className="border p-3 rounded" />
              <input type="text" placeholder="Store Phone (+905xxxxxxxxx)" {...register("store.phone", { required: true, pattern: /^\+90\d{10}$/ })} className="border p-3 rounded" />
              <input type="text" placeholder="Store Tax ID (TXXXXVXXXXXX)" {...register("store.tax_no", { required: true, pattern: /^T\d{4}V\d{6}$/ })} className="border p-3 rounded" />
              <input type="text" placeholder="Store Bank Account (IBAN)" {...register("store.bank_account", { required: true })} className="border p-3 rounded" />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white p-3 rounded mt-2 disabled:opacity-50 hover:bg-blue-600 transition"
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
