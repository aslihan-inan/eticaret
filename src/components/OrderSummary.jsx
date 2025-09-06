// src/components/OrderSummary.jsx
import React from "react";
import { useHistory } from "react-router-dom"; // 🔹 useHistory import

export default function OrderSummary({ totalAmount, shipping = 29.99, discount = 29.99 }) {
  const history = useHistory(); // 🔹 history hook

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (token) {
      console.log("Navigate to create-order");
      history.push("/create-order"); // login varsa create-order sayfasına
    } else {
      console.log("Navigate to login");
      history.push("/login"); // login yoksa login sayfasına
    }
  };

  const grandTotal = totalAmount + shipping - discount;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md h-fit">
      <h2 className="font-semibold text-lg mb-4">Sipariş Özeti</h2>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Ürünler Toplamı</span>
          <span>{totalAmount.toFixed(2)} TL</span>
        </div>
        <div className="flex justify-between">
          <span>Kargo Toplamı</span>
          <span>{shipping.toFixed(2)} TL</span>
        </div>
        <div className="flex justify-between">
          <span>İndirim</span>
          <span>-{discount.toFixed(2)} TL</span>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-gray-800">
          <span>Toplam</span>
          <span>{grandTotal.toFixed(2)} TL</span>
        </div>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="İndirim Kodu Gir"
          className="w-full border rounded p-2 text-sm"
        />
      </div>

      <button
        onClick={handleCheckout}
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600"
      >
        Sepeti Onayla
      </button>

      <button
        type="button"
        className="w-full border border-gray-300 rounded-lg py-2 mt-3 text-sm hover:bg-gray-100"
      >
        Create Order
      </button>
    </div>
  );
}
