import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Sparkles,
  Heart,
} from "lucide-react";

export default function offerProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const productsRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/offered-products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
        setTimeout(() => setIsVisible(true), 100);
      } catch (error) {
        console.error("Error fetching personal care products:", error);
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

    if (heroRef.current) observer.observe(heroRef.current);
    if (productsRef.current) observer.observe(productsRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (productsRef.current) observer.unobserve(productsRef.current);
    };
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name?.localeCompare(b.name);
      return 0;
    });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-sky-600"></div>
          <p className="text-lg text-gray-600">Loading Offered products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-sky-600 to-sky-700 py-16 text-white"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-32 w-32 animate-pulse rounded-full bg-white blur-3xl"></div>
          <div
            className="absolute right-10 bottom-10 h-40 w-40 animate-pulse rounded-full bg-white blur-3xl"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div
            className={`mb-4 flex items-center gap-3 transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <Sparkles className="h-8 w-8 animate-pulse" />
            <h1 className="text-4xl font-bold md:text-5xl">Offered Products</h1>
          </div>
          <p
            className={`max-w-2xl text-xl text-sky-100 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Hurry! Grab amazing discounts on our opening ceremony products
            before they’re gone!{" "}
          </p>
          <div
            className={`mt-6 flex items-center gap-2 text-sky-100 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <Heart className="h-5 w-5 animate-pulse fill-sky-200" />
            <span className="text-lg">
              Premium Quality • Natural Ingredients • Affordable Prices
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mx-auto px-3 py-8">
        <div
          className={`mb-8 rounded-xl border border-sky-100 bg-white p-6 shadow-lg transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex flex-col items-center gap-4 md:flex-row">
            {/* Search Bar */}
            <div className="relative w-full flex-1">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search personal care products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 py-3 pr-4 pl-10 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-sky-200"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer rounded-lg border-2 border-gray-200 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-sky-200"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 rounded-lg border-2 border-gray-200 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded p-2 transition hover:cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-sky-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded p-2 transition hover:cursor-pointer ${
                  viewMode === "list"
                    ? "bg-sky-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Showing{" "}
            <span className="font-semibold text-blue-600">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-sky-100 bg-white py-16 text-center shadow-md">
            <Search className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-2xl font-semibold text-gray-700">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div
            ref={productsRef}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-4"
            }
          >
            {filteredProducts.map((product, idx) => (
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                className={`group transform overflow-hidden rounded-xl border border-sky-50 bg-white shadow-md hover:cursor-zoom-in hover:border-sky-200 hover:shadow-2xl ${
                  viewMode === "list" ? "flex gap-4" : ""
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: `${400 + idx * 50}ms`,
                }}
              >
                {/* Product Image */}
                <div
                  className={`relative overflow-hidden bg-gradient-to-br from-sky-50 to-purple-50 ${
                    viewMode === "list"
                      ? "h-48 w-48 flex-shrink-0"
                      : "h-64 w-full"
                  }`}
                >
                  <img
                    src={product.image || "/placeholder-personal-care.jpg"}
                    alt={product.name}
                    className="h-full w-full transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x400?text=Personal+Care";
                    }}
                  />
                  {product.price && (
                    <div className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-lg">
                      Rs. {product.price}
                    </div>
                  )}
                  {/* Badge for featured/new products */}
                  {product.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-bold text-sky-600">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="mb-2">
                    <span className="inline-block rounded bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-700">
                      {product.category || "Personal Care"}
                    </span>
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800 transition group-hover:text-sky-600">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      {product.description}
                    </p>
                  )}
                  <div>
                    {product.price && (
                      <div>
                        <div className="text-2xl font-bold text-sky-600">
                          Rs.{Math.floor((80 / 100) * product.price)}
                        </div>
                        <div className="text-lg font-bold text-gray-600">
                          <span className="mr-3 line-through">
                            Rs.{Math.floor(product.price)}{" "}
                          </span>{" "}
                          20% OFF
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/products/${product._id}`, {
                          state: { product },
                        });
                      }}
                      className="transform rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 px-7 py-2 text-white shadow-md transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:from-sky-700 hover:to-blue-700 hover:shadow-lg"
                      title="Add to cart"
                    >
                      See Details
                    </button>
                    <Link
                      to="/payment-choice"
                      className="transform rounded-lg bg-gradient-to-r from-sky-800 to-blue-900 px-7 py-2 text-white shadow-md transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:from-sky-700 hover:to-blue-700 hover:shadow-lg"
                      title="Add to cart"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
