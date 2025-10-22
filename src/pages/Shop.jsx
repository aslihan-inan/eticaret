// src/pages/Shop.jsx
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Logo from "../Logo";
import ShopSection from "../ShopSection";
import FilterBar from "../FilterBar";
import api from "../api/api"; // Axios instance
import X from "../assets/work.jpg";

export default function Shop() {
  const { categoryId } = useParams();
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 12;

  // --- API’den ürünleri çekme ---
  const fetchProductsFromAPI = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (categoryId) params.category = categoryId;
      if (filter) params.filter = filter;
      if (sort) params.sort = sort;

      // Query parametrelerini URL’ye ekle
      const query = new URLSearchParams(params).toString();
      const res = await api.get(`/products?${query}`);
      const data = res.data;

      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(page);
      return true;
    } catch (err) {
      console.error("API error:", err);
      return false; // fallback kullanacak
    } finally {
      setLoading(false);
    }
  };

  // --- Fallback test verisi ---
  const getTestProducts = (page = 1) => {
    let items = Array.from({ length: 36 }, (_, i) => ({
      id: i + 1,
      title: `Graphic Design ${i + 1}`,
      department: i % 2 === 0 ? "English Department" : "Art Department",
      originalPrice: 16.48,
      discountedPrice: 6.48 + (i % 5),
      rating: Math.floor(Math.random() * 5) + 1,
      imageUrl: X,
    }));

    if (categoryId)
      items = items.filter((p) => p.department === categoryId);
    if (filter)
      items = items.filter((p) =>
        p.title.toLowerCase().includes(filter.toLowerCase())
      );

    if (sort === "price:asc") items.sort((a, b) => a.discountedPrice - b.discountedPrice);
    if (sort === "price:desc") items.sort((a, b) => b.discountedPrice - a.discountedPrice);
    if (sort === "rating:asc") items.sort((a, b) => a.rating - b.rating);
    if (sort === "rating:desc") items.sort((a, b) => b.rating - a.rating);

    const offset = (page - 1) * limit;
    const paginated = items.slice(offset, offset + limit);

    setProducts(paginated);
    setTotalPages(Math.ceil(items.length / limit));
    setCurrentPage(page);
    setLoading(false);
  };

  // --- Ortak fetch fonksiyonu ---
  const fetchProducts = async (page = 1) => {
    const success = await fetchProductsFromAPI(page);
    if (!success) {
      console.log("API başarısız, test verileri yüklendi.");
      getTestProducts(page);
    }
  };

  // --- Sayfa veya filtre değiştiğinde ürünleri çek ---
  useEffect(() => {
    fetchProducts(1);
  }, [categoryId, filter, sort]);

  const goToDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  // --- Sayfalama butonları ---
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 border rounded transition-colors ${
            currentPage === i
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => fetchProducts(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <section className="bg-white font-sans py-8 px-4 flex justify-center">
      <div className="max-w-[1115px] w-full">
        <ShopSection />

        <div className="mt-8 mb-4">
          <FilterBar setFilter={setFilter} setSort={setSort} />
        </div>

        {loading ? (
          <p className="text-center my-4">Yükleniyor...</p>
        ) : products.length === 0 ? (
          <p className="text-center my-4">Ürün bulunamadı.</p>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => goToDetail(product.id)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </section>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
            <button
              className={`px-3 py-1 border rounded transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => fetchProducts(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            {renderPageNumbers()}
            <button
              className={`px-3 py-1 border rounded transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => fetchProducts(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        <Logo />
      </div>
    </section>
  );
}
