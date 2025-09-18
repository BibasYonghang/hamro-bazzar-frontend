import React from "react";
import HeroSection from "../components/HeroSection";
import ProductList from "../components/ProductList";
import products from "../data/products";
import Promotion from "../components/Promotion";
import Testimonials from "../components/Testimonials";
import LimitedOffer from "../components/LimitedOffer";
import Newsletter from "../components/Newsletter";
import BlogSection from "../components/BlogSection";

const Home = ({ onAddToCart }) => {
  const featured = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);

  return (
    <>
      <HeroSection />
      <div className="w-[94vw] mx-auto">
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <ProductList products={featured} onAddToCart={onAddToCart} />
        </section>
        <Promotion />
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Best Sellers</h2>
          <ProductList products={bestSellers} onAddToCart={onAddToCart} />
        </section>
        <Testimonials />
        <LimitedOffer />
        <Newsletter />

      </div>
    </>

  );
};

export default Home;
