import React from "react";
import X from "../assets/work.jpg";

// Tek ürün kartı bileşeni
function ProductCard({ product }) {
  return (
    <article className="flex flex-col bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full sm:w-56 md:w-60 lg:w-64 mx-auto">
      {/* Ürün görseli */}
      <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Ürün bilgileri */}
      <div className="p-4 flex flex-col flex-grow justify-between text-center">
        <div>
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            {product.title}
          </h4>
          <p className="text-sm sm:text-base text-gray-600">
            {product.department}
          </p>
        </div>

        {/* Fiyat bilgisi */}
        <div className="flex justify-center gap-2 mt-4">
          <span className="text-sm text-gray-400 line-through">
            ${product.originalPrice?.toFixed(2) ?? "16.48"}
          </span>
          <span className="text-sm font-bold text-blue-600">
            ${product.discountedPrice?.toFixed(2) ?? "6.48"}
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
