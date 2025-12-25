import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  SlidersHorizontal,
  X,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const navigate = useNavigate();
  
  const API_BASE = import.meta.env.VITE_BASE_URL;

  // Get max price for range slider - useMemo to optimize
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    const prices = products.map((p) => p.price || 0);
    return Math.max(...prices, 1000);
  }, [products]);

  // Update price range when products load
  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, [products.length, maxPrice]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Try to fetch all products from /products
        const res = await fetch(
          `${API_BASE}/all-products`,
        );
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          // If that doesn't work, fetch from all category endpoints
          const [electronics, furniture, gaming, personalCare] =
            await Promise.all([
              fetch(`${API_BASE}/electronics`)
                .then((r) => r.json())
                .catch(() => []),
              fetch(`${API_BASE}/home-furniture`)
                .then((r) => r.json())
                .catch(() => []),
              fetch(`${API_BASE}/gaming`)
                .then((r) => r.json())
                .catch(() => []),
              fetch(`${API_BASE}/personal-care`)
                .then((r) => r.json())
                .catch(() => []),
            ]);
          setProducts([
            ...electronics,
            ...furniture,
            ...gaming,
            ...personalCare,
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Trigger animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

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

    setTimeout(() => {
      if (heroRef.current) observer.observe(heroRef.current);
      if (productsRef.current) observer.observe(productsRef.current);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (productsRef.current) observer.unobserve(productsRef.current);
    };
  }, [products.length]);

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-xl font-medium text-gray-600">
            Loading all products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20 text-white"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-64 w-64 animate-pulse rounded-full bg-white blur-3xl"></div>
          <div
            className="absolute right-20 bottom-20 h-80 w-80 animate-pulse rounded-full bg-white blur-3xl"
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
            <Sparkles className="h-10 w-10 animate-pulse" />
            <h1 className="text-4xl font-bold md:text-6xl">All Products</h1>
          </div>
          <p
            className={`mb-6 max-w-3xl text-md text-blue-100 transition-all duration-1000 md:text-xl ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Discover our complete collection of premium products. Everything you
            need, all in one place.
          </p>
          <div
            className={`flex items-center md:gap-6 gap-2 text-blue-100 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex items-center gap-1">
              <TrendingUp className="h-6 w-6" />
              <span className="md:text-lg text-md font-medium">
                {products.length}+ Products
              </span>
            </div>
            <span className="text-blue-200">•</span>
            <span className="md:text-lg text-md font-medium">
              {categories.length - 1} Categories
            </span>
            <span className="text-blue-200">•</span>
            <span className="md:text-lg text-md font-medium">Premium Quality</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-2 py-8">
        {/* Search and Filter Bar */}
        <div
          className={`mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            {/* Search Bar */}
            <div className="relative w-full flex-1">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search products, categories, descriptions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-12 text-lg transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full cursor-pointer rounded-xl border-2 border-gray-200 px-4 py-3 text-lg transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 lg:w-48"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full cursor-pointer rounded-xl border-2 border-gray-200 px-4 py-3 text-lg transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 lg:w-48"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 rounded-xl border-2 border-gray-200 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-3 transition ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-lg p-3 transition ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-3 font-medium transition hover:bg-gray-200"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Price Range
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="mb-4 flex justify-between">
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-medium text-gray-600">
                        Min Price
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            Math.min(
                              parseInt(e.target.value) || 0,
                              priceRange[1],
                            ),
                            priceRange[1],
                          ])
                        }
                        className="w-32 rounded-lg border-2 border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-sm font-medium text-gray-600">
                        Max Price
                      </label>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            Math.max(
                              parseInt(e.target.value) || maxPrice,
                              priceRange[0],
                            ),
                          ])
                        }
                        className="w-32 rounded-lg border-2 border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>$0</span>
                    <span>${maxPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Count and Active Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-blue-600">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
              {selectedCategory !== "all" && (
                <span className="ml-2">
                  in <span className="font-semibold">{selectedCategory}</span>
                </span>
              )}
            </div>
            {(selectedCategory !== "all" || priceRange[1] < maxPrice) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, maxPrice]);
                }}
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        {paginatedProducts.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-md">
            <Search className="mx-auto mb-4 h-20 w-20 text-gray-300" />
            <h3 className="mb-2 text-3xl font-semibold text-gray-700">
              No products found
            </h3>
            <p className="mb-6 text-lg text-gray-500">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setPriceRange([0, maxPrice]);
              }}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div
              ref={productsRef}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-4"
              }
            >
              {paginatedProducts.map((product, idx) => (
                <div
                  key={product._id}
                  className={`group transform overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg hover:cursor-zoom-in hover:border-blue-200 ${
                    viewMode === "list" ? "flex gap-6" : ""
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
                    className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${
                      viewMode === "list"
                        ? "h-64 w-64 flex-shrink-0"
                        : "h-72 w-full"
                    }`}
                  >
                    <img
                      src={product.image || "/placeholder.jpg"}
                      alt={product.name}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x400?text=Product";
                      }}
                    />
                    {product.price && (
                      <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                        Rs. {product.price}
                      </div>
                    )}
                    {product.featured && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-gray-900 shadow-md">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div
                    className={`p-6 ${viewMode === "list" ? "flex flex-1 flex-col justify-between" : ""}`}
                  >
                    <div>
                      <div className="mb-3">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            product.category === "Electronics"
                              ? "bg-blue-100 text-blue-700"
                              : product.category === "Personal Care"
                                ? "bg-pink-100 text-pink-700"
                                : product.category === "Home Furniture"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {product.category || "Product"}
                        </span>
                      </div>
                      <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-800 transition group-hover:text-blue-600">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div>
                      {product.price && (
                        <div className="">
                          <div className="text-2xl font-bold text-blue-600">
                            Rs. {product.price}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/products/${product._id}`, {
                            state: { product },
                          });
                        }}
                        clas
                        className="transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-2 text-white shadow-md transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                        title="Add to cart"
                      >
                        See Details
                      </button>
                      <Link
                        to="/payment-choice"
                        state={{ product: product }}
                        className="transform rounded-lg bg-gradient-to-r from-purple-800 to-indigo-900 px-7 py-2 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl"
                        title="Add to cart"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg border border-gray-300 px-4 py-2 transition hover:cursor-pointer hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, idx) => {
                  const page = idx + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`rounded-lg border px-4 py-2 transition hover:cursor-pointer ${
                          currentPage === page
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-gray-300 px-4 py-2 transition hover:cursor-pointer hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
