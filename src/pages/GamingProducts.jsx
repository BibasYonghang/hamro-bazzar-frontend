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
  Gamepad2,
  Trophy,
  Zap,
} from "lucide-react";

export default function GamingProducts() {
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
        // Try gaming endpoint first, fallback to products with Gaming category filter
        const res = await fetch("http://localhost:5000/api/gaming");
        if (!res.ok) {
          // If gaming endpoint doesn't exist, fetch all products and filter
          const allProductsRes = await fetch(
            "http://localhost:5000/api/products",
          );
          const allProducts = await allProductsRes.json();
          const gamingProducts = allProducts.filter(
            (p) =>
              p.category?.toLowerCase().includes("gaming") ||
              p.name?.toLowerCase().includes("gaming"),
          );
          setProducts(gamingProducts);
        } else {
          const data = await res.json();
          setProducts(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gaming products:", error);
        // Fallback: try fetching all products and filtering
        try {
          const allProductsRes = await fetch(
            "http://localhost:5000/api/gaming",
          );
          const allProducts = await allProductsRes.json();
          const gamingProducts = allProducts.filter(
            (p) =>
              p.category?.toLowerCase().includes("gaming") ||
              p.name?.toLowerCase().includes("gaming"),
          );
          setProducts(gamingProducts);
          setLoading(false);
        } catch (fallbackError) {
          console.error("Fallback fetch also failed:", fallbackError);
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Trigger hero animation after a short delay
    const heroTimer = setTimeout(() => {
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
      { threshold: 0.1, rootMargin: "0px" },
    );

    // Observe elements after they're rendered
    const observeTimer = setTimeout(() => {
      if (heroRef.current) {
        observer.observe(heroRef.current);
        // If hero is already in view, trigger animation
        if (heroRef.current.getBoundingClientRect().top < window.innerHeight) {
          setIsVisible(true);
        }
      }
      if (productsRef.current) {
        observer.observe(productsRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(heroTimer);
      clearTimeout(observeTimer);
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (productsRef.current) observer.unobserve(productsRef.current);
    };
  }, [products.length]);

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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-black">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-purple-500"></div>
          <p className="text-lg text-gray-300">Loading gaming products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 py-16 text-white"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 h-32 w-32 animate-pulse rounded-full bg-purple-400 blur-3xl"></div>
          <div
            className="absolute right-10 bottom-10 h-40 w-40 animate-pulse rounded-full bg-indigo-400 blur-3xl"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-pink-400 blur-3xl"
            style={{ animationDelay: "0.5s" }}
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
            <Gamepad2 className="h-8 w-8 animate-pulse" />
            <h1 className="text-4xl font-bold md:text-5xl">Gaming Zone</h1>
          </div>
          <p
            className={`mb-4 max-w-2xl text-xl text-purple-100 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Level up your gaming experience with our premium collection of
            gaming gear. From high-performance hardware to immersive
            accessories, dominate every game.
          </p>
          <div
            className={`flex flex-wrap items-center gap-4 text-purple-100 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <span className="text-lg">Pro Gaming Gear</span>
            </div>
            <span className="text-purple-300">•</span>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-lg">High Performance</span>
            </div>
            <span className="text-purple-300">•</span>
            <span className="text-lg">Competitive Prices</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mx-auto px-3 py-8">
        <div
          className={`mb-8 rounded-xl border border-purple-500/30 bg-gray-800 p-6 shadow-2xl transition-all duration-1000 ${
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
                placeholder="Search gaming products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-600 bg-gray-700 py-3 pr-4 pl-10 text-white placeholder-gray-400 transition outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer rounded-lg border-2 border-gray-600 bg-gray-700 px-4 py-3 text-white transition outline-none hover:cursor-pointer focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 rounded-lg border-2 border-gray-600 bg-gray-700 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded p-2 transition hover:cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:bg-gray-600"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded p-2 transition hover:cursor-pointer ${
                  viewMode === "list"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:bg-gray-600"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-400">
            Showing{" "}
            <span className="font-semibold text-purple-400">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div
            className={`rounded-xl border border-purple-500/30 bg-gray-800 py-16 text-center shadow-md transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <Search className="mx-auto mb-4 h-16 w-16 text-gray-600" />
            <h3 className="mb-2 text-2xl font-semibold text-gray-300">
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
              <div
                key={product._id}
                className={`group transform overflow-hidden rounded-xl border border-purple-500/30 bg-gray-800 shadow-lg hover:cursor-zoom-in hover:border-purple-500/60 hover:shadow-2xl ${
                  viewMode === "list" ? "flex gap-2" : ""
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
                  className={`relative overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 ${
                    viewMode === "list"
                      ? "h-48 w-48 flex-shrink-0"
                      : "h-64 w-full"
                  }`}
                >
                  <img
                    src={product.image || "/placeholder-gaming.jpg"}
                    alt={product.name}
                    className="h-full w-full transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x400?text=Gaming+Gear";
                    }}
                  />
                  {product.price && (
                    <div className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-lg">
                      ${product.price}
                    </div>
                  )}
                  {/* Badge for featured/new products */}
                  {product.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-gray-900 shadow-md">
                      <Trophy className="h-3 w-3" />
                      Featured
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="mb-2">
                    <span className="inline-block rounded border border-purple-500/30 bg-purple-900/50 px-2 py-1 text-xs font-semibold text-purple-300">
                      {product.category || "Gaming"}
                    </span>
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition group-hover:text-purple-400">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="mb-3 line-clamp-2 text-sm text-gray-400">
                      {product.description}
                    </p>
                  )}
                  <div>
                    {product.price && (
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          Rs. {product.price}
                        </div>
                      </div>
                    )}
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
                      className="hover:bg-pruple-700 flex items-center justify-center gap-1 rounded-lg hover:bg-purple-700 bg-purple-600 px-7 py-2 text-sm text-white shadow-md hover:cursor-pointer"
                    >
                      See Details
                    </button>

                    {/* Buy Now */}
                    <Link
                      to="/payment-choice"
                      className="rounded-lg bg-purple-600 px-7 py-2 text-sm text-white shadow-md hover:cursor-pointer hover:bg-purple-700"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
