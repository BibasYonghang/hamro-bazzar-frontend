import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const categories = [
    {
      name: "Hiking Gear",
      image: "/categories-image/hiking-gear.png",
      link: "/category/hiking-gear",
    },
    {
      name: "Backpacks",
      image: "/categories-image/backpacks.png",
      link: "/category/backpacks",
    },
    {
      name: "Camping Essentials",
      image: "/categories-image/camping.png",
      link: "/category/camping",
    },
    {
      name: "Footwear",
      image: "/categories-image/footwear.png",
      link: "/category/footwear",
    },
  ];
  return (
    <div className="relative h-[165vh] sm:h-[120vh] xl:h-[88vh]">
      <section className="h-full w-full rounded-lg">
        <img
          src="/component-image/home-bg-image.png"
          alt=""
          className="h-full w-full object-cover object-[center_70%]"
        />
        <div className="absolute top-12 z-40 flex w-full flex-col items-center justify-center">
          <h1 className="mb-4 text-2xl font-bold text-blue-700 sm:text-4xl lg:text-5xl">
            Welcome to Hamro Bazzar
          </h1>
          <p className="mb-6 text-center text-base text-blue-700 sm:text-lg lg:text-xl">
            Your one-stop shop for the best products at unbeatable prices!
          </p>
          <a
            href="/shop"
            className="inline-block rounded bg-blue-600 px-6 py-2 text-white shadow transition hover:bg-blue-700"
          >
            Shop Now
          </a>
        </div>
      </section>

      <div className="via-blue- absolute bottom-30 z-10 h-[40vh] w-full bg-gradient-to-t from-blue-50 to-transparent px-[3vw]"></div>
      <div className="absolute bottom-0 h-[20vh] w-full bg-blue-50"></div>

      <div className="absolute bottom-0 z-20 grid w-full grid-cols-1 gap-2 px-[1vw] sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        {categories.map((cat, idx) => (
          <Link
            to={cat.link}
            key={idx}
            className="group relative h-[30vh] bg-white p-2 transition sm:h-[40vh] sm:p-3 lg:h-[50vh]"
          >
            <div className="relative h-[85%] w-full overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover object-[center_90%] transition duration-300 group-hover:scale-105"
              />
              {/* Overlay stays behind the text */}
              <div className="absolute inset-0 z-10 bg-black/30 transition group-hover:bg-black/40" />
              {/* Text goes above the overlay */}
            </div>
            <p className="absolute bottom-2 left-3 z-20 text-base font-semibold text-black sm:bottom-4 sm:text-lg">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
