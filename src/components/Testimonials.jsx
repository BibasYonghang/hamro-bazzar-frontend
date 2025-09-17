import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    text: "The best hiking gear I've ever purchased! High quality and fast delivery.",
    rating: 5,
    image: "/images/users/user1.jpg",
  },
  {
    name: "Samantha Lee",
    text: "Amazing experience! Customer service was very helpful and kind.",
    rating: 4,
    image: "/images/users/user2.jpg",
  },
  {
    name: "Michael Brown",
    text: "Affordable prices and great variety. Highly recommend this store.",
    rating: 5,
    image: "/images/users/user3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{t.name}</h3>
                <div className="flex text-yellow-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600 text-sm">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
