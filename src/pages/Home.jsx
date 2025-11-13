import React from "react";
import HeroSection from "../components/home/HeroSection.jsx";
import LimitedOffer from "../components/home/LimitedOffer.jsx";
import FeaturedProducts from "../components/home/FeaturedProducts.jsx";
import ProductList from "../components/home/ProductList.jsx";

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="flex w-full flex-col bg-blue-50 px-[1vw]">
        <FeaturedProducts />
        <ProductList />
        <LimitedOffer />
      </div>
    </>
  );
};

export default Home;
