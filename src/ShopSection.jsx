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
    <div className="container mx-auto w-[1088px] h-[223px] py-1 mb-25  ">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <span className="text-gray-900">Home</span> &gt; <span>Shop</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-3 ">Shop</h1>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-3 flex justify-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className=" w-[205px] h-[223px] opacity-100 p-4 text-center flex flex-col items-center mx-auto flex justify-center"
          >
            <img
              src={category.imageUrl}
              alt="category"
              className="w-full w-[205px] h-[223px] mb-4 object-cover"
            />
    
          </div>
        ))}
      </div>

      {/* Results and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center  gap-4 ">
        <p className="text-gray-700">Showing all 12 results</p>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Views:</span>
            <div className="flex gap-1 flex-wrap">
              {[...Array(3)].map((_, i) => (
                <button key={i} className="px-2 py-1 border hover:bg-gray-100">
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-700">Sort by:</span>
            <select className="border p-1 rounded">
              <option>Popularity ▼</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Button for Mobile */}
      <button className="md:hidden bg-gray-200 px-4 py-2 rounded mb-4 w-full">
        Filter
      </button>
    </div>
  );
};

export default ShopSection;
