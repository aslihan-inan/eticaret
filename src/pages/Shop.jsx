// src/pages/Shop.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Logo from "../Logo";
import ShopSection from "../ShopSection";
import X from "../assets/work.jpg";
import FilterBar from "../FilterBar";
import api from "../utils/api"; // axios instance

export default function Shop() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const limit = 12;

  // --- API'den ürünleri çekme ---
  const fetchProductsFromAPI = async (page = 1, limit = 12) => {
    try {
      const response = await api.get(`/products`, {
        params: { page, limit }
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('API HATASI:', error);
      setError('Sunucuya bağlanılamadı. Demo veriler gösteriliyor.');
      return {
        success: false,
        data: getMockProducts(page, limit)
      };
    }
  };

  // --- Mock data fonksiyonu ---
  const getMockProducts = (page, limit) => {
    const mockProducts = [
      { 
        id: 1, 
        name: "Test Ürün 1", 
        price: 100, 
        image: "/images/placeholder.jpg",
        title: "Graphic Design 1",
        department: "English Department",
        originalPrice: 16.48,
        discountedPrice: 6.48,
        rating: 4,
        imageUrl: X
      },
      { 
        id: 2, 
        name: "Test Ürün 2", 
        price: 200, 
        image: "/images/placeholder.jpg",
        title: "Graphic Design 2",
        department: "Design Department", 

        originalPrice: 24.99,
        discountedPrice: 12.99,
        rating: 5,
        imageUrl: X
      },
      { 
        id: 3, 
        name: "Test Ürün 3", 
        price: 150, 
        image: "/images/placeholder.jpg",
        title: "Web Design Kit",
        department: "English Department",
        originalPrice: 32.99,
        discountedPrice: 19.99,
        rating: 3,
        imageUrl: X
      },
      { 
        id: 4, 
        name: "Test Ürün 4", 
        price: 75, 
        image: "/images/placeholder.jpg",
        title: "Marketing Materials",
        department: "Marketing Department",
        originalPrice: 18.50,
        discountedPrice: 9.99,
        rating: 4,
        imageUrl: X
      }
    ];
    
    return {
      products: mockProducts,
      totalPages: 1,
      currentPage: page
    };
  };

  // --- Fallback test verisi ---
  const getTestProducts = (page = 1) => {
    let items = Array.from({ length: 36 }, (_, i) => ({
      id: i + 1,
      title: `Graphic Design ${i + 1}`,
      department: i % 3 === 0 ? "English Department" : i % 3 === 1 ? "Design Department" : "Marketing Department",
      originalPrice: (Math.random() * 50 + 10).toFixed(2),
      discountedPrice: (Math.random() * 30 + 5).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
      imageUrl: X,
      name: `Product ${i + 1}`,
      price: (Math.random() * 200 + 50)
    }));

    // Kategori filtreleme
    if (categoryId) {
      items = items.filter((p) => p.department.toLowerCase().includes(categoryId.toLowerCase()));
    }

    // Arama filtreleme
    if (filter) {
      items = items.filter((p) =>
        p.title.toLowerCase().includes(filter.toLowerCase()) ||
        p.department.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Sıralama
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
    setLoading(true);
    setError(null);
    
    try {
    const result = await fetchProductsFromAPI(page, limit);
if (result.success) {
  setProducts(result.data.products);
} else {
  setProducts(result.data.products);
  setError(result.errorMessage); // React state burada kullanılabilir
}

    } catch (err) {
      console.error('Fetch hatası:', err);
      // Test verilerine fallback
      getTestProducts(page);
    } finally {
      setLoading(false);
    }
  };

  // --- Sayfa veya filtre değiştiğinde ürünleri çek ---
  useEffect(() => {
    fetchProducts(1);
  }, [categoryId, filter, sort]);

  // --- Sayfa değişikliğinde ---
  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage);
    }
  }, [currentPage]);

  const goToDetail = (id) => {
    navigate(`/detail/${id}`);
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
                  className={`px-3 py-1 border rounded transition-colors ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  İlk
                </button>
                
                <button
                  className={`px-3 py-1 border rounded transition-colors ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Önceki
                </button>

                {renderPageNumbers()}

                <button
                  className={`px-3 py-1 border rounded transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Sonraki
                </button>

                <button
                  className={`px-3 py-1 border rounded transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
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