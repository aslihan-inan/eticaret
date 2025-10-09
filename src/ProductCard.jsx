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
      className="cursor-pointer border rounded-lg shadow hover:shadow-lg transition w-full sm:w-[48%] md:w-[32%] lg:w-[23%] mb-6"
    >
      <img
        src={product.imageUrl || product.images?.[0]}
        alt={product.title}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-t-lg"
      />
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-base">{product.title}</h3>
        {product.department && (
          <p className="text-gray-500 text-xs sm:text-sm">{product.department}</p>
        )}
        <p className="text-blue-600 font-bold text-sm sm:text-base mt-1">
          ${product.discountedPrice || product.price}
        </p>

        {/* Sepete Ekle Butonu */}
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-blue-600 text-white py-1 sm:py-2 px-2 sm:px-3 rounded hover:bg-blue-700 transition text-xs sm:text-sm"
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}
