import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Redux'tan kategoriler
  const categories = useSelector((state) => state.categories.list);

  // Kadın & Erkek kategorilerini ayır
  const kadinCategories = categories.filter((cat) => cat.gender === "kadin");
  const erkekCategories = categories.filter((cat) => cat.gender === "erkek");

  return (
    <nav className="bg-white shadow">
      <ul className="flex space-x-6 px-6 py-3">
        <li>
          <Link to="/" className="hover:text-blue-600">Home</Link>
        </li>

        {/* Shop Dropdown */}
        <li
          className="relative"
          onMouseEnter={() => setIsShopOpen(true)}
          onMouseLeave={() => {
            setIsShopOpen(false);
            setOpenSubmenu(null);
          }}
        >
          <button className="hover:text-blue-600 flex items-center">
            Shop ▼
          </button>

          {isShopOpen && (
            <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md">
              {/* Kadın */}
              <li
                className="relative"
                onMouseEnter={() => setOpenSubmenu("kadin")}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Kadın ▶
                </button>
                {openSubmenu === "kadin" && (
                  <ul className="absolute left-full top-0 mt-0 ml-1 w-40 bg-white shadow-lg rounded-md">
                    {kadinCategories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          to={`/shop/kadin/${cat.name.toLowerCase()}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Erkek */}
              <li
                className="relative"
                onMouseEnter={() => setOpenSubmenu("erkek")}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Erkek ▶
                </button>
                {openSubmenu === "erkek" && (
                  <ul className="absolute left-full top-0 mt-0 ml-1 w-40 bg-white shadow-lg rounded-md">
                    {erkekCategories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          to={`/shop/erkek/${cat.name.toLowerCase()}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
