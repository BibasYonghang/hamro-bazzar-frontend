import React, { useRef, useState, useEffect } from "react";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

// 3D Card Animation hook
function use3DTilt(maxAngle = 22) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  function handleMouseMove(e) {
    const bounds = ref.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;
    const rotateX = ((y - centerY) / centerY) * maxAngle;
    const rotateY = ((centerX - x) / centerX) * maxAngle;
    setTilt({ x: rotateX, y: rotateY, active: true });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0, active: false });
  }

  return {
    ref,
    style: {
      transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
        tilt.active ? "1.045,1.045,1.045" : "1,1,1"
      })`,
      transition: tilt.active
        ? "transform 0.08s cubic-bezier(.22,1,.36,1)"
        : "transform 0.5s cubic-bezier(.22,1,.36,1)",
      boxShadow: tilt.active
        ? `0 20px 60px 0 rgba(30,64,175,0.16), 0 0px 36px 0 rgba(30,58,138,0.13)`
        : "0 8px 56px 0 rgba(30,41,100,0.10)",
    },
    handleMouseMove,
    handleMouseLeave,
  };
}

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const tilt = use3DTilt();
  const [mounted, setMounted] = useState(false);

  const [cart, setCart] = useState([]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setMounted(true), 60);
  }, []);

  const handleAddToCart = () => {
    if (product) {
      setCart((prev) => [...prev, product]);
      alert(`${product.name || "Product"} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) navigate("/checkout", { state: { product } });
  };

  if (loading)
    return (
      <p className="mt-20 text-center text-white">Loading product details...</p>
    );

  // Safe destructuring with defaults
  const {
    name = "Unnamed Product",
    price = 0,
    image = "",
    description = "No description available.",
    rating = 0,
    reviews = 0,
    highlights = [],
  } = product;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-800 via-blue-900 to-gray-950 pb-6">
      {/* Top Bar */}
      <div
        className={`mt-3 ml-4 flex items-center gap-3 text-blue-200 drop-shadow-2xl sm:ml-8 ${
          mounted ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        } transition-all duration-700`}
        style={{ zIndex: 10, position: "relative" }}
      >
        <Link
          to="/all-products"
          className="relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-800/60 to-indigo-900/70 px-3 py-2 font-semibold shadow-lg ring-1 ring-blue-400/10 backdrop-blur-md transition-all duration-150 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 hover:text-white active:scale-95 sm:px-4"
          style={{ boxShadow: "0 4px 16px 0 rgba(99,102,241,0.08)" }}
        >
          <ArrowLeft size={20} className="text-blue-400" />
          <span className="text-sm sm:text-base">Back to Products</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
        {/* Product Image Card */}
        <div
          className={`w-full items-center px-4 lg:w-[45vw] lg:px-6 ${
            mounted
              ? "translate-y-0 opacity-100"
              : "translate-y-12 scale-105 opacity-0"
          } transition-all duration-700`}
          style={{ zIndex: 10, position: "relative" }}
        >
          <div
            ref={tilt.ref}
            onMouseMove={tilt.handleMouseMove}
            onMouseLeave={tilt.handleMouseLeave}
            className="relative mx-auto mt-5 flex w-full rounded-3xl bg-gradient-to-br from-blue-800/80 via-indigo-950/100 to-gray-900/100 shadow-[0_16px_48px_0_rgba(56,123,245,0.10)] transition-all duration-700"
            style={{ height: "57vh", maxHeight: "720px", ...tilt.style }}
          >
            <div className="absolute inset-0 h-full w-full overflow-hidden rounded-3xl">
              <div className="animate-pulse-slow pointer-events-none absolute -inset-2 z-10 rounded-2xl ring-4 ring-blue-600/15 blur-[1px]" />
              <div className="absolute top-[98%] left-1/2 z-20 h-12 w-36 -translate-x-1/2 rounded-2xl bg-black/80 opacity-70 blur-2xl lg:h-16 lg:w-36" />
              <img
                src={image}
                alt={name}
                className="relative z-20 h-full w-full transition-transform duration-500 hover:scale-105 hover:cursor-zoom-in"
                style={{
                  borderRadius: "16px",
                  boxShadow:
                    "0 12px 48px 0 rgba(46,85,139,0.25), 0 2px 16px 0 rgba(70,175,255,0.11)",
                }}
              />
              <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-30 h-28 rounded-b-3xl bg-gradient-to-t from-indigo-950/90 via-transparent to-transparent lg:h-32"></div>
              <div
                className="absolute top-4 right-4 z-40 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-700 to-indigo-900 px-4 py-2 text-lg font-bold text-white shadow-xl ring-2 shadow-blue-800/50 ring-blue-300/10 transition-transform hover:scale-105 lg:top-5 lg:right-5 lg:px-5 lg:py-3 lg:text-2xl"
                style={{
                  textShadow: "0 4px 22px rgba(30,64,175,.12)",
                  filter: "drop-shadow(0 0 10px #3b82f6d3)",
                }}
              >
                ${price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Add to Cart / Buy Now */}
          <div
            className={`mt-6 flex w-full items-center justify-between gap-4 rounded-2xl bg-gradient-to-tr from-blue-900/80 to-indigo-950/80 p-3 px-4 shadow-2xl ring-2 ring-blue-400/10 md:rounded-3xl ${
              mounted ? "animate-fade-in-up" : "translate-y-6 opacity-0"
            }`}
            style={{
              boxShadow:
                "0 8px 56px 0 rgba(59,130,246,0.16), 0 4px 11px 0 rgba(139,92,246,0.16)",
              backdropFilter: "blur(10px)",
              willChange: "transform,opacity",
            }}
          >
            <div>
              <p className="text-sm font-medium text-blue-200 md:text-lg">
                Total Price
              </p>
              <p className="text-lg font-black text-blue-100 drop-shadow md:text-xl">
                ${price.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="group relative flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-700 to-indigo-950 px-4 py-2 text-base font-extrabold tracking-tight text-white uppercase shadow-2xl ring-2 ring-blue-400/30 transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:from-indigo-800 hover:to-blue-900 hover:shadow-blue-500/20 active:scale-97 md:text-xl"
              >
                <span className="animate-ping-once absolute top-3 left-3 inline-flex h-3 w-3 rounded-full bg-blue-300/90 blur-sm"></span>
                <ShoppingCart size={22} className="drop-shadow-lg" />
                <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">
                  Add to Cart
                </span>
              </button>

              <Link
                to="/payment-choice"
                className="group relative flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-indigo-800 via-blue-700 to-blue-900 px-4 py-2 text-base font-extrabold tracking-tight text-white uppercase shadow-2xl ring-2 ring-blue-400/30 transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:from-indigo-900 hover:to-blue-800 hover:shadow-blue-500/20 active:scale-97 md:text-xl"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div
          className={`flex w-full flex-col justify-center px-4 pb-8 lg:w-[45vw] lg:pt-3 lg:pr-0 lg:pl-6 ${
            mounted
              ? "translate-y-0 opacity-100"
              : "translate-y-10 scale-105 opacity-0"
          } transition-all duration-700`}
        >
          <h1 className="mb-3 text-2xl font-black tracking-tight text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl">
            {name}
          </h1>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-gradient-to-tr from-yellow-300/80 to-yellow-400 px-3 py-1.5 text-sm font-extrabold text-stone-900 shadow-lg ring-2 ring-yellow-200/60 sm:text-base">
              <Star
                size={16}
                className="mr-1 inline text-yellow-500 drop-shadow-lg"
                fill="currentColor"
              />
              {rating || 0}
            </span>
            <span className="ml-1 text-sm text-blue-100/75 drop-shadow md:text-base">
              ({reviews?.toLocaleString() || 0} reviews)
            </span>
          </div>
          <p className="mt-4 mb-6 max-w-full text-sm leading-relaxed text-blue-200/90 shadow-2xl drop-shadow-lg backdrop-blur-md sm:text-base md:text-lg">
            {description}
          </p>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-blue-100 drop-shadow-lg sm:text-xl md:text-2xl">
              <span className="animate-pulse-slow inline-block rounded-xl bg-gradient-to-tr from-blue-900/50 to-blue-800/60 px-2 py-1 text-sm font-bold text-blue-200 shadow sm:text-lg">
                Highlights
              </span>
            </h2>
            <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-4">
              {highlights.length > 0 ? (
                highlights.map((point, index) => (
                  <li
                    key={index}
                    className="group flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-indigo-950/70 to-blue-800/50 px-3 py-2 text-sm font-medium text-blue-100 shadow-md ring-1 ring-blue-500/20 transition-all hover:scale-103 hover:ring-2 hover:ring-blue-400/30 sm:text-base"
                  >
                    <span
                      className="animate-ping-once inline-block h-5 w-5 rounded-full bg-gradient-to-br from-blue-400 via-blue-700 to-indigo-900 shadow-lg ring ring-blue-500/30 transition-all group-hover:scale-110"
                      style={{
                        boxShadow:
                          "0 0 10px 1px #3b82f6ff, 0 0 4px 1px #6366f1bf",
                      }}
                    />
                    <span className="text-sm font-semibold text-blue-50 drop-shadow-lg sm:text-base">
                      {point}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-blue-200/80">No highlights available.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
