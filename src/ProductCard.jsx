import React from "react";
import { useHistory } from "react-router-dom";

export default function ProductCard({ product }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/detail/${product.id}`);
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
      </div>
    </div>
  );
}
