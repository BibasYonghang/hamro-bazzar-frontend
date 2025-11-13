import React from "react";
import HeroSection from "../components/home/HeroSection";
import ProductList from "../components/shared/ProductList";
import products from "../data/products";
import LimitedOffer from "../components/home/LimitedOffer";

const Home = ({ onAddToCart }) => {
  const featured = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);

  return (
    <>
      <HeroSection />
      <div className="w-[94vw] mx-auto">
        <section className="mt-6">
          <h2 className=" font-bold mb-1
          sm:text-3xl text-2xl
          sm:mx-1  mx-2
          ">Featured Products</h2>
          <ProductList products={featured} onAddToCart={onAddToCart} />
        </section>
        <section className="mt-6">
          <h2 className="font-bold mb-1
          sm:text-3xl text-2xl
          sm:mx-1  mx-2
          ">Best Sellers</h2>
          <ProductList products={bestSellers} onAddToCart={onAddToCart} />
        </section>
        <LimitedOffer />
      </div>
    </>

  );
};

export default Home;
