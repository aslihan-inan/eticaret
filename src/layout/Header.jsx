// src/layout/Header.jsx
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { useSelector } from "react-redux";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const history = useHistory();
  const cart = useSelector(state => state.cart.cart || []);
  const totalItems = cart.reduce((acc, item) => acc + item.count, 0);

  const goToShop = () => history.push("/shop");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
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
      <div className="bg-white border-b">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-[#252B42]">
              Bandage
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-6 items-center text-center">
              <Link to="/">Home</Link>
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button className="flex items-center gap-1" onClick={goToShop}>
                  Shop <span>▾</span>
                </button>
                {shopOpen && (
                  <div className="absolute left-0 top-full mt-2 bg-white shadow-lg p-6 grid grid-cols-2 gap-8 min-w-[400px] z-50">
                    <div>
                      <h4 className="font-semibold mb-3">Kadın</h4>
                      <ul className="space-y-1">
                        <li><Link to="/shop/kadin/bags">Bags</Link></li>
                        <li><Link to="/shop/kadin/belts">Belts</Link></li>
                        <li><Link to="/shop/kadin/cosmetics">Cosmetics</Link></li>
                        <li><Link to="/shop/kadin/hats">Hats</Link></li>
                      </ul>
                    </div>
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

              {/* Search */}
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

              {/* Cart */}
              <div className="relative">
                <button
                  onClick={() => setCartOpen(!cartOpen)}
                  className="relative"
                >
                  <ShoppingCart size={20} className="cursor-pointer" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>

                {cartOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg p-4 w-96 z-50">
                    {cart.length === 0 ? (
                      <p className="text-center text-gray-500">Sepetiniz boş</p>
                    ) : (
                      <ul className="space-y-3 max-h-72 overflow-y-auto">
                        {cart.map((item) => (
                          <li key={item.product.id} className="flex gap-3 border-b pb-2">
                            <img
                              src={item.product.images?.[0] || "https://via.placeholder.com/50"}
                              alt={item.product.title || item.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-semibold">{item.product.title || item.product.name}</p>
                              <p className="text-sm text-gray-500">
                                {item.count} × ${item.product.price}
                              </p>
                              <p className="text-xs text-gray-400">
                                {item.product.availability || "In Stock"}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Butonlar yan yana */}
                    <div className="mt-3 flex justify-between">
                      <Link
                        to="/cart"
                        className="flex-1 mr-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center transition-colors"
                      >
                        Sepete Git
                      </Link>
                      <Link
                        to="/checkout"
                        className="flex-1 ml-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-center transition-colors"
                      >
                        Siparişi Tamamla
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
