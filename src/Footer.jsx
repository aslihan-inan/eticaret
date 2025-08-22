import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="w-full bg-white text-gray-700">
     

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-40 h-[142px] border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-[24px] md:text-[32px] font-bold text-gray-900">Bandage</h1>
        <div className="flex space-x-4">
          <a href="#" className="text-blue-600 hover:text-gray-600">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-blue-600 hover:text-gray-600">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-blue-600 hover:text-gray-600">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

    

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-40 py-12 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      

        <div className="flex flex-col space-y-3">
          <h3 className="text-base font-bold text-gray-900">Company Info</h3>
          <a href="#" className="text-sm hover:text-blue-600">About Us</a>
          <a href="#" className="text-sm hover:text-blue-600">Carrier</a>
          <a href="#" className="text-sm hover:text-blue-600">We are hiring</a>
          <a href="#" className="text-sm hover:text-blue-600">Blog</a>
        </div>

       

        <div className="flex flex-col space-y-3">
          <h3 className="text-base font-bold text-gray-900">Legal</h3>
          <a href="#" className="text-sm hover:text-blue-600">About Us</a>
          <a href="#" className="text-sm hover:text-blue-600">Carrier</a>
          <a href="#" className="text-sm hover:text-blue-600">We are hiring</a>
          <a href="#" className="text-sm hover:text-blue-600">Blog</a>
        </div>

       

        <div className="flex flex-col space-y-3">
          <h3 className="text-base font-bold text-gray-900">Features</h3>
          <a href="#" className="text-sm hover:text-blue-600">Business Marketing</a>
          <a href="#" className="text-sm hover:text-blue-600">User Analytic</a>
          <a href="#" className="text-sm hover:text-blue-600">Live Chat</a>
          <a href="#" className="text-sm hover:text-blue-600">Unlimited Support</a>
        </div>



        <div className="flex flex-col space-y-3">
          <h3 className="text-base font-bold text-gray-900">Resources</h3>
          <a href="#" className="text-sm hover:text-blue-600">iOS & Android</a>
          <a href="#" className="text-sm hover:text-blue-600">Watch a Demo</a>
          <a href="#" className="text-sm hover:text-blue-600">Customers</a>
          <a href="#" className="text-sm hover:text-blue-600">API</a>
        </div>



        <div className="flex flex-col space-y-4">
          <h3 className="text-base font-bold text-gray-900">Get In Touch</h3>
          <form className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="px-4 py-2 w-full sm:w-auto text-sm border rounded focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500">Lore Imp sum dolor Amit</p>
        </div>
      </div>

      
      
      <div className="flex justify-center items-center h-[74px] text-sm text-gray-600 px-4">
        <p className="text-center">
          <strong>Made With Love By Finland</strong> All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
