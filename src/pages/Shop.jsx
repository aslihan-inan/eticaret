// src/pages/Shop.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Logo from "../Logo";
import ShopSection from "../ShopSection";
import X from "../assets/work.jpg";
import FilterBar from "../FilterBar";

export default function Shop() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 12;

  // API'den ürünleri çekme fonksiyonu
  const fetchProductsFromAPI = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (categoryId) params.append('category', categoryId);
      if (filter) params.append('filter', filter);
      if (sort) params.append('sort', sort);
      params.append('page', page);
      params.append('limit', limit);

      const response = await fetch(`http://localhost:3001/api/products?${params}`);
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(page); // Sayfa değiştiğinde currentPage'i güncelle
        return true;
      }
    } catch (err) {
      console.error("API error:", err);
    }
    return false;
  };

  // Mevcut test ürünleri fonksiyonu
  const getTestProducts = (page = 1) => {
    let filtered = [...Array.from({ length: 36 }, (_, i) => ({
      id: i + 1,
      title: `Graphic Design ${i + 1}`,
      department: "English Department",
      originalPrice: 16.48,
      discountedPrice: 6.48,
      rating: Math.floor(Math.random() * 5) + 1,
      imageUrl: X,
    }))];

    if (categoryId) {
      filtered = filtered.filter((p) => p.department === categoryId);
    }

    if (filter) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (sort === "price:asc") filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
    if (sort === "price:desc") filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
    if (sort === "rating:asc") filtered.sort((a, b) => a.rating - b.rating);
    if (sort === "rating:desc") filtered.sort((a, b) => b.rating - a.rating);

    const offset = (page - 1) * limit;
    const paginatedProducts = filtered.slice(offset, offset + limit);

    setProducts(paginatedProducts);
    setTotalPages(Math.ceil(filtered.length / limit));
    setCurrentPage(page); // Sayfa değiştiğinde currentPage'i güncelle
    setLoading(false);
  };

  const fetchProducts = async (page = 1) => {
    const apiSuccess = await fetchProductsFromAPI(page);
    
    if (!apiSuccess) {
      console.log("API bağlantısı başarısız, test verileri kullanılıyor");
      getTestProducts(page);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, [categoryId, filter, sort]);

  const renderPageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Eğer görünen sayfa sayısı azsa, başlangıcı ayarla
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 border rounded transition-colors ${
            currentPage === i 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
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
    <section className="bg-white font-sans py-12 px-4 flex justify-center">
      <div className="max-w-[1115px] w-full">
        <ShopSection />
        <div className="mt-[100px]">
          <FilterBar setFilter={setFilter} setSort={setSort} />
        </div>

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

        {/* Pagination - Düzeltilmiş */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
            {/* First Button */}
            <button
              className={`px-3 py-1 border rounded transition-colors ${
                currentPage === 1 
                  ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => fetchProducts(1)}
              disabled={currentPage === 1}
            >
              First
            </button>

         

            {/* Page Numbers */}
            {renderPageNumbers()}

            {/* Next Button */}
            <button
              className={`px-3 py-1 border rounded transition-colors ${
                currentPage === totalPages 
                  ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
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