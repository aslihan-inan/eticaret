import { useState, useEffect } from "react";
import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import InfiniteScrollList from "../components/InfiniteScrollList";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 25;

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    const response = await getProducts(limit, (page - 1) * limit);
    setProducts(response.data.products);
    setTotal(response.data.total);
    setOffset((page - 1) * limit);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h1>Ürünler</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Veya Infinite Scroll */}
      {/* <InfiniteScrollList products={products} fetchMore={fetchProducts} hasMore={products.length < total} /> */}
    </div>
  );
}
