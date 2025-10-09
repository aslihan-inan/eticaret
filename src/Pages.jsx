import React from "react";
import sol from "./assets/sol1.png";
import sag from "./assets/sag.png";
import team from "./assets/team.jpg";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const teamMembers = Array(12).fill({
  img: team,
  name: "Username",
  role: "Profession",
});

const products = [
  { id: 1, image: sol },
  { id: 2, image: sag },
  { id: 3, image: sag },
  { id: 4, image: sag },
  { id: 5, image: sag },
];

export default function ProductGrid() {
  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">

      {/* Başlık */}
      <div className="text-center mb-8">
        <p className="text-gray-500 max-w-2xl mx-auto py-2">WHAT WE DO</p>
        <h2 className="font-bold text-2xl md:text-3xl text-gray-800">
          Innovation tailored for you
        </h2>
      </div>

      {/* Breadcrumb */}
      <div className="flex justify-center items-center mb-10 py-4">
        <nav className="flex items-center gap-2 text-gray-600 text-base md:text-lg">
          <Link to="/" className="text-[#23A6F0]">Home</Link>
          <span>{'>'}</span>
          <span className="text-gray-800">Team</span>
        </nav>
      </div>

      {/* Ürün Görselleri */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-12">
        <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 overflow-hidden rounded">
          <img src={products[0].image} className="w-full h-full object-cover" alt="Sol" />
        </div>
        <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-2 gap-4">
          {products.slice(1).map((product) => (
            <div key={product.id} className="w-full h-32 sm:h-40 md:h-48 overflow-hidden rounded">
              <img src={product.image} className="w-full h-full object-cover" alt="Product" />
            </div>
          ))}
        </div>
      </div>

      {/* Takım Başlığı */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Meet Our Team
      </h2>

      {/* Takım Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center w-full max-w-xs">
            <img src={member.img} alt={member.name} className="w-full h-64 sm:h-60 object-cover rounded-lg" />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>
            <div className="flex gap-3 mt-3 text-[#23A6F0] text-xl">
              <FaFacebook className="cursor-pointer hover:text-blue-700" />
              <FaInstagram className="cursor-pointer hover:text-pink-500" />
              <FaTwitter className="cursor-pointer hover:text-sky-500" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center justify-center text-center mt-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Start your 14 days free trial</h2>
        <p className="text-gray-500 max-w-2xl py-3 text-base md:text-lg">
          Met minim Mollie non desert Alamo est sit cliquey dolor <br />
          do met sent. RELIT official consequent.
        </p>
        <button className="w-44 md:w-52 h-12 md:h-14 bg-[#23A6F0] text-white font-bold rounded-lg transition hover:bg-blue-600">
          Try it free now
        </button>
      </div>

      {/* Sosyal ikonlar alt */}
      <div className="flex gap-6 mt-8 justify-center items-center text-3xl py-6">
        <FaTwitter className="cursor-pointer text-sky-500" />
        <FaFacebook className="cursor-pointer text-blue-700" />
        <FaInstagram className="cursor-pointer text-pink-500" />
        <FaLinkedin className="cursor-pointer text-blue-600" />
      </div>

    </section>
  );
}
