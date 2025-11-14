import React, { useEffect, useRef } from "react";
import HeroSection from "../components/home/HeroSection.jsx";
import LimitedOffer from "../components/home/LimitedOffer.jsx";
import FeaturedProducts from "../components/home/FeaturedProducts.jsx";
import ProductList from "../components/home/ProductList.jsx";

const Home = ({ onAddToCart }) => {
  const featuredRef = useRef(null);
  const productListRef = useRef(null);
  const limitedOfferRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    [featuredRef, productListRef, limitedOfferRef].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      [featuredRef, productListRef, limitedOfferRef].forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="overflow-x-hidden bg-blue-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <div
        ref={featuredRef}
        className="flex w-full flex-col bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50 px-[1vw] py-8 opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-7xl mx-auto w-full">
          <FeaturedProducts />
        </div>
      </div>

      {/* Product List Section */}
      <div
        ref={productListRef}
        className="flex w-full flex-col bg-gradient-to-b from-blue-50 to-blue-100 px-[1vw] py-8 opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-7xl mx-auto w-full">
          <ProductList />
        </div>
      </div>

      {/* Limited Offer Section */}
      <div
        ref={limitedOfferRef}
        className="relative bg-gradient-to-b from-blue-100 via-blue-50 to-white min-h-[90vh] py-12 opacity-0 transition-opacity duration-1000"
      >
        <div className="absolute bottom-30 z-10 h-[40vh] w-full bg-gradient-to-t from-white to-transparent px-[3vw] pointer-events-none"></div>
        <div className="absolute bottom-0 h-[20vh] w-full bg-white pointer-events-none"></div>
        <div className="relative z-20 w-full">
          <LimitedOffer />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;
