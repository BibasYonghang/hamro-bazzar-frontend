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
  primaryButton = { text: "Shop Now", link: "/offer-product" },
  secondaryButton = { text: "View Collections", link: "/collections" }
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

  return (
    <section className="relative w-[96vw] mx-auto h-[90vh] overflow-hidden mt-7 rounded-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Special Offer Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Countdown Overlay - Top Right */}
      {showCountdown && (
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-lg shadow-lg z-20
         sm:px-6 px-3
         sm:py-3 py-2
         ">
          <div className="flex text-white font-bold text-lg
          sm:gap-4 gap-2">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="
                sm:text-2xl text-lg
                ">{value}</div>
                <span className="uppercase
                sm:text-xs text-[11px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-6
      sm:mt-0 mt-5">
        {/* Badge */}
        {badge && (
          <div className="relative mb-4  animate-bounce">
            <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className=" font-bold text-white leading-tight drop-shadow-lg
        text-2xl sm:text-3xl lg:text-5xl
        ">
          {title.split(" ").map((word, i) =>
            word.toLowerCase() === "adventure" ? (
              <span key={i} className="text-green-400">
                {word}{" "}
              </span>
            ) : (
              `${word} `
            )
          )}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-200 max-w-2xl
         text-base md:text-xl
         ">
          {subtitle}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {primaryButton && (
            <Link
              className="relative w-38 group overflow-hidden bg-green-600 text-white rounded-full transition hover:cursor-pointer
              sm:h-13 h-10
              "
              to={primaryButton.link}
            >
              <span
                className="absolute inset-0 h-full w-full bg-green-500 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 ease-in-out z-0"
              ></span>
              <span className="relative z-10 flex items-center justify-center h-full w-full">
                {primaryButton.text} <ArrowRight size={18} />
              </span>
            </Link>
          )}

          {secondaryButton && (
            <Link
              to={secondaryButton.link}
              className="w-38 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-full border border-white/30 shadow-md transition-all duration-300
              sm:h-13 h-10
              ">
              {secondaryButton.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
