import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    {
      name: "Electronics",
      image: "/categories-image/electronics.png",
      link: "/electronics",
      icon: "⚡",
    },
    {
      name: "Personal Care",
      image: "/categories-image/personal-care.png",
      link: "/personal-care",
      icon: "✨",
    },
    {
      name: "Gaming",
      image: "/categories-image/gaming.png",
      link: "/gaming",
      icon: "🎮",
    },
    {
      name: "Home Furniture",
      image: "/categories-image/home-furniture.png",
      link: "/home-furniture",
      icon: "🏠",
    },
  ];

  return (
    <div className="relative h-[115vh] overflow-hidden sm:h-[127vh] lg:h-[100vh] xl:h-[95vh]">
      <section className="relative h-full w-full rounded-lg">
        <img
          src="/component-image/home-bg-image.png"
          alt=""
          className="animate-fade-in h-full w-full object-cover object-[center_70%]"
        />
        {/* Animated overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-blue-100/50"></div>

        {/* Hero Content */}
        <div
          className={`absolute top-12 z-40 flex w-full flex-col items-center justify-center transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-2 flex animate-pulse items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8" />
            <span className="text-sm font-semibold text-blue-600 sm:text-base">
              Welcome
            </span>
          </div>
          <h1 className="animate-slide-in mb-4 px-4 text-center text-2xl font-bold text-blue-700 drop-shadow-lg sm:text-4xl lg:text-5xl">
            Welcome to Hamro Bazzar
          </h1>
          <p className="animate-fade-in-delay mb-6 max-w-2xl px-4 text-center text-base text-blue-700 drop-shadow-md sm:text-lg lg:text-xl">
            Your one-stop shop for the best products at unbeatable prices!
          </p>
          <Link
            to="/all-products"
            className="group animate-fade-in-delay-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl"
          >
            <span className="font-semibold">Shop Now</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Gradient overlays */}
      <div className="via-blue- absolute bottom-30 z-10 h-[40vh] w-full bg-gradient-to-t from-blue-50 to-transparent px-[3vw]"></div>
      <div className="absolute bottom-0 h-[20vh] w-full bg-blue-50"></div>

      {/* Category Cards */}
      <div className="absolute bottom-0 z-20 grid w-full grid-cols-2 gap-2 px-[1vw] sm:gap-3 lg:grid-cols-4">
        {categories.map(({ link, image, name, icon }, idx) => (
          <Link
            to={link}
            key={idx}
            className={`group relative h-[35vh] bg-white p-2 transition-all duration-500 hover:-translate-y-2 sm:h-[40vh] sm:p-3 lg:h-[50vh] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{
              transitionDelay: `${idx * 100}ms`,
            }}
          >
            <div className="relative h-[85%] w-full overflow-hidden rounded-lg">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover object-[center_90%] transition-transform duration-500 group-hover:scale-110"
              />
              {/* Animated overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70" />

              {/* Icon badge */}
              <div className="absolute top-3 right-3 z-20 transform rounded-full bg-white/90 p-2 text-2xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                {icon}
              </div>
            </div>
            <p className="absolute bottom-2 left-3 z-20 text-base font-bold text-black drop-shadow-lg transition-transform duration-300 group-hover:translate-x-2 sm:bottom-4 sm:text-lg">
              {name}
            </p>
            {/* Arrow indicator */}
            <ArrowRight className="absolute right-3 bottom-3 z-20 h-5 w-5 translate-x-[-10px] transform text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        ))}
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
}
