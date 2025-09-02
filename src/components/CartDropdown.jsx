import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CartDropdown() {
  const cart = useSelector(state => state.cart.cart);

  const totalItems = cart.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="relative">
      <button className="flex items-center gap-2">
        <span>Sepetim</span>
        <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">{totalItems}</span>
      </button>

      {cart.length > 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border rounded-md z-50">
          <div className="p-4">
            <h4 className="font-bold mb-2">Sepetim ({totalItems} Ürün)</h4>
            <div className="divide-y">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center gap-3 py-2">
                  <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded"/>
                  <div className="flex-1">
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm">Beden: {item.product.size || "Tek Ebat"} Adet: {item.count}</p>
                    <p className="text-orange-500">{item.product.price} TL</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Link to="/cart" className="bg-gray-200 px-4 py-2 rounded">Sepete Git</Link>
              <Link to="/checkout" className="bg-orange-500 text-white px-4 py-2 rounded">Siparişi Tamamla</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
