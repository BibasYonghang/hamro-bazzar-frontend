import React from "react";
import HeroSection from "../components/home/HeroSection.jsx";
import LimitedOffer from "../components/home/LimitedOffer.jsx";
import FeaturedProducts from "../components/home/FeaturedProducts.jsx";
import ProductList from "../components/home/ProductList.jsx";

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="flex w-full flex-col bg-blue-100 px-[1vw]">
        <div>
          <FeaturedProducts />
          <ProductList />
        </div>
      </div>
      <div className="relative bg-blue-100 h-[90vh]">
        <div className="absolute bottom-30 z-10 h-[40vh] w-full bg-gradient-to-t from-white to-transparent px-[3vw]"></div>
        <div className="absolute bottom-0 h-[20vh] w-full bg-white"></div>
        <div className="absolute bottom-0 z-20 grid h-[90vh] w-full">
          <LimitedOffer />
        </div>
      </div>
    </>
  );
};

export default Home;
