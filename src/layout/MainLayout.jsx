import React from "react";
import Header from "./Header";
import Footer from "../Footer";
import Ndark from "../Ndark";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Ndark />
      <Header />
      
      {/* Main içerik alanı */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
