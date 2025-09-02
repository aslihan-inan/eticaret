import React, { useState } from "react";
import { ChevronRight, Heart, Eye, ShoppingCart } from "lucide-react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/slices/cartSlice";
import ProductDescription from "./ProductDescription";
import pro1 from "./assets/pro1.jpg";
import p01 from "./assets/p01.jpg";
import p02 from "./assets/p02.jpg";

const products = [
  {
    id: 0,
    title: "Floating Phone",
    price: 1139.33,
    reviews: 10,
    availability: "In Stock",
    description:
      "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
    images: [pro1, p01, p02],
    colors: ["bg-cyan-500", "bg-orange-500", "bg-teal-600", "bg-gray-800"],
  },
  {
    id: 1,
    title: "Smart Watch",
    price: 299.99,
    reviews: 25,
    availability: "Out of Stock",
    description:
      "Stylish smartwatch with fitness tracking and long battery life.",
    images: [pro1, p01, p02],
    colors: ["bg-red-500", "bg-blue-500", "bg-black"],
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch(); // <-- yalnızca burayı tanımlıyoruz
  const product = products.find((p) => p.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(
    product ? product.images[0] : ""
  );

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`${product.title} sepete eklendi!`);
  };

  return (
    <div className="w-full bg-white md:px-8 py-6">
      {/* Back Button */}
   
      {/* Breadcrumb */}
      <div className=" flex justify-between">
     <nav className="max-w-[1200px] ml-0 flex items-center text-sm text-gray-500 space-x-2 mb-6 justify-start">
  <Link to="/" className="font-semibold text-gray-800 hover:text-blue-600">
    Home
  </Link>
  <ChevronRight size={16} className="text-gray-400" />
  <Link to="/shop" className="hover:text-blue-600">
    Shop
  </Link>
  <ChevronRight size={16} className="text-gray-400" />
  <span className="text-gray-600">{product.title}</span>
</nav>

   <div  className="mb-4 px-4 py-2 text-gray-700 text-right">
      <button
        onClick={() => history.goBack()}
        className="mb-4 px-4 py-2 text-gray-700 text-right"
      >
        ← Back
      </button>
</div>
</div>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div>
          <div className="w-full h-[506px] md:h-[450px] overflow-hidden rounded-md border">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-[100px] h-[75px] border rounded-md cursor-pointer overflow-hidden ${
                  selectedImage === img ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-start">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            ★★★★☆{" "}
            <span className="text-gray-500 text-sm">{product.reviews} Reviews</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-2">
            ${product.price}
          </p>
          <p className="text-sm mb-4">
            Availability:{" "}
            <span
              className={`font-medium ${
                product.availability === "In Stock"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {product.availability}
            </span>
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Colors */}
          <div className="flex gap-3 mb-6">
            {product.colors.map((color, idx) => (
              <button
                key={idx}
                className={`${color} w-6 h-6 rounded-full border-2 border-gray-300`}
              />
            ))}
          </div>

          {/* Buttons: Sepete ekle + Heart + Eye */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center gap-2"
            >
              <ShoppingCart size={16} /> Select Options
            </button>

            <button className="p-2 border rounded hover:bg-gray-100">
              <Heart size={18} />
            </button>

            <button className="p-2 border rounded hover:bg-gray-100">
              <Eye size={18} />
            </button>
          </div>
        </div>
      </div>

      <ProductDescription />
    </div>
  );
}
