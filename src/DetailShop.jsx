
import React from 'react';
import { Link } from "react-router-dom";
import X from './assets/tabak.jpg';



export default function Best({ buttonColor = 'blue', onColorSelect }) {
  const products = Array(8).fill(null).map((_, i) => ({
    id: i + 1,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: '$16.48',
    discountedPrice: '$6.48',
    imageUrl: X,
  }));

  return (
    <div>
        <h1 className="text-lg font-bold flex justify-center">BESTSELLER PRODUCTS</h1>
      <section className="bg-white font-sans  flex justify-center mt-20">
        <div className="max-w-[1115px] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto gap-4">
            {products.map((product) => (
              <Link key={product.id} to={`/detail/${product.id}`}>
                <article className="flex flex-col bg-white overflow-hidden hover:shadow-lg transition-shadow mx-auto duration-500">
                  <div className="w-[239px] h-[280px] overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow justify-between text-center">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{product.title}</h4>
                      <p className="text-sm text-gray-600">{product.department}</p>
                    </div>
                    <div className="flex justify-center gap-2 mt-2">
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      <span className="text-sm font-bold text-blue-600">{product.discountedPrice}</span>
                    </div>
                    <div className="flex justify-center space-x-2 mt-4">
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
