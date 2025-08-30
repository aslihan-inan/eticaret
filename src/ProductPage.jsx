import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi"; // senin API fonksiyonun

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const limit = 25; // sayfa başına ürün

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const offset = (currentPage - 1) * limit;

        // API çağrısı
        const res = await getProducts(limit, offset);

        // API dönüşünü kontrol et
        if (res && res.data) {
          setProducts(res.data);
          setTotalPages(Math.ceil((res.total || 0) / limit));
        } else {
          setProducts([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("API error:", err);
        setError("Ürünler yüklenirken bir hata oluştu.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [currentPage]);

  return (
    <div className="container mx-auto px-4">
      <FilterBar />

      {/* Ürün Grid */}
      {loading ? (
        <p className="text-center py-6">Yükleniyor...</p>
      ) : error ? (
        <p className="text-center py-6 text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center py-6">Ürün bulunamadı</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
