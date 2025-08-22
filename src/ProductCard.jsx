export default function ProductCard({ product }) {
  return (
    <div className="border p-2">
      <h2>{product.name}</h2>
      <p>{product.price}</p>
    </div>
  );
}
