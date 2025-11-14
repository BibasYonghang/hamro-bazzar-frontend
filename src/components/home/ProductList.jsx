import { ArrowRight, TrendingUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const categoryLinks = {
    Electronics: "/electronics",
    "Personal Care": "/personal-care",
    Gaming: "/gaming",
    "Home Furniture": "/home-furniture",
  };

  const featuredProductsDiv = [
    {
      name: "Electronics",
      image: "/featured-products-image/electronics.png",
      link: "/electronics",
      icon: "⚡",
    },
    {
      name: "Personal Care",
      image: "/featured-products-image/personal-care.png",
      link: "/personal-care",
      icon: "✨",
    },
    {
      name: "Gaming",
      image: "/featured-products-image/gaming.png",
      link: "/gaming",
      icon: "🎮",
    },
    {
      name: "Home Furniture",
      image: "/featured-products-image/home-furniture.png",
      link: "/home-furniture",
      icon: "🏠",
    },
  ];

  return (
    <section className="mx-auto mt-4 w-full">
      {/* Section Header */}
      <div className="mb-6 flex items-center gap-3 px-3">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Shop by Category
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {featuredProductsDiv.map(({ name, image, link, icon }, idx) => {
          return (
            <div
              key={idx}
              className={`w-full bg-white rounded-2xl shadow-lg p-4 sm:p-6 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${idx * 100}ms`,
              }}
            >
              {/* Category Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{icon}</span>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {name}
                  </h1>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-3 py-2">
                {[1, 2, 3, 4].map((item) => (
                  <Link
                    key={item}
                    to={link}
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100"
                  >
                    <div className="relative h-[23vh] sm:h-[25vh] overflow-hidden">
                      <img
                        src={image}
                        alt={`${name} product ${item}`}
                        className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/200x200?text=Product";
                        }}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
                    </div>
                    <h3 className="py-2 px-1 text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                      {name} {item}
                    </h3>
                  </Link>
                ))}
              </div>

              {/* See All Link */}
              <Link
                to={link}
                className="group mt-4 flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>See All</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
