import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartReducer";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="border rounded p-2 w-full sm:w-56 md:w-60 lg:w-64 mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 sm:h-56 md:h-60 object-cover rounded"
      />
      <h3 className="font-bold mt-2 text-center sm:text-left">{product.name}</h3>
      <p className="text-orange-500 text-center sm:text-left">{product.price} TL</p>
      <button
        onClick={handleAddToCart}
        className="mt-2 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
      >
        Sepete Ekle
      </button>
    </div>
  );
}
