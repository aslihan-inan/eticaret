import React from "react";
import sol from "./assets/sol1.png";
import sag from "./assets/sag.png";
import team from "./assets/team.jpg";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  { img: team, name: "Username", role: "Profession" },
    { img: team, name: "Username", role: "Profession" },
      { img: team, name: "Username", role: "Profession" },
        { img: team, name: "Username", role: "Profession" },
          { img: team, name: "Username", role: "Profession" },
            { img: team, name: "Username", role: "Profession" },
              { img: team, name: "Username", role: "Profession" },
                { img: team, name: "Username", role: "Profession" },
                  { img: team, name: "Username", role: "Profession" },
                    { img: team, name: "Username", role: "Profession" },
                      { img: team, name: "Username", role: "Profession" },
                        { img: team, name: "Username", role: "Profession" },



];


const products = [
  { id: 1, image: sol },
  { id: 2, image: sag },
  { id: 2, image: sag },
  { id: 2, image: sag },
  { id: 2, image: sag },
];

export default function ProductGrid() {
  return ( 
    
    <section className="py-5 px-4 max-w-7xl mx-auto">


      <div className="text-center mb-1">
          <p className="text-gray-500 max-w-2xl mx-auto py-5">
WHAT WE DO        </p>
        <h2 className="font-bold text-2xl md:text-3xl text-gray-800 ">
        Innovation tailored for you
        </h2>
      
      </div>

 <div className="flex justify-center items-center mb-10 py-6">
      <nav className="flex items-center gap-2 text-gray-600 text-lg font- ">
     
        <Link to="/" className="text-[#23A6F0] ">
          Home
        </Link>
        <span>{'>'}</span>
        <span className="text-gray-800">Team</span>
      </nav>
    </div>



      <div className="flex flex-col lg:flex-row gap-6 w-700px h-560px">
      


        <div className="w-full lg:w-1/2  overflow-hidden relative ">
          <img
            src={products[0].image}
            className="w-full h-full object-cover"
          />
         
        </div>
        <div className=" lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          {[products[1], products[2], products[3],products[4]].map((product) => (
            <div
              key={product.id}
              className="w-full overflow-hidden relative gap-4 "
            >
              <img
                src={product.image}
                className="w-full h-full object-cove gap-4"
              />
            
            </div>
          ))}
        </div>
      </div>

 <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 py-15 p-20">
        Meet Our Team
      </h2>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 sm:grid-cols-3 gap-4 mt-5 ">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center w-[316px] h-[383px] ">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-auto object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>

            {/* Sosyal ikonlar */}
            <div className="flex gap-4 mt-3 text-[#23A6F0] text-lg">
              <FaFacebook className="cursor-pointer hover:text-blue-700" />
              <FaInstagram className="cursor-pointer hover:text-pink-500" />
              <FaTwitter className="cursor-pointer hover:text-sky-500" />
            </div>
          </div>
        ))}
      </div>


      <div className="flex flex-col items-center justify-center  text-center">
  <h2 className="text-2xl md:text-3xl font-bold">
    Start your 14 days free trial
  </h2>

  <p className="text-gray-500 max-w-2xl py-5 text-base md:text-lg">
    Met minim Mollie non desert Alamo est sit cliquey dolor <br />
    do met sent. RELIT official consequent.
  </p>

  <button className="w-[186px] h-[52px] md:w-[200px] md:h-[56px] bg-[#23A6F0] flex items-center justify-center text-white font-montserrat font-bold rounded transition ">
    Try it free now
  </button>
  </div>
<div className="flex gap-7 mt-3 justify-center items-center text-7xl py-6">
  <FaTwitter className="cursor-pointer text-sky-500" />
  <FaFacebook className="cursor-pointer text-blue-700" />
  <FaInstagram className="cursor-pointer text-pink-500" />
  <FaLinkedin className="cursor-pointer text-blue-600" />
</div>



    </section>
    
  );
}
