import { Grid, List } from "lucide-react";
import { useState } from "react";

export default function FilterBar({ setFilter, setSort }) {
  const [view, setView] = useState("grid");
  const [selectedSort, setSelectedSort] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSort(value);

    // Shop.jsx ile tam uyumlu sort değerleri
    switch (value) {
      case "price:asc":
        setSort("price:asc");
        break;
      case "price:desc":
        setSort("price:desc");
        break;
      case "rating:asc":
        setSort("rating:asc");
        break;
      case "rating:desc":
        setSort("rating:desc");
        break;
      default:
        setSort("");
    }
  };

  const handleFilterSubmit = () => {
    setFilter(filterInput);
  };

  const handleFilterChange = (e) => {
    setFilterInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilterSubmit();
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4">
      {/* Sol kısım */}
      <p className="text-sm text-gray-600">
        Showing all <span className="font-semibold">12</span> results
      </p>

      {/* Orta kısım: Views */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Views:</span>
        <button
          className={`p-2 border rounded-md hover:bg-gray-100 ${view === "grid" ? "bg-gray-200" : ""}`}
          onClick={() => setView("grid")}
        >
          <Grid size={18} />
        </button>
        <button
          className={`p-2 border rounded-md hover:bg-gray-100 ${view === "list" ? "bg-gray-200" : ""}`}
          onClick={() => setView("list")}
        >
          <List size={18} />
        </button>
      </div>

      {/* Sağ kısım: Sort + Filter */}
      <div className="flex items-center gap-2">
        <select
          value={selectedSort}
          onChange={handleSortChange}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">Popularity</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="rating:asc">Rating: Low to High</option>
          <option value="rating:desc">Rating: High to Low</option>
        </select>

        {/* Filter Input */}
        <input
          type="text"
          placeholder="Filter products..."
          value={filterInput}
          onChange={handleFilterChange}
          onKeyPress={handleKeyPress}
          className="border rounded-md px-3 py-2 text-sm"
        />
        
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleFilterSubmit}
        >
          Filter
        </button>
      </div>
    </div>
  );
}