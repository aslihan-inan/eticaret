import React from "react";
import X from "./assets/work.jpg";

// 12 ürün sahte olarak oluşturuluyor
const products = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "Graphic Design",
  department: "English Department",
  originalPrice: "$16.48",
  discountedPrice: "$6.48",
  imageUrl: X,
}));

export default function Best() {
  return (
    <section className="bg-white font-sans py-12 px-4 flex justify-center">
      <div className="max-w-[1115px] w-full">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="flex flex-col bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Ürün görseli */}
              <div className="w-full aspect-[239/300] overflow-hidden">
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
                    {product.originalPrice}
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {product.discountedPrice}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
