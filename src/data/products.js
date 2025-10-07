// src/data/products.js
import pro1 from "../assets/pro1.jpg";
import p01 from "../assets/p01.jpg";
import p02 from "../assets/p02.jpg";
import X from "../assets/tabak.jpg";

const products = [
  {
    id: 1,
    title: "Floating Phone",
    price: 1139.33,
    reviews: 10,
    availability: "In Stock",
    description: "Met minim Mollie non desert Alamo est sit...",
    images: [pro1, p01, p02],
    colors: ["bg-cyan-500", "bg-orange-500", "bg-teal-600", "bg-gray-800"],
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 299.99,
    reviews: 25,
    availability: "Out of Stock",
    description: "Stylish smartwatch with fitness tracking...",
    images: [pro1, p01, p02],
    colors: ["bg-red-500", "bg-blue-500", "bg-black"],
  },
  {
    id: 3,
    title: "Graphic Design",
    department: "English Department",
    price: 16.48,
    discountedPrice: 6.48,
    images: [X],
    colors: ["bg-green-500", "bg-yellow-500"],
  },
];

export default products;
