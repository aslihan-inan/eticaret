import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../redux/actions/categoryActions";
import { Link } from "react-router-dom";

export default function TopCategories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="flex space-x-4 mt-6">
      {topCategories.map((cat) => (
        <Link
          key={cat.id}
          to={`/shop/${cat.gender}/${cat.name}/${cat.id}`}
          className="flex flex-col items-center p-2 bg-white rounded shadow hover:shadow-lg"
        >
          <img src={cat.image} alt={cat.name} className="w-24 h-24 object-cover mb-2" />
          <span>{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}
