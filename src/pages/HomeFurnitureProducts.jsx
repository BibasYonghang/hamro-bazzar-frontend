import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Grid, List, Star, ShoppingCart, Home, Sofa } from "lucide-react";

export default function HomeFurnitureProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/home-furniture");
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
      { threshold: 0.1 }
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
    .filter((product) =>
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name?.localeCompare(b.name);
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading home furniture products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div
            className={`flex items-center gap-3 mb-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <Home className="w-8 h-8 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold">Home Furniture & Décor</h1>
          </div>
          <p
            className={`text-xl text-amber-100 max-w-2xl mb-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Transform your living space with our exquisite collection of home furniture. 
            From modern minimalism to classic elegance, find pieces that make your house a home.
          </p>
          <div
            className={`flex items-center gap-4 text-amber-100 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex items-center gap-2">
              <Sofa className="w-5 h-5" />
              <span className="text-lg">Premium Quality</span>
            </div>
            <span className="text-amber-200">•</span>
            <span className="text-lg">Comfort & Style</span>
            <span className="text-amber-200">•</span>
            <span className="text-lg">Affordable Luxury</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div
          className={`bg-white rounded-xl shadow-lg p-6 mb-8 border border-amber-100 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search furniture & home décor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="text-gray-500 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 border-2 border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition ${
                  viewMode === "grid"
                    ? "bg-amber-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition ${
                  viewMode === "list"
                    ? "bg-amber-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Showing <span className="font-semibold text-amber-600">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md border border-amber-100">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div
            ref={productsRef}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredProducts.map((product, idx) => (
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-amber-50 hover:border-amber-200 transform hover:-translate-y-2 ${
                  viewMode === "list" ? "flex gap-4" : ""
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
                  className={`relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 ${
                    viewMode === "list" ? "w-48 h-48 flex-shrink-0" : "w-full h-64"
                  }`}
                >
                  <img
                    src={product.image || "/placeholder-furniture.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x400?text=Home+Furniture";
                    }}
                  />
                  {product.price && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      ${product.price}
                    </div>
                  )}
                  {/* Badge for featured/new products */}
                  {product.featured && (
                    <div className="absolute top-3 left-3 bg-white text-amber-600 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                      <Home className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="mb-2">
                    <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded">
                      {product.category || "Home Furniture"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      {product.price && (
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-amber-600">
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
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic here
                      }}
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white p-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                      title="Add to cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
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
