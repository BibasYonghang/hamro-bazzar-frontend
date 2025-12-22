import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

// Optionally, define a fallbackProducts array here if not defined elsewhere
const fallbackProducts = [];

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/featured-products`);
        console.log(`${API_BASE}/api/featured-products`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setFeaturedProducts(data);
        } else {
          setFeaturedProducts(fallbackProducts);
        }
      } catch (error) {
        console.error(error);
        setFeaturedProducts(fallbackProducts);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <section className="mx-auto mt-4 w-full rounded-2xl bg-white px-3 py-6 shadow-lg sm:px-3">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Featured Products
          </h2>
        </div>
        <Link
          to="/all-products"
          className="group hidden items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-700 sm:flex"
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
        {featuredProducts.map((product, idx) => {
          const { name, image, icon, _id } = product;
          return (
            <div
              key={_id || idx}
              className={`group relative w-full transform overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: `${idx * 50}ms`,
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/products/${_id}`, { state: { product } })
              }
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/products/${_id}`, { state: { product } });
                }
              }}
            >
              {/* Image Container */}
              <div className="relative h-[30vh] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 sm:h-[35vh]">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=Product";
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                {/* Icon Badge */}
                <div className="absolute top-2 right-2 transform rounded-full bg-white/90 p-2 text-xl opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:opacity-100">
                  {icon}
                </div>
              </div>

              {/* Product Name */}
              <div className="p-3 sm:p-4">
                <h3 className="text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600 sm:text-base">
                  {name}
                </h3>
              </div>

              {/* Hover Arrow */}
              <div className="absolute right-3 bottom-3 translate-x-[-10px] transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile View All Button */}
      <div className="mt-6 text-center sm:hidden">
        <Link
          to="/all-products"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-blue-700"
        >
          View All Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
