import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";

export default function ProductCard({ product }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    history.push(`/detail/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // kartın üstüne tıklayınca detail'e gitmesin
    dispatch(addToCart(product));
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition"
    >
      <img
        src={product.imageUrl || product.images?.[0]}
        alt={product.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="font-semibold">{product.title}</h3>
        {product.department && <p className="text-gray-500">{product.department}</p>}
        <p className="text-blue-600 font-bold">
          ${product.discountedPrice || product.price}
        </p>

        {/* Sepete Ekle Butonu */}
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}
