// src/pages/Shop.jsx
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"; // useNavigate yerine useHistory
import ProductCard from "../components/ProductCard";
import Logo from "../Logo";
import ShopSection from "../ShopSection";
import X from "../assets/work.jpg";
import FilterBar from "../FilterBar";
import api from "../utils/api"; // axios instance

export default function Shop() {
  const { categoryId } = useParams();
  const history = useHistory(); // v5 uyumlu
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const limit = 12;

  // --- Mock data fonksiyonu ---
  const getMockProducts = (page, limit) => {
    const mockProducts = [
      { id: 1, title: "Graphic Design 1", discountedPrice: 6.48, rating: 4, imageUrl: X, name: "Test Ürün 1", price: 100 },
      { id: 2, title: "Graphic Design 2", discountedPrice: 12.99, rating: 5, imageUrl: X, name: "Test Ürün 2", price: 200 },
      { id: 3, title: "Web Design Kit", discountedPrice: 19.99, rating: 3, imageUrl: X, name: "Test Ürün 3", price: 150 },
      { id: 4, title: "Marketing Materials", discountedPrice: 9.99, rating: 4, imageUrl: X, name: "Test Ürün 4", price: 75 }
    ];
    
    return {
      products: mockProducts,
      totalPages: 1,
      currentPage: page
    };
  };

  // --- API'den ürünleri çekme ---
  const fetchProductsFromAPI = async (page = 1, limit = 12) => {
    try {
      const response = await api.get(`/products`, { params: { page, limit } });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("API HATASI:", error);
      setError("Sunucuya bağlanılamadı. Demo veriler gösteriliyor.");
      return { success: false, data: getMockProducts(page, limit) };
    }
  };

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchProductsFromAPI(page, limit);
      setProducts(result.data.products);
      setTotalPages(result.data.totalPages);
      setCurrentPage(result.data.currentPage);
    } catch (err) {
      console.error("Fetch hatası:", err);
      const mock = getMockProducts(page, limit);
      setProducts(mock.products);
      setTotalPages(mock.totalPages);
      setCurrentPage(mock.currentPage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, [categoryId, filter, sort]);

  useEffect(() => {
    if (currentPage > 1) fetchProducts(currentPage);
  }, [currentPage]);

  const goToDetail = (id) => history.push(`/detail/${id}`);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 border rounded transition-colors ${
            currentPage === i
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setCurrentPage(i)}
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

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center my-8">
            <p className="text-lg">Yükleniyor...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center my-8">
            <p className="text-lg text-gray-600">Bu kriterlere uygun ürün bulunamadı.</p>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => goToDetail(product.id)}
                  className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </section>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded transition-colors ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  İlk
                </button>
                {renderPageNumbers()}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border rounded transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Son
                </button>
              </div>
            )}
          </>
        )}

        <Logo />
      </div>
    </section>
  );
}
