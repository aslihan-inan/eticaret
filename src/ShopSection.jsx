import React from "react";
import ClothImage from "./assets/cloth.png"; 

const ShopSection = () => {
  const categories = [
    { items: 5, imageUrl: ClothImage },
    { items: 5, imageUrl: ClothImage },
    { items: 5, imageUrl: ClothImage },
    { items: 5, imageUrl: ClothImage },
    { items: 5, imageUrl: ClothImage },
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <span className="text-gray-900">Home</span> &gt; <span>Shop</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Shop</h1>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded shadow hover:shadow-md transition p-2"
          >
            <img
              src={category.imageUrl}
              alt="category"
              className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover rounded"
            />
            <span className="mt-2 text-gray-700 font-medium">
              {category.items} items
            </span>
          </div>
        ))}
      </div>

      {/* Filter Button for Mobile */}
      <button className="md:hidden bg-gray-200 px-4 py-2 rounded w-full text-gray-700 font-medium">
        Filter
      </button>
    </div>
  );
};

export default ShopSection;
