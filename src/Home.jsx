import React from "react";
import Hero from './Hero.jsx';
import Ndark from './Ndark.jsx';
import Nlight from './Nlight.jsx';
import ProductGrid from './ProductGrid.jsx';
import Logo from './Logo.jsx';
import Best from '.Best.jsx';
import FeaturedProducts from './FeaturedProducts.jsx';
import BestServices from './BestServices.jsx';
import Featured from './Featured.jsx';
import Footer from './Footer.jsx';

export default function Home() {
  return (
    <>
    
      <Hero />
      <Logo />
      <ProductGrid />
      <Best />
      <FeaturedProducts />
      <BestServices />
      <Featured />
  
    </>
  );
}
