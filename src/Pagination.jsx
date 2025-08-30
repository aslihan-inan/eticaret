export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Sayfa numaralarını oluştur
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center py-6">
      <nav className="inline-flex items-center space-x-1">
        {/* First */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 border rounded-l-md text-sm ${
            currentPage === 1
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          First
        </button>

         <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 border rounded-l-md text-sm ${
            currentPage === 1
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          1
        </button>

    <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 border rounded-l-md text-sm ${
            currentPage === 2
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          2
        </button>

            <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 border rounded-l-md text-sm ${
            currentPage === 3
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          3
        </button>



        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 border rounded-r-md text-sm ${
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
