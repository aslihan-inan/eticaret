import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./ProductCard";

export default function InfiniteScrollList({ products, fetchMore, hasMore }) {
  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={<h4>Yükleniyor...</h4>}
      endMessage={<p>Daha fazla ürün yok!</p>}
    >
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
