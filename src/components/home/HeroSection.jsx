import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const categories = [
    {
      name: "Electronics",
      image: "/categories-image/electronics.png",
      link: "/electronics",
    },
    {
      name: "Personal Care",
      image: "/categories-image/personal-care.png",
      link: "/personal-care",
    },
    {
      name: "Gaming",
      image: "/categories-image/gaming.png",
      link: "/gaming",
    },

    {
      name: "Home Furniture",
      image: "/categories-image/home-furniture.png",
      link: "/home-furniture",
    },
  ];
  return (
    <div className="relative h-[110vh] sm:h-[120vh] lg:h-[90vh] xl:h-[88vh]">
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

      <div className="via-blue- absolute bottom-30 z-10 h-[40vh] w-full bg-gradient-to-t from-blue-100 to-transparent px-[3vw]"></div>
      <div className="absolute bottom-0 h-[20vh] w-full bg-blue-100"></div>

      <div className="absolute bottom-0 z-20 grid w-full grid-cols-2 gap-2 px-[1vw] sm:gap-3 lg:grid-cols-4">
        {categories.map(({ link, image, name }, idx) => (
          <Link
            to={link}
            key={idx}
            className="group relative h-[35vh] bg-white p-2 transition sm:h-[40vh] sm:p-3 lg:h-[50vh]"
          >
            <div className="relative h-[85%] w-full overflow-hidden">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover object-[center_90%] transition duration-300 group-hover:scale-105"
              />
              {/* Overlay stays behind the text */}
              <div className="absolute inset-0 z-10 bg-black/30 transition group-hover:bg-black/40" />
              {/* Text goes above the overlay */}
            </div>
            <p className="absolute bottom-2 left-3 z-20 text-base font-semibold text-black sm:bottom-4 sm:text-lg">
              {name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
