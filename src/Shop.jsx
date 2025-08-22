import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "./redux/actions/productActions";

export default function Shop() {
  const { gender, categoryName, categoryId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      dispatch(fetchProductsByCategory(categoryId)).then(() => setLoading(false));
    }
  }, [dispatch, categoryId]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{gender} / {categoryName}</h1>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => (
            <div key={p.id} className="border p-2 rounded shadow hover:shadow-lg">
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover mb-2"/>
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-gray-600">{p.price} ₺</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
