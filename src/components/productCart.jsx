import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartReducer";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="border rounded p-2">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
      <h3 className="font-bold mt-2">{product.name}</h3>
      <p className="text-orange-500">{product.price} TL</p>
      <button 
        onClick={handleAddToCart} 
        className="mt-2 w-full bg-orange-500 text-white py-1 rounded"
      >
        Sepete Ekle
      </button>
    </div>
  );
}
