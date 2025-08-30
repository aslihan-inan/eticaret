// src/layout/Header.jsx
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const goToShop = () => history.push("/shop");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Arama terimiyle shop sayfasına yönlendir
      history.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsSearchOpen(false);
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen && searchTerm.trim()) {
      history.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="w-full">
      {/* Dark Top Bar */}
      <div className="bg-[#252B42] text-white text-sm">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-2 gap-2">
          <div className="flex gap-4 items-center">
            <span>(225) 555-0118</span>
            <span>michelle.rivera@example.com</span>
          </div>
          <div className="flex gap-4 items-center">
            <span>Follow Us and get a chance to win 80% off</span>
            <div className="flex gap-3">
              <a href="#">FB</a>
              <a href="#">IG</a>
              <a href="#">TW</a>
            </div>
          </div>
        </div>
      </div>

      {/* Light Navigation Bar */}
      <div className="bg-white border-b">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#252B42]">
              Bandage
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-6 items-center text-center">
              <Link to="/">Home</Link>

              {/* Shop Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button
                  className="flex items-center gap-1"
                  onClick={goToShop}
                >
                  Shop <span>▾</span>
                </button>

                {shopOpen && (
                  <div className="absolute left-0 top-full mt-2 bg-white shadow-lg p-6 grid grid-cols-2 gap-8 min-w-[400px] z-50">
                    {/* Kadın */}
                    <div>
                      <h4 className="font-semibold mb-3">Kadın</h4>
                      <ul className="space-y-1">
                        <li><Link to="/shop/kadin/bags">Bags</Link></li>
                        <li><Link to="/shop/kadin/belts">Belts</Link></li>
                        <li><Link to="/shop/kadin/cosmetics">Cosmetics</Link></li>
                        <li><Link to="/shop/kadin/hats">Hats</Link></li>
                      </ul>
                    </div>

                    {/* Erkek */}
                    <div>
                      <h4 className="font-semibold mb-3">Erkek</h4>
                      <ul className="space-y-1">
                        <li><Link to="/shop/erkek/bags">Bags</Link></li>
                        <li><Link to="/shop/erkek/belts">Belts</Link></li>
                        <li><Link to="/shop/erkek/cosmetics">Cosmetics</Link></li>
                        <li><Link to="/shop/erkek/hats">Hats</Link></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/pages">Pages</Link>
            </nav>

            {/* Right Icons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-[#23A6F0] font-semibold">
                Login / Register
              </Link>
              
              {/* Arama Bölümü */}
              <div className="relative">
                <button
                  onClick={handleSearchClick}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Search size={18} />
                </button>
                
                {isSearchOpen && (
                  <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg p-4 min-w-[300px] z-50">
                    <form onSubmit={handleSearchSubmit} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ürünlerde ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Ara
                      </button>
                    </form>
                  </div>
                )}
              </div>
              
              <ShoppingCart size={18} />
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="flex flex-col gap-4 md:hidden pb-4">
              <Link to="/">Home</Link>
              <button
                className="flex items-center gap-1"
                onClick={() => setShopOpen(!shopOpen)}
              >
                Shop ▾
              </button>

              {shopOpen && (
                <div className="pl-4 flex flex-col gap-4">
                  {/* Kadın */}
                  <div>
                    <h4 className="font-semibold mb-2">Kadın</h4>
                    <ul className="space-y-1">
                      <li><Link to="/shop/kadin/bags">Bags</Link></li>
                      <li><Link to="/shop/kadin/belts">Belts</Link></li>
                      <li><Link to="/shop/kadin/cosmetics">Cosmetics</Link></li>
                      <li><Link to="/shop/kadin/hats">Hats</Link></li>
                    </ul>
                  </div>

                  {/* Erkek */}
                  <div>
                    <h4 className="font-semibold mb-2">Erkek</h4>
                    <ul className="space-y-1">
                      <li><Link to="/shop/erkek/bags">Bags</Link></li>
                      <li><Link to="/shop/erkek/belts">Belts</Link></li>
                      <li><Link to="/shop/erkek/cosmetics">Cosmetics</Link></li>
                      <li><Link to="/shop/erkek/hats">Hats</Link></li>
                    </ul>
                  </div>
                </div>
              )}

              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/pages">Pages</Link>
              <Link to="/login" className="text-[#23A6F0] font-semibold">
                Login / Register
              </Link>
              
              {/* Mobile Arama */}
              <div className="flex flex-col gap-2">
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ürünlerde ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Ara
                  </button>
                </form>
              </div>
              
              <div className="flex gap-4">
                <ShoppingCart size={18} />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}