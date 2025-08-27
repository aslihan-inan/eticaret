import React from 'react';
import X from './assets/X.jpg';

const products = Array(10).fill({
  title: 'Graphic Design',
  department: 'English Department',
  originalPrice: '$16.48',
  discountedPrice: '$6.48',
  imageUrl: X,
});

export default function Best() {
  return (
    <section className="bg-white font-sans py-12 px-4 flex justify-center">
      <div className="max-w-[1115px] w-full">

        <header className="text-center mb-12">
          <h3 className="text-sm font-bold text-blue-600 mb-2">Featured Products</h3>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">BESTSELLER PRODUCTS</h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Problems trying to resolve the conflict between
          </p>
        </header>



        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
          {products.map((product, index) => (
            <article
              key={index}
              className="flex flex-col bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-[183px] h-[238px] overflow-hidden">
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

                <div className="flex justify-center gap-2 mt-4">
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                  <span className="text-sm font-bold text-blue-600">{product.discountedPrice}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      

        <div className="text-center mt-12">
          <button
            type="button"
            className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors duration-300"
          >
            LOAD MORE PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
}
