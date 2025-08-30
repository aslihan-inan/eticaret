import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, gender, categoryName }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = product.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/shop/${gender}/${categoryName}/${product.category_id}/${slug}/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer hover:shadow-lg transition-shadow p-4 border rounded"
    >
      <img src={product.images[0]?.url} alt={product.name} className="w-full h-48 object-cover" />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
    </div>
  );
}
