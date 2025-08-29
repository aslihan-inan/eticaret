import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function InfiniteScrollList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const limit = 25;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const offset = page * limit;
      const res = await axios.get(
        `http://localhost:5000/products?limit=${limit}&offset=${offset}`
      );
      setProducts((prev) => [...prev, ...res.data.products]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
      {loading && <p className="text-center col-span-full">Yükleniyor...</p>}
    </div>
  );
}
