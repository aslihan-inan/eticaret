// src/components/OrderSummary.jsx
import React from "react";
import { useHistory } from "react-router-dom"; // v5 uyumlu

export default function OrderSummary({ totalAmount, shipping = 29.99, discount = 29.99 }) {
  const history = useHistory(); // v5 uyumlu

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/create-order"); // login varsa create-order
    } else {
      history.push("/login"); // login yoksa login sayfası
    }
  };

  const grandTotal = totalAmount + shipping - discount;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md mx-auto md:mx-0 md:w-full">
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
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-gray-800">
          <span>Toplam</span>
          <span>{grandTotal.toFixed(2)} TL</span>
        </div>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="İndirim Kodu Gir"
          className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>

      <button
        onClick={handleCheckout}
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition"
      >
        Sepeti Onayla
      </button>

      <button
        type="button"
        className="w-full border border-gray-300 rounded-lg py-2 mt-3 text-sm hover:bg-gray-100 transition"
        onClick={() => history.push("/create-order")}
      >
        Create Order
      </button>
    </div>
  );
}
