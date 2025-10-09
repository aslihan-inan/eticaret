import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CartDropdown() {
  const cart = useSelector((state) => state.cart.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.count, 0);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 border rounded hover:bg-gray-100 transition"
      >
        <span className="hidden sm:inline">Sepetim</span>
        <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
          {totalItems}
        </span>
      </button>

      {isOpen && cart.length > 0 && (
        <div className="absolute right-0 mt-2 w-full sm:w-80 bg-white shadow-lg border rounded-md z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            <h4 className="font-bold mb-2 text-sm sm:text-base">
              Sepetim ({totalItems} Ürün)
            </h4>

            <div className="divide-y">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 py-2 text-xs sm:text-sm"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold truncate">{item.product.name}</p>
                    <p className="text-gray-500">
                      Beden: {item.product.size || "Tek Ebat"} | Adet: {item.count}
                    </p>
                    <p className="text-orange-500 font-semibold">{item.product.price} TL</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
              <Link
                to="/cart"
                className="w-full sm:w-auto text-center bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Sepete Git
              </Link>
              <Link
                to="/checkout"
                className="w-full sm:w-auto text-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              >
                Siparişi Tamamla
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
