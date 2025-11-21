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
    days: 1,
    hours: 16,
    minutes: 18,
    seconds: 18,
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

  // to reset the timing agiain
  // localStorage.removeItem("specialOfferEndTime");

  return (
    <section className="relative mx-auto h-[90vh] w-[97vw] overflow-hidden rounded-2xl shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Special Offer Background"
          className="animate-zoom-in h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        {/* Animated gradient overlay */}
        <div className="animate-pulse-slow absolute inset-0 bg-gradient-to-r from-green-600/20 via-transparent to-green-900"></div>
      </div>

      {/* Countdown Overlay - Top Right */}
      {showCountdown && (
        <div
          className={`absolute top-6 right-6 z-20 rounded-xl border border-white/30 bg-white/20 px-3 py-2 shadow-2xl backdrop-blur-md transition-all duration-1000 sm:px-6 sm:py-3 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <div className="flex gap-2 text-lg font-bold text-white sm:gap-4">
            {Object.entries(timeLeft).map(([label, value], idx) => (
              <div
                key={label}
                className="transform text-center transition-all duration-300 hover:scale-110"
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <div className="mb-1 rounded-lg bg-white/10 px-2 py-1 text-lg sm:text-2xl">
                  {String(value).padStart(2, "0")}
                </div>
                <span className="text-[11px] uppercase opacity-80 sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto mt-5 flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center sm:mt-0">
        {/* Badge */}
        {badge && (
          <div
            className={`relative mb-6 transition-all duration-1000 ${
              isVisible
                ? "animate-bounce-slow translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
          >
            <span className="rounded-full border border-white/20 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2 text-sm font-medium text-white shadow-2xl">
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className={`text-2xl leading-tight font-bold text-white drop-shadow-2xl transition-all duration-1000 sm:text-3xl lg:text-5xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {title.split(" ").map((word, i) =>
            word.toLowerCase() === "adventure" ? (
              <span
                key={i}
                className="inline-block animate-pulse text-green-400"
              >
                {word}{" "}
              </span>
            ) : (
              <span key={i}>{word} </span>
            ),
          )}
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-6 max-w-2xl text-base text-gray-200 transition-all duration-1000 md:text-xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {subtitle}
        </p>

        {/* Buttons */}
        <div
          className={`mt-10 flex flex-col gap-4 transition-all duration-1000 sm:flex-row ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {primaryButton && (
            <Link
              className="group relative h-10 w-38 overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-green-600 to-emerald-600 text-white transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-2xl sm:h-13"
              to={primaryButton.link}
            >
              <span className="absolute inset-0 z-0 h-full w-full origin-center scale-x-0 bg-green-500 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              <span className="relative z-10 flex h-full w-full items-center justify-center gap-2 font-semibold">
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
