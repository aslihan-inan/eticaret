// src/pages/Shop.jsx
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Logo from "../Logo";
import ShopSection from "../ShopSection";
import FilterBar from "../FilterBar";
import api from "../utils/api"; // axios instance
import X from "../assets/work.jpg"; // placeholder görsel

export default function Shop() {
  const { categoryId } = useParams();
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const limit = 12;

  // --- Mock data ---
  const getMockProducts = (page = 1) => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Demo Ürün ${i + 1}`,
      price: (Math.random() * 200 + 50).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
      imageUrl: X,
      department: i % 3 === 0 ? "Elektronik" : i % 3 === 1 ? "Giyim" : "Ev",
    }));

    const offset = (page - 1) * limit;
    const paginated = items.slice(offset, offset + limit);

    return {
      products: paginated,
      totalPages: Math.ceil(items.length / limit),
      currentPage: page,
    };
  };

  // --- API çağrısı ---
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/products", { params: { page, limit } });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error("API HATASI:", err);
      setError("Sunucuya bağlanılamadı. Demo veriler gösteriliyor.");
      const mock = getMockProducts(page);
      setProducts(mock.products);
      setTotalPages(mock.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, [categoryId, filter, sort]);

  const goToDetail = (id) => history.push(`/detail/${id}`);

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
            <p className="text-lg text-gray-600">
              Bu kriterlere uygun ürün bulunamadı.
            </p>
          </div>
        ) : (
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
        )}

        <Logo />
      </div>
    </section>
  );
}
