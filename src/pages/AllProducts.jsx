import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
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

  // Get max price for range slider
  const maxPrice = Math.max(...products.map((p) => p.price || 0), 1000);

  // Update price range when products load
  useEffect(() => {
    if (products.length > 0) {
      const calculatedMax = Math.max(...products.map((p) => p.price || 0), 1000);
      if (priceRange[1] === 10000 || priceRange[1] < calculatedMax) {
        setPriceRange([0, calculatedMax]);
      }
    }
  }, [products.length]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Try to fetch all products from /api/products
        const res = await fetch("http://localhost:5000/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          // If that doesn't work, fetch from all category endpoints
          const [electronics, furniture, personalCare] = await Promise.all([
            fetch("http://localhost:5000/api/electronics").then((r) => r.json()).catch(() => []),
            fetch("http://localhost:5000/api/home-furniture").then((r) => r.json()).catch(() => []),
            fetch("http://localhost:5000/api/personal-care").then((r) => r.json()).catch(() => []),
          ]);
          setProducts([...electronics, ...furniture, ...personalCare]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback: try individual endpoints
        try {
          const [electronics, furniture, personalCare] = await Promise.all([
            fetch("http://localhost:5000/api/electronics").then((r) => r.json()).catch(() => []),
            fetch("http://localhost:5000/api/home-furniture").then((r) => r.json()).catch(() => []),
            fetch("http://localhost:5000/api/personal-care").then((r) => r.json()).catch(() => []),
          ]);
          setProducts([...electronics, ...furniture, ...personalCare]);
        } catch (fallbackError) {
          console.error("Fallback fetch also failed:", fallbackError);
        }
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
      { threshold: 0.1 }
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
  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
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
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-xl font-medium">Loading all products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div
            className={`flex items-center gap-3 mb-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <Sparkles className="w-10 h-10 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold">All Products</h1>
          </div>
          <p
            className={`text-xl md:text-2xl text-blue-100 max-w-3xl mb-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Discover our complete collection of premium products. Everything you need, all in one place.
          </p>
          <div
            className={`flex items-center gap-6 text-blue-100 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-lg font-medium">{products.length}+ Products</span>
            </div>
            <span className="text-blue-200">•</span>
            <span className="text-lg font-medium">{categories.length - 1} Categories</span>
            <span className="text-blue-200">•</span>
            <span className="text-lg font-medium">Premium Quality</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Bar */}
        <div
          className={`bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, categories, descriptions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full lg:w-48 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition cursor-pointer text-lg"
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
                className="w-full lg:w-48 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition cursor-pointer text-lg"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 border-2 border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg transition ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg transition ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition font-medium"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Price Range</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-1">Min Price</label>
                      <input
                        type="number"
                        min="0"
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value) || 0, priceRange[1]), priceRange[1]])}
                        className="w-32 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-1">Max Price</label>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Math.max(parseInt(e.target.value) || maxPrice, priceRange[0])])}
                        className="w-32 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
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
              Showing <span className="font-semibold text-blue-600">{filteredProducts.length}</span>{" "}
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
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        {paginatedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md border border-gray-100">
            <Search className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-3xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 text-lg mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setPriceRange([0, maxPrice]);
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
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
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {paginatedProducts.map((product, idx) => (
                <Link
                  to={`/products/${product._id}`}
                  key={product._id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 ${
                    viewMode === "list" ? "flex gap-6" : ""
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDelay: `${400 + idx * 50}ms`,
                  }}
                >
                  {/* Product Image */}
                  <div
                    className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${
                      viewMode === "list" ? "w-64 h-64 flex-shrink-0" : "w-full h-72"
                    }`}
                  >
                    <img
                      src={product.image || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x400?text=Product";
                      }}
                    />
                    {product.price && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        ${product.price}
                      </div>
                    )}
                    {product.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                    <div>
                      <div className="mb-3">
                        <span
                          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
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
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div>
                        {product.price && (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-blue-600">
                              ${product.price}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-sm text-gray-400 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        )}
                        {product.rating && (
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600 font-medium">
                              {product.rating}
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart logic here
                        }}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        title="Add to cart"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
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
                        className={`px-4 py-2 rounded-lg border transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
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
