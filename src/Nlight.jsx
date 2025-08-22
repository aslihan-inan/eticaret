import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/actions/categoryActions";

export default function Nlight() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories?.list || []);
  const [openShop, setOpenShop] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const womenCategories = categories.filter(c => c.gender === "kadin");
  const menCategories = categories.filter(c => c.gender === "erkek");

  // Top 5
  const topWomen = womenCategories
    .sort((a,b) => b.rating - a.rating)
    .slice(0,5);

  const topMen = menCategories
    .sort((a,b) => b.rating - a.rating)
    .slice(0,5);

  const otherWomen = womenCategories.filter(c => !topWomen.includes(c));
  const otherMen = menCategories.filter(c => !topMen.includes(c));

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="text-2xl font-bold">BrandName</div>

        {/* Ana Menü */}
        <ul className="flex space-x-6 items-center">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>

          {/* Shop Dropdown */}
          <li className="relative">
            <button
              onClick={() => setOpenShop(!openShop)}
              className="flex items-center space-x-1 hover:text-blue-600"
            >
              <span>Shop</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {openShop && (
              <div className="absolute top-full left-0 mt-2 bg-white border rounded shadow-md z-10 p-4 flex space-x-6 justify-center">
                {/* Kadın Kategorileri */}
                <div className="flex flex-col items-center">
                  <span className="font-semibold mb-2 text-center">Kadın</span>
                  {topWomen.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/shop/${cat.gender}/${cat.name}/${cat.id}`}
                      className="block px-4 py-1 hover:bg-blue-100 rounded text-center font-medium"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  {otherWomen.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/shop/${cat.gender}/${cat.name}/${cat.id}`}
                      className="block px-4 py-0.5 text-sm text-gray-500 hover:bg-blue-50 rounded text-center"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                {/* Erkek Kategorileri */}
                <div className="flex flex-col items-center">
                  <span className="font-semibold mb-2 text-center">Erkek</span>
                  {topMen.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/shop/${cat.gender}/${cat.name}/${cat.id}`}
                      className="block px-4 py-1 hover:bg-blue-100 rounded text-center font-medium"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  {otherMen.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/shop/${cat.gender}/${cat.name}/${cat.id}`}
                      className="block px-4 py-0.5 text-sm text-gray-500 hover:bg-blue-50 rounded text-center"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
          <li><Link to="/blog" className="hover:text-blue-600">Blog</Link></li>
          <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
          <li><Link to="/pages" className="hover:text-blue-600">Pages</Link></li>
        </ul>

        {/* Sağ Butonlar */}
        <div className="flex items-center space-x-4 text-sm">
          <Link to="/login" className="text-blue-600 hover:underline flex items-center space-x-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zM7 21v-2a4 4 0 014-4h2a4 4 0 014 4v2" />
            </svg>
            <span>Login / Register</span>
          </Link>

          <button aria-label="Search" className="hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button aria-label="Cart" className="relative hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="21" r="1" />
              <circle cx="17" cy="21" r="1" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">1</span>
          </button>

          <button aria-label="Favorites" className="relative hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 21l-1-1C5 15 2 12 2 8a5 5 0 0110 0 5 5 0 0110 0c0 4-3 7-7 12z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">1</span>
          </button>
        </div>

      </div>
    </nav>
  );
}
