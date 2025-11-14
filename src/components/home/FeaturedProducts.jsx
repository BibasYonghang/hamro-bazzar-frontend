import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    {
      name: "All Products",
      image: "/featured-products-image/electronics.png",
      link: "/all-products",
      icon: "🛍️",
    },
    {
      name: "Collections",
      image: "/featured-products-image/home-furniture.png",
      link: "/collections",
      icon: "📦",
    },
  ];

  return (
    <section className="mx-auto mt-4 w-full bg-white rounded-2xl shadow-lg px-3 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Featured Products
          </h2>
        </div>
        <Link
          to="/all-products"
          className="hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
        {featuredProductsDiv.map(({ name, image, link, icon }, idx) => {
          return (
            <Link
              key={idx}
              to={link}
              className={`group relative w-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${idx * 50}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative h-[30vh] sm:h-[35vh] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=Product";
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon Badge */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 text-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 opacity-0 group-hover:opacity-100">
                  {icon}
                </div>
              </div>

              {/* Product Name */}
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                  {name}
                </h3>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile View All Button */}
      <div className="mt-6 sm:hidden text-center">
        <Link
          to="/all-products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          View All Products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

{
  /* <div className="rounded bg-white p-6 shadow">
            {product.map(({ image, name, category, price, description }, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-8 bg-blue-600 text-black md:flex-row"
                >
                  <img
                    src={image}
                    alt={name}
                    className="h-64 rounded object-contain"
                  />
                  <div>
                    <h2 className="mb-2 text-3xl font-bold">{name}</h2>
                    <p className="mb-2 text-gray-500">{category}</p>
                    <p className="mb-4 text-xl font-bold text-blue-600">
                      ${price}
                    </p>
                    <p className="mb-6">{description}</p>
                    <button className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div> */
}
