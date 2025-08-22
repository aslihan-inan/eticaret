import React from "react";
import tech from './assets/tech.png';
import VideoCard from "./VideoCard";
import team from "./assets/team.jpg";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
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
      <section className="relative w-full max-w-[1292px] h-[622px] mx-auto my-8 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 overflow-hidden rounded-[10px]">
        
        <div className="z-10 flex-1 text-center md:text-left">
          <p className="text-sm md:text-md font-semibold text-blue-700 uppercase mb-2">ABOUT COMPANY</p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">ABOUT US</h1>
          <h4 className="text-gray-700 mb-6 max-w-md mx-auto md:mx-0">
            We know how large objects will act, <br />
            but things on a small scale
          </h4>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-md transition">
            Get Quote Now
          </button>
        </div>

        <div className="hidden md:block absolute top-10 right-20 w-[484px] h-[484px] bg-[#FFE9EA] rounded-full opacity-100"></div>
        <div className="hidden md:block absolute top-10 right-[600px] w-[78px] h-[78px] bg-[#FFE9EA] rounded-full opacity-100"></div>
        <div className="hidden md:block absolute top-[408px] right-[600px] w-[15px] h-[15px] bg-[#977DF4] rounded-full opacity-100"></div>
        <div className="hidden md:block absolute top-[122px] right-[16px] w-[15px] h-[15px] bg-[#977DF4] rounded-full opacity-100"></div>
        <div className="hidden md:block absolute top-[248px] right-[16px] w-[31px] h-[31px] bg-[#FFE9EA] rounded-full opacity-100"></div>


        <img 
          src={tech} 
          alt="Happy woman"
          className="hidden md:block absolute top-0 right-0 w-[571px] h-[669px] object-cover z-10"
        />      

      </section>

      <section className="w-full max-w-[1050px] mx-auto pt-20 pb-20 flex flex-col md:flex-row gap-12 px-6 md:px-0">
        <div className="w-full md:w-[394px] mb-6 md:mb-0">
          <p className="font-montserrat text-sm md:text-base lg:text-lg leading-5 text-[#E74040] tracking-[0.2px]">
            Problems trying
          </p>
          <h2
            className="font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-gray-800"
          >
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </h2>
        </div> 

        <div className="w-full md:w-[545px] flex justify-center md:justify-start">
          <p className="font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-gray-800 text-center md:text-left">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1050px] mx-auto pt-20 pb-20 px-6 md:px-0">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center">
        

          <div className="w-[238px] h-[104px] flex flex-col items-center justify-center gap-2">
            <p className="font-montserrat font-bold text-[58px] leading-[64px] tracking-[0.1px] text-center text-gray-800">
              15K
            </p>
            <p className="text-center font-montserrat text-gray-700">
              Happy Customers
            </p>
          </div>

        

          <div className="w-[238px] h-[104px] flex flex-col items-center justify-center gap-2">
            <p className="font-montserrat font-bold text-[58px] leading-[64px] tracking-[0.1px] text-center text-gray-800">
              150K
            </p>
            <p className="text-center font-montserrat text-gray-700">
              Monthly Visitors
            </p>
          </div>


          <div className="w-[238px] h-[104px] flex flex-col items-center justify-center gap-2">
            <p className="font-montserrat font-bold text-[58px] leading-[64px] tracking-[0.1px] text-center text-gray-800">
              15
            </p>
            <p className="text-center font-montserrat text-gray-700">
              Countries Worldwide
            </p>
          </div>

 

          <div className="w-[238px] h-[104px] flex flex-col items-center justify-center gap-2">
            <p className="font-montserrat font-bold text-[58px] leading-[64px] tracking-[0.1px] text-center text-gray-800">
              100+
            </p>
            <p className="text-center font-montserrat text-gray-700">
              Top Partners
            </p>
          </div>
        </div>
      </section>


    <VideoCard />


<h2 className="text-2xl md:text-3xl font-bold text-center pt-20" >
        Meet Our Team
      </h2>
      <p className=" text-center pt-5 ">
        Problems trying to resolve the conflict between <br></br>
the two major realms of Classical physics: Newtonian mechanics </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-20 gap-6 mt-6 w-[1050px] mx-auto">
  {teamMembers.map((member, index) => (
    <div key={index} className="flex flex-col items-center text-center w-[316px] h-[383px]">
      <img
        src={member.img}
        alt={member.name}
        className="w-full h-auto object-cover"
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

<div className="bg-[#FAFAFA]  w-[1440px] h-[479px] mx-auto pt-20 ">
<h2 className="text-2xl md:text-3xl font-bold text-center" >
       Big Companies Are Here
      </h2>
      <p className=" text-center pt-5 ">
        Problems trying to resolve the conflict between <br></br>
the two major realms of Classical physics: Newtonian mechanics </p>


< Logo />

</div>


 <section className="relative w-full max-w-[1440px] h-[639px] mx-auto  bg-[#2A7CC7] flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 overflow-hidden">
        
        <div className="z-10 flex-1  max-w-[438px] h-[238px] text-center md:text-left gap-24">
          <p className="text-sm md:text-md font-semibold text-white uppercase mb-2">WORK WITH US</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Now Let’s grow Yours</h1>
          <h4 className="text-white mb-6 max-w-md mx-auto md:mx-0">
        The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th 
          </h4>
          <button className=" text-white font-semibold py-3 px-6 border-2 border-white rounded transition max-w-[130px] h-[52px]">
            Button
          </button>
        </div>


        <img 
          src={work} 
          alt="Happy woman"
          className="hidden md:block absolute top-0 right-0 w-[590px] h-[640px] object-cover z-10"
        />      

      </section>


















      
    </>
  );
}
