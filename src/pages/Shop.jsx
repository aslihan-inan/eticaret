// src/pages/Shop.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";

export default function Shop() {
  const dispatch = useDispatch();
  const { products, loading, total } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="loader border-4 border-blue-500 border-dashed rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Toplam Ürün: {total}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-gray-500">{product.price}₺</p>
          </div>
        ))}
      </div>
    </div>
  );
}
