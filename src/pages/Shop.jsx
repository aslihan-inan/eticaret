// src/pages/Shop.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Logo from "../Logo";
import ShopSection from "../ShopSection";
import X from "../assets/work.jpg"; // görsel importu
import FilterBar from "../FilterBar";
import Pagination  from "../Pagination";

export default function Shop() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  // Test için sabit ürünler
  const testProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Graphic Design ${i + 1}`,
    department: "English Department",
    originalPrice: 16.48,
    discountedPrice: 6.48,
    rating: Math.floor(Math.random() * 5) + 1,
    imageUrl: X,
  }));

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Eğer backend çalışıyorsa burayı açabilirsin:
      /*
      const params = new URLSearchParams();
      if (categoryId) params.append("category", categoryId);
      if (filter) params.append("filter", filter);
      if (sort) params.append("sort", sort);

      const res = await axios.get(`http://localhost:5000/products?${params.toString()}`);
      setProducts(res.data.products || []);
      */

      // --- Test verisiyle filtreleme/sıralama ---
      let filtered = [...testProducts];

      // filtreleme
      if (filter) {
        filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(filter.toLowerCase())
        );
      }

      // sıralama
      if (sort === "price:asc") filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
      if (sort === "price:desc") filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
      if (sort === "rating:asc") filtered.sort((a, b) => a.rating - b.rating);
      if (sort === "rating:desc") filtered.sort((a, b) => b.rating - a.rating);

      setProducts(filtered);
    } catch (err) {
      console.error("API error:", err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId, filter, sort]);

  return (
    <section className="bg-white font-sans py-12 px-4 flex justify-center">
      <div className="max-w-[1115px] w-full">
        <ShopSection />
        <div className="mt-[100px]">
        <FilterBar />
        </div>

        {/* Ürünler */}
        {loading ? (
          <p className="text-center my-4">Yükleniyor...</p>
        ) : products.length === 0 ? (
          <p className="text-center my-4">Ürün bulunamadı.</p>
        ) : (
          <section className="max-w-[1440px] mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        )}
        < Pagination />
        <Logo />
      </div>
    </section>
  );
}
