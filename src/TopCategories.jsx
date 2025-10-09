// src/components/TopCategories.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from './redux/actions/categoryActions';

export default function TopCategories() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // rating değerine göre top 5
  const top5 = categories
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <section className="py-4 px-2">
      {/* Mobilde yatay scroll, büyük ekranlarda grid */}
      <div className="flex sm:grid sm:grid-cols-5 gap-4 overflow-x-auto sm:overflow-x-visible">
        {top5.map(cat => (
          <Link
            key={cat.id}
            to={`/shop/${cat.gender}/${cat.name.toLowerCase()}/${cat.id}`}
            className="flex-shrink-0 w-36 sm:w-auto flex flex-col items-center bg-white p-2 border rounded hover:shadow-md mr-2 last:mr-0"
          >
            <img
              src={cat.image || '/assets/X.jpg'}
              alt={cat.name}
              className="w-20 h-20 object-cover mb-2 rounded"
            />
            <span className="text-center text-sm font-medium">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
