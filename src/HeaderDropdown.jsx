import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../redux/actions/categoryActions';


export default function Header() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="font-bold text-xl">Shop</div>

      <nav>
        <ul className="flex gap-4">
          <li className="relative group">
            <button className="px-3 py-2">Kategoriler</button>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white border shadow-lg">
              {categories.map(cat => (
                <li key={cat.id} className="px-4 py-2 hover:bg-gray-100">
                  <Link to={`/shop/${cat.gender}/${cat.name.toLowerCase()}/${cat.id}`}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
