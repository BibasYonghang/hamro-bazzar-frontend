import { ArrowRight, TrendingUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [isVisible, setIsVisible] = useState(false);

  const API_BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Maintain separate product states for each category
  const [categoryProducts, setCategoryProducts] = useState({
    Electronics: [],
    "Personal Care": [],
    Gaming: [],
    "Home Furniture": [],
  });

  const featuredProductsDiv = [
    {
      name: "Electronics",
      image: "/featured-products-image/electronics.png",
      link: "/electronics",
      icon: "⚡",
      api: `${API_BASE}/category-electronics`,
    },
    {
      name: "Personal Care",
      image: "/featured-products-image/personal-care.png",
      link: "/personal-care",
      icon: "✨",
      api: `${API_BASE}/category-personal-care`,
    },
    {
      name: "Gaming",
      image: "/featured-products-image/gaming.png",
      link: "/gaming",
      icon: "🎮",
      api: `${API_BASE}/category-gaming`,
    },
    {
      name: "Home Furniture",
      image: "/featured-products-image/home-furniture.png",
      link: "/home-furniture",
      icon: "🏠",
      api: `${API_BASE}/category-home-furniture`,
    },
  ];

  // Fetch all products for each category once when mounted
  useEffect(() => {
    featuredProductsDiv.forEach((category) => {
      fetch(category.api)
        .then((res) => res.json())
        .then((data) => {
          setCategoryProducts((prev) => ({
            ...prev,
            [category.name]: Array.isArray(data) ? data : [],
          }));
        })
        .catch((err) => {
          setCategoryProducts((prev) => ({
            ...prev,
            [category.name]: [],
          }));
          console.log(err);
        });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <section className="mx-auto w-full">
      {/* Section Header */}
      <div className="mb-6 flex items-center gap-3 px-3">
        <TrendingUp className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Shop by Category
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {featuredProductsDiv.map(({ name, image, link, icon }, idx) => {
          const products = categoryProducts[name] || [];

          return (
            <div
              key={idx}
              className={`w-full transform rounded-2xl bg-white p-4 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-6 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: `${idx * 100}ms`,
              }}
            >
              {/* Category Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{icon}</span>
                  <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
                    {name}
                  </h1>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-3 py-2">
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((item) => (
                    <Link
                      key={item._id || item.id || item.name}
                      to={link}
                      className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100"
                    >
                      <div className="relative h-[23vh] overflow-hidden sm:h-[25vh]">
                        <img
                          src={
                            item.image || "/featured-products-image/default.png"
                          }
                          alt={item.name ? `${name} - ${item.name}` : `Product`}
                          className="h-full w-full transform transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/200x200?text=Product";
                          }}
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30"></div>
                      </div>
                      <h3 className="px-1 py-2 text-xs font-semibold text-gray-700 transition-colors group-hover:text-blue-600 sm:text-sm">
                        {item.name || "Unnamed Product"}
                      </h3>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-2 py-6 text-center text-gray-400">
                    <span>No products found.</span>
                  </div>
                )}
              </div>

              {/* See All Link */}
              <Link
                to={link}
                className="group mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 sm:text-base"
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
