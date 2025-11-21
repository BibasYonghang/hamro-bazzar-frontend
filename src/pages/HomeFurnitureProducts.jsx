import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Home,
  Sofa,
} from "lucide-react";

export default function HomeFurnitureProducts() {
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
        const res = await fetch("https://hamro-bazzar.onrender.com/api/home-furniture");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
        setTimeout(() => setIsVisible(true), 100);
      } catch (error) {
        console.error("Error fetching home furniture products:", error);
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

  // Filter & Sort
  const filteredProducts = products
    .filter(
      (product) =>
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-amber-600"></div>
          <p className="text-lg text-gray-600">
            Loading home furniture products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 py-16 text-white"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-40 w-40 animate-pulse rounded-full bg-white blur-3xl"></div>
          <div
            className="absolute right-20 bottom-20 h-48 w-48 animate-pulse rounded-full bg-white blur-3xl"
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
            <Home className="h-8 w-8 animate-pulse" />
            <h1 className="text-4xl font-bold md:text-5xl">
              Home Furniture & Décor
            </h1>
          </div>
          <p
            className={`mb-4 max-w-2xl text-xl text-amber-100 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Transform your living space with beautiful, premium-quality home
            furniture.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mx-auto px-3 py-4">
        <div
          className={`mb-8 rounded-xl border border-amber-100 bg-white p-6 shadow-lg transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex flex-col items-center gap-4 md:flex-row">
            {/* Search */}
            <div className="relative w-full flex-1">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search furniture & home décor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 py-3 pr-4 pl-10 transition outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border-2 border-gray-200 px-4 py-3 transition hover:cursor-pointer focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex gap-2 rounded-lg border-2 border-gray-200 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded p-2 hover:cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-amber-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded p-2 hover:cursor-pointer ${
                  viewMode === "list"
                    ? "bg-amber-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div
          ref={productsRef}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "space-y-4"
          }
        >
          {filteredProducts.map((product, idx) => (
            <div
              key={product._id}
              className={`group overflow-hidden rounded-xl border border-amber-50 bg-white shadow-md transition-all duration-500 hover:border-amber-200 hover:shadow-2xl ${
                viewMode === "list" ? "flex gap-4" : ""
              }`}
              style={{ transitionDelay: `${300 + idx * 60}ms` }}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 ${
                  viewMode === "list"
                    ? "h-48 w-48 flex-shrink-0"
                    : "h-64 w-full"
                }`}
              >
                <img
                  src={product.image || "/placeholder-furniture.jpg"}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x400?text=Furniture";
                  }}
                />
                <div className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-3 py-1 text-sm font-semibold text-white shadow-lg">
                  Rs. {product.price}
                </div>
              </div>

              {/* Info */}
              <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                <span className="mb-1 inline-block rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                  {product.category}
                </span>

                <h3 className="mb-2 text-lg font-bold text-gray-800 transition group-hover:text-amber-600">
                  {product.name}
                </h3>

                <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                  {product.description}
                </p>

                {/* Price + Ratings */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    {product.price && (
                      <div>
                        <div className="text-2xl font-bold text-orange-600">
                          Rs.{product.price}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BUY + CART BUTTONS */}
                </div>
                <div className="mt-4 flex justify-between">
                  {/* Add to Cart */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/products/${product._id}`, {
                        state: { product },
                      });
                    }}
                    className="flex items-center justify-center gap-1 rounded-lg bg-amber-600 px-7 py-2 text-sm text-white shadow-md hover:cursor-pointer hover:bg-amber-700"
                  >
                    See Details
                  </button>

                  {/* Buy Now */}
                  <Link
                    to="/payment-choice"
                    state={{ product: product }}
                    className="rounded-lg bg-orange-600 px-7 py-2 text-sm text-white shadow-md hover:cursor-pointer hover:bg-orange-700"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
