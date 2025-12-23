import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";

export default function Collections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const API_BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
        // Trigger visibility after data loads
        setTimeout(() => setIsVisible(true), 100);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [products]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-lg text-gray-600">Loading collections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section ref={sectionRef} className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-4 flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
              All Collections
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Discover our complete range of premium products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, idx) => (
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              className={`group transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: `${idx * 50}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 sm:h-56">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x400?text=Product";
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                  {product.name}
                </h3>
                <p className="mb-2 text-sm text-gray-500">{product.category}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-blue-600">
                    ${product.price}
                  </p>
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="py-20 text-center">
            <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-2xl font-semibold text-gray-700">
              No products found
            </h3>
            <p className="text-gray-500">
              Check back later for new collections!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
