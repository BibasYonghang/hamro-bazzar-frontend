import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Hiking Gear",
    image: "/images/categories/hiking-gear.jpg",
    link: "/category/hiking-gear",
  },
  {
    name: "Backpacks",
    image: "/images/categories/backpacks.jpg",
    link: "/category/backpacks",
  },
  {
    name: "Camping Essentials",
    image: "/images/categories/camping.jpg",
    link: "/category/camping",
  },
  {
    name: "Footwear",
    image: "/images/categories/footwear.jpg",
    link: "/category/footwear",
  },
];

export default function Categories() {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <Link
            to={cat.link}
            key={idx}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="absolute bottom-4 left-4 text-lg font-semibold text-white">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
