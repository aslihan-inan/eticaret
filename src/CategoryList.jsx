import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/actions/categoryActions';
import { Link } from 'react-router-dom';

export default function CategoryList() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.product); // productReducer içinde categories

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // En yüksek rating'e göre top 5
  const top5 = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Top Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {top5.map(cat => (
          <Link
            key={cat.id}
            to={`/shop/${cat.gender}/${cat.name.toLowerCase()}/${cat.id}`}
            className="block text-center border rounded p-2 hover:shadow-lg"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-24 object-cover mb-2"/>
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
