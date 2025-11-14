import React, { useEffect, useState, useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    text: "The best hiking gear I've ever purchased! High quality and fast delivery.",
    rating: 5,
    image: "/images/users/user1.jpg",
    role: "Adventure Enthusiast",
  },
  {
    name: "Samantha Lee",
    text: "Amazing experience! Customer service was very helpful and kind.",
    rating: 4,
    image: "/images/users/user2.jpg",
    role: "Fashion Blogger",
  },
  {
    name: "Michael Brown",
    text: "Affordable prices and great variety. Highly recommend this store.",
    rating: 5,
    image: "/images/users/user3.jpg",
    role: "Tech Reviewer",
  },
];

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="my-16 px-4 sm:px-6 lg:px-8">
      <div
        className={`text-center mb-12 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Quote className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            What Our Customers Say
          </h2>
          <Quote className="w-8 h-8 text-blue-600 rotate-180" />
        </div>
        <p className="text-gray-600 text-lg">Real reviews from real customers</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionDelay: `${idx * 150}ms`,
            }}
          >
            {/* Quote Icon */}
            <div className="mb-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <Quote className="w-10 h-10 text-blue-600" />
            </div>

            {/* Rating Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`transition-all duration-300 ${
                    i < t.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  style={{
                    animationDelay: `${idx * 150 + i * 50}ms`,
                  }}
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
              "{t.text}"
            </p>

            {/* User Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className="relative">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-200 group-hover:ring-blue-400 transition-all duration-300"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=3b82f6&color=fff&size=128`;
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {t.name}
                </h3>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
