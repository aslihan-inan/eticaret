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
    <section className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-4">
      {top5.map(cat => (
        <Link
          key={cat.id}
          to={`/shop/${cat.gender}/${cat.name.toLowerCase()}/${cat.id}`}
          className="flex flex-col items-center bg-white p-2 border rounded hover:shadow-md"
        >
          <img src={cat.image || '/assets/X.jpg'} alt={cat.name} className="w-20 h-20 object-cover mb-2" />
          <span className="text-center text-sm">{cat.name}</span>
        </Link>
      ))}
    </section>
  );
}
