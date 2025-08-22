export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex gap-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 border ${currentPage === num ? "bg-blue-500 text-white" : ""}`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
