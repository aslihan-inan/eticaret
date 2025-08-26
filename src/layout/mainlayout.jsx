
import React from "react";
import Header from "./Header";
import Footer from "../Footer";

export default function MainLayout({ children }) {
  return (
    <div>
     <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}