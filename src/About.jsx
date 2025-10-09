import React from "react";
import tech from './assets/tech.png';
import VideoCard from "./VideoCard";
import team from "./assets/team.jpg";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from "./Logo";
import work from "./assets/work.jpg";

const teamMembers = [
  { img: team, name: "Username", role: "Profession" },
  { img: team, name: "Username", role: "Profession" },
  { img: team, name: "Username", role: "Profession" },
];

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full max-w-[1292px] mx-auto my-8 flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-10 overflow-hidden rounded-[10px]">
        <div className="z-10 flex-1 text-center md:text-left">
          <p className="text-sm md:text-md font-semibold text-blue-700 uppercase mb-2">ABOUT COMPANY</p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">ABOUT US</h1>
          <h4 className="text-gray-700 mb-6 max-w-md mx-auto md:mx-0 text-base sm:text-lg">
            We know how large objects will act, <br />
            but things on a small scale
          </h4>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-md transition">
            Get Quote Now
          </button>
        </div>
        <img 
          src={tech} 
          alt="Tech"
          className="hidden md:block absolute top-0 right-0 w-[80%] max-w-[571px] h-auto object-cover z-10"
        />
      </section>

      {/* About Text Section */}
      <section className="w-full max-w-[1050px] mx-auto pt-16 sm:pt-20 pb-16 sm:pb-20 flex flex-col md:flex-row gap-8 md:gap-12 px-4 md:px-0">
        <div className="w-full md:w-1/2">
          <p className="font-montserrat text-sm md:text-base text-[#E74040] mb-2">Problems trying</p>
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800 leading-snug">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className="font-montserrat text-sm sm:text-base text-gray-800 text-center md:text-left">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-[1050px] mx-auto pt-16 pb-16 px-4 md:px-0 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
        {[
          { value: "15K", label: "Happy Customers" },
          { value: "150K", label: "Monthly Visitors" },
          { value: "15", label: "Countries Worldwide" },
          { value: "100+", label: "Top Partners" },
        ].map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center gap-2">
            <p className="font-bold text-2xl sm:text-4xl text-gray-800">{stat.value}</p>
            <p className="text-gray-700 text-sm sm:text-base">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Video Card */}
      <VideoCard />

      {/* Team Section */}
      <section className="pt-16 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Meet Our Team</h2>
        <p className="text-center mt-3 text-gray-600">
          Problems trying to resolve the conflict between <br />
          the two major realms of Classical physics: Newtonian mechanics
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 max-w-[1050px] mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center w-full">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-auto object-cover rounded"
              />
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
              <div className="flex gap-4 mt-3 text-[#23A6F0] text-lg">
                <FaFacebook className="cursor-pointer hover:text-blue-700" />
                <FaInstagram className="cursor-pointer hover:text-pink-500" />
                <FaTwitter className="cursor-pointer hover:text-sky-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Big Companies Section */}
      <section className="bg-[#FAFAFA] w-full py-16 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Big Companies Are Here</h2>
        <p className="text-center mt-3 text-gray-600">
          Problems trying to resolve the conflict between <br />
          the two major realms of Classical physics: Newtonian mechanics
        </p>
        <Logo />
      </section>

      {/* Work With Us Section */}
      <section className="relative w-full max-w-[1440px] mx-auto bg-[#2A7CC7] flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-16 overflow-hidden rounded-lg">
        <div className="flex-1 text-center md:text-left max-w-full md:max-w-[438px]">
          <p className="text-sm md:text-md font-semibold text-white uppercase mb-2">WORK WITH US</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Now Let’s grow Yours</h1>
          <p className="text-white mb-6 text-sm sm:text-base">
            The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th
          </p>
          <button className="text-white font-semibold py-3 px-6 border-2 border-white rounded transition w-full sm:w-auto">
            Button
          </button>
        </div>
        <img 
          src={work} 
          alt="Work"
          className="hidden md:block absolute top-0 right-0 w-[50%] max-w-[590px] h-auto object-cover z-10"
        />
      </section>
    </>
  );
}
