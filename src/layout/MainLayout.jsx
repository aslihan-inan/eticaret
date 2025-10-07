
import React from "react";
import Header from "./Header";
import Footer from "../Footer";
import Ndark from "../Ndark";


const MainLayout = ({ children }) => {
  return (
    <div>
        <Ndark />      
       <Header/>
       <main className="flex-grow"> {children}</main>
        <Footer />
    </div>
  );
};

export default MainLayout;