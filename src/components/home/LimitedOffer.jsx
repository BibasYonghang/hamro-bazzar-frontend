import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SpecialOffer({
  title = "Gear Up For Your Next Adventure",
  subtitle = "Discover premium hiking gear and outdoor essentials. Free shipping on orders over $50.",
  badge = "🔥 Limited Time Offer – 30% OFF",
  backgroundImage = "/component-image/promotion-bg-image.png",
  showCountdown = true,
  countdownDays = 4, // default 3 days
  primaryButton = { text: "Shop Now", link: "/offered-products" },
}) {
  // ---------- Countdown Logic ----------
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate time left based on a fixed end time
  const calculateTimeLeft = (endTime) => {
    const now = new Date().getTime();
    const diff = endTime - now;

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  useEffect(() => {
    if (showCountdown) {
      // 1️⃣ Check localStorage for existing countdown end time
      let savedEndTime = localStorage.getItem("specialOfferEndTime");

      if (!savedEndTime) {
        // If not found, set new countdown end time (now + countdownDays)
        const newEndTime =
          new Date().getTime() + countdownDays * 24 * 60 * 60 * 1000;
        localStorage.setItem("specialOfferEndTime", newEndTime);
        savedEndTime = newEndTime;
      }

      savedEndTime = parseInt(savedEndTime, 10);

      // 2️⃣ Start updating the countdown every second
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(savedEndTime));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showCountdown, countdownDays]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-[97vw] mx-auto h-[90vh] overflow-hidden rounded-2xl shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Special Offer Background"
          className="w-full h-full object-cover object-center animate-zoom-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-transparent to-green-900 animate-pulse-slow"></div>
      </div>

      {/* Countdown Overlay - Top Right */}
      {showCountdown && (
        <div
          className={`absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-xl shadow-2xl z-20 border border-white/30 transition-all duration-1000 sm:px-6 px-3 sm:py-3 py-2 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10"
          }`}
        >
          <div className="flex text-white font-bold text-lg sm:gap-4 gap-2">
            {Object.entries(timeLeft).map(([label, value], idx) => (
              <div
                key={label}
                className="text-center transform transition-all duration-300 hover:scale-110"
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <div className="sm:text-2xl text-lg bg-white/10 rounded-lg px-2 py-1 mb-1">
                  {String(value).padStart(2, "0")}
                </div>
                <span className="uppercase sm:text-xs text-[11px] opacity-80">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-6 sm:mt-0 mt-5">
        {/* Badge */}
        {badge && (
          <div
            className={`relative mb-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0 animate-bounce-slow"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-2xl border border-white/20">
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className={`font-bold text-white leading-tight drop-shadow-2xl text-2xl sm:text-3xl lg:text-5xl transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {title.split(" ").map((word, i) =>
            word.toLowerCase() === "adventure" ? (
              <span
                key={i}
                className="text-green-400 animate-pulse inline-block"
              >
                {word}{" "}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-6 text-gray-200 max-w-2xl text-base md:text-xl transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {subtitle}
        </p>

        {/* Buttons */}
        <div
          className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {primaryButton && (
            <Link
              className="relative w-38 group overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full transition-all duration-300 hover:cursor-pointer hover:shadow-2xl hover:scale-105 sm:h-13 h-10 border border-white/20"
              to={primaryButton.link}
            >
              <span className="absolute inset-0 h-full w-full bg-green-500 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 ease-in-out z-0"></span>
              <span className="relative z-10 flex items-center justify-center h-full w-full gap-2 font-semibold">
                {primaryButton.text}{" "}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          )}

        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes zoom-in {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-zoom-in {
          animation: zoom-in 10s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
