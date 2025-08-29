import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopSection from "./ShopSection";
import Logo from "./Logo";
import ProductCard from "./ProductCard"; 
import axios from "axios";

export default function Shop() {
  const { categoryId } = useParams(); // URL’den categoryId al
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState(""); // filtre inputu
  const [sort, setSort] = useState("");     // sıralama selecti

  // API çağrısı
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryId) params.append("category", categoryId);
      if (filter) params.append("filter", filter);
      if (sort) params.append("sort", sort);

      const res = await axios.get(`http://localhost:5000/products?${params.toString()}`);
      setProducts(res.data.products);
    } catch (err) {
      console.error("API error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // categoryId, filter veya sort değişirse products yeniden fetch edilir
  useEffect(() => {
    fetchProducts();
  }, [categoryId, filter, sort]);

  return (
    <section className="bg-white font-sans py-12 px-4 flex justify-center">
      <div className="max-w-[1115px] w-full">
        <ShopSection />

        {/* Filtre ve Sort */}
        <div className="flex flex-col sm:flex-row gap-4 my-4 items-center">
          <input
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded w-full sm:w-auto"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-4 my-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Logo />
      </div>
    </section>
  );
}
