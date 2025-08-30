import { Grid, List } from "lucide-react";

export default function FilterBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4">
      {/* Sol kısım */}
      <p className="text-sm text-gray-600">
        Showing all <span className="font-semibold">12</span> results
      </p>

      {/* Orta kısım: Views */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Views:</span>
        <button className="p-2 border rounded-md hover:bg-gray-100">
          <Grid size={18} />
        </button>
        <button className="p-2 border rounded-md hover:bg-gray-100">
          <List size={18} />
        </button>
      </div>

      {/* Sağ kısım: Sort + Filter */}
      <div className="flex items-center gap-2">
        <select className="border rounded-md px-3 py-2 text-sm">
          <option>Popularity</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Filter
        </button>
      </div>
    </div>
  );
}
