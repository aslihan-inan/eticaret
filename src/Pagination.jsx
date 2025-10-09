import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Sayfa numaralarını oluştur
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center py-4 px-2">
      <nav className="inline-flex items-center space-x-1 overflow-x-auto">
        {/* First */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 border rounded-l-md text-sm flex-shrink-0 ${
            currentPage === 1
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          First
        </button>

        {/* Sayfa numaraları */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 border text-sm flex-shrink-0 ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 border rounded-r-md text-sm flex-shrink-0 ${
            currentPage === totalPages
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
}
