import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { removeFromCart } from "../redux/slices/cartSlice";
import Gravatar from "react-gravatar";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart || []);
  const user = useSelector((state) => state.auth.user);
  const totalItems = cart.reduce((acc, item) => acc + item.count, 0);

  const handleLogout = () => dispatch(logout());
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      history.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsSearchOpen(false);
    }
  };
  const handleRemove = (id) => dispatch(removeFromCart(id));

  return (
    <header className="w-full bg-white border-b relative">
      <div className="max-w-[1440px] mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#252B42]">
          Bandage
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center text-center">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-4 relative">
          {user ? (
            <div className="flex items-center gap-3">
              <Gravatar email={user.email} size={36} className="rounded-full" />
              <span className="font-medium text-gray-800">{user.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => history.push("/login")}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Login
              </button>
              <button
                onClick={() => history.push("/signup")}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Register
              </button>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
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

          {/* Desktop Cart */}
          <div className="relative md:block hidden">
            <button
              className="relative"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <ShoppingCart size={20} className="cursor-pointer" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {cartOpen && (
              <div className="absolute right-0 top-10 bg-white shadow-xl rounded-lg p-4 w-80 z-50 border">
                <h3 className="font-semibold mb-2 border-b pb-2">Sepetiniz</h3>
                {cart.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Sepetiniz boş.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-3 max-h-72 overflow-y-auto">
                    {cart.map((item) => (
                      <li
                        key={item.product.id}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <img
                          src={item.product.image || "/work.jpg"}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                        <div className="flex-1 px-3">
                          <p className="font-medium text-sm text-gray-800">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.count} × ₺{item.product.price}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {cart.length > 0 && (
                  <div className="mt-3 border-t pt-3">
                    <p className="text-sm font-semibold flex justify-between">
                      <span>Toplam:</span>
                      <span>
                        ₺
                        {cart
                          .reduce(
                            (acc, item) =>
                              acc + item.product.price * item.count,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </p>
                    <button
                      onClick={() => history.push("/cart")}
                      className="mt-3 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Sepete Git
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setMobileCartOpen(true)} className="relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Cart Panel */}
      {mobileCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-80 max-w-full h-full p-4 overflow-y-auto relative">
            <button
              onClick={() => setMobileCartOpen(false)}
              className="absolute top-4 right-4 text-gray-700"
            >
              <X size={24} />
            </button>
            <h3 className="font-semibold mb-4 border-b pb-2">Sepetiniz</h3>
            {cart.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Sepetiniz boş.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {cart.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <img
                      src={item.product.image || "/placeholder.png"}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                    <div className="flex-1 px-3">
                      <p className="font-medium text-sm text-gray-800">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.count} × ₺{item.product.price}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <div className="mt-3 border-t pt-3">
                <p className="text-sm font-semibold flex justify-between">
                  <span>Toplam:</span>
                  <span>
                    ₺
                    {cart
                      .reduce(
                        (acc, item) => acc + item.product.price * item.count,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>
                <button
                  onClick={() => {
                    history.push("/cart");
                    setMobileCartOpen(false);
                  }}
                  className="mt-3 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Sepete Git
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
