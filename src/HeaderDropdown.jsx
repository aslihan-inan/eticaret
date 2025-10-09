import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../redux/actions/categoryActions';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.product);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <header className="bg-white shadow">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 flex justify-between items-center h-16">
        <div className="font-bold text-xl">Shop</div>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <div className="relative group">
            <button className="px-3 py-2 font-medium hover:text-blue-600">
              Kategoriler
            </button>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white border shadow-lg z-50">
              {categories.map(cat => (
                <li key={cat.id} className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                  <Link to={`/shop/${cat.gender}/${cat.name.toLowerCase()}/${cat.id}`}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t shadow-lg">
          <ul className="flex flex-col gap-2 p-4">
            {categories.map(cat => (
              <li key={cat.id} className="py-2 px-2 border-b last:border-b-0">
                <Link
                  to={`/shop/${cat.gender}/${cat.name.toLowerCase()}/${cat.id}`}
                  className="block w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
