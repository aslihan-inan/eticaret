import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const categories = useSelector((state) => state.categories.list || []);
  const kadinCategories = categories.filter((cat) => cat.gender === "kadin");
  const erkekCategories = categories.filter((cat) => cat.gender === "erkek");

  return (
    <nav className="bg-white shadow relative">
      {/* Desktop + Hamburger */}
      <div className="max-w-[1440px] mx-auto px-6 py-3 flex justify-between items-center">
        <div className="font-bold text-xl">Shop</div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu (Desktop) */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-600">Home</Link>
          </li>

          {/* Shop Dropdown */}
          <li className="relative group">
            <button className="hover:text-blue-600 flex items-center">
              Shop ▼
            </button>

            <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md">
              {/* Kadın */}
              <li className="relative group">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Kadın ▶
                </button>
                <ul className="absolute left-full top-0 hidden group-hover:block bg-white shadow-lg rounded-md">
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
              </li>

              {/* Erkek */}
              <li className="relative group">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Erkek ▶
                </button>
                <ul className="absolute left-full top-0 hidden group-hover:block bg-white shadow-lg rounded-md">
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
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                to="/"
                className="block px-2 py-2 rounded hover:bg-gray-100"
                onClick={() => setIsMobileOpen(false)}
              >
                Home
              </Link>
            </li>

            {/* Shop Mobile */}
            <li>
              <button
                className="w-full text-left px-2 py-2 rounded hover:bg-gray-100 flex justify-between items-center"
                onClick={() =>
                  setOpenSubmenu(openSubmenu === "shop" ? null : "shop")
                }
              >
                Shop
                <span>{openSubmenu === "shop" ? "▲" : "▼"}</span>
              </button>

              {openSubmenu === "shop" && (
                <div className="pl-4 mt-2">
                  {/* Kadın */}
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 flex justify-between items-center"
                    onClick={() =>
                      setOpenSubmenu(openSubmenu === "kadin" ? "shop" : "kadin")
                    }
                  >
                    Kadın
                    <span>{openSubmenu === "kadin" ? "▲" : "▶"}</span>
                  </button>
                  {openSubmenu === "kadin" && (
                    <ul className="pl-4 mt-1 flex flex-col space-y-1">
                      {kadinCategories.map((cat) => (
                        <li key={cat.id}>
                          <Link
                            to={`/shop/kadin/${cat.name.toLowerCase()}`}
                            className="block px-2 py-1 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileOpen(false)}
                          >
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Erkek */}
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 flex justify-between items-center mt-2"
                    onClick={() =>
                      setOpenSubmenu(openSubmenu === "erkek" ? "shop" : "erkek")
                    }
                  >
                    Erkek
                    <span>{openSubmenu === "erkek" ? "▲" : "▶"}</span>
                  </button>
                  {openSubmenu === "erkek" && (
                    <ul className="pl-4 mt-1 flex flex-col space-y-1">
                      {erkekCategories.map((cat) => (
                        <li key={cat.id}>
                          <Link
                            to={`/shop/erkek/${cat.name.toLowerCase()}`}
                            className="block px-2 py-1 rounded hover:bg-gray-100"
                            onClick={() => setIsMobileOpen(false)}
                          >
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
