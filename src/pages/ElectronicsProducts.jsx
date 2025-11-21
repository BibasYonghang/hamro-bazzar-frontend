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
  Zap,
} from "lucide-react";

export default function ElectronicsProducts() {
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
        const res = await fetch("https://hamro-bazzar.onrender.com/api/electronics");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
        setTimeout(() => setIsVisible(true), 100);
      } catch (error) {
        console.error("Error fetching electronics products:", error);
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
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-lg text-gray-600">
            Loading electronics products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 py-16 text-white"
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
            <Zap className="h-8 w-8 animate-pulse" />
            <h1 className="text-4xl font-bold md:text-5xl">
              Electronics Store
            </h1>
          </div>
          <p
            className={`max-w-2xl text-xl text-blue-100 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Discover the latest in technology and electronics. From smartphones
            to laptops, find everything you need at unbeatable prices.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mx-auto px-3 py-8">
        <div
          className={`mb-8 rounded-lg bg-white p-6 shadow-md transition-all duration-1000 ${
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
                placeholder="Search electronics products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 py-3 pr-4 pl-10 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer rounded-lg border-2 border-gray-200 px-4 py-3 transition outline-none hover:cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded p-2 transition hover:cursor-pointer ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
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
          <div
            className={`rounded-lg bg-white py-16 text-center shadow-md transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
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
                className={`group transform overflow-hidden rounded-xl bg-white shadow-md hover:cursor-zoom-in hover:shadow-xl ${
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
                  className={`relative overflow-hidden bg-gray-100 ${
                    viewMode === "list"
                      ? "h-48 w-48 flex-shrink-0"
                      : "h-64 w-full"
                  }`}
                >
                  <img
                    src={product.image || "/placeholder-electronics.jpg"}
                    alt={product.name}
                    className="h-full w-full transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x400?text=Electronics";
                    }}
                  />
                  {product.price && (
                    <div className="absolute top-3 right-3 rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                      Rs. {product.price}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="mb-2">
                    <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                      {product.category || "Electronics"}
                    </span>
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800 transition group-hover:text-blue-600">
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
                        <div className="text-2xl font-bold text-blue-600">
                          Rs. {product.price}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/products/${product._id}`, {
                          state: { product },
                        });
                      }}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:cursor-pointer hover:bg-blue-700"
                      title="Add to cart"
                    >
                      See Details
                    </button>
                    <Link
                      to="/payment-choice"
                      state={{ product: product }}
                      className="rounded-lg bg-blue-800 px-4 py-2 text-white transition-colors hover:cursor-pointer hover:bg-blue-900"
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
