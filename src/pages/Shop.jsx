import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilter,
  setSort,
  setPage,
} from "../store/productSlice";
import ProductCard from "../components/ProductCard.jsx";


export default function Shop() {
  const dispatch = useDispatch();
  const { products, loading, total, page, limit, filter, sort } = useSelector(
    (state) => state.products
  );

  // API çağrısı sayfa, filtre veya sort değişince
  useEffect(() => {
    dispatch(fetchProducts({ limit, offset: (page - 1) * limit, filter, sort }));
  }, [dispatch, page, filter, sort, limit]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      {/* Filtre ve Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="border px-3 py-2 rounded w-full sm:w-auto"
        />
        <select
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          className="border px-3 py-2 rounded w-full sm:w-auto"
        >
          <option value="">Sort By</option>
          <option value="price:asc">Price Asc</option>
          <option value="price:desc">Price Desc</option>
          <option value="rating:asc">Rating Asc</option>
          <option value="rating:desc">Rating Desc</option>
        </select>
      </div>

      {/* Ürünler */}
      {loading ? (
        <p className="text-center my-4">Yükleniyor...</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => dispatch(setPage(num))}
                className={`px-3 py-1 rounded ${
                  num === page ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
