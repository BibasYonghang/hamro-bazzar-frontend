import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Sparkles } from "lucide-react";

const blogs = [
  {
    title: "Top 10 Hiking Trails in Nepal",
    excerpt:
      "Discover breathtaking trails in Nepal that every hiker must experience at least once.",
    image: "/images/blogs/trails.jpg",
    link: "/blog/top-10-trails",
  },
  {
    title: "How to Choose the Perfect Hiking Backpack",
    excerpt:
      "Learn how to select the best backpack for your hiking adventures with our detailed guide.",
    image: "/images/blogs/backpack.jpg",
    link: "/blog/choose-backpack",
  },
  {
    title: "Essential Gear for Every Hiking Trip",
    excerpt:
      "Don't leave for your next trip without these essential pieces of hiking gear.",
    image: "/images/blogs/gear.jpg",
    link: "/blog/essential-gear",
  },
];

export default function BlogSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="my-16 px-6">
      <div
        className={`text-center mb-12 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-green-600" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">From Our Blog</h2>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover expert tips, guides, and insights to enhance your shopping experience
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog, idx) => (
          <Link
            key={idx}
            to={blog.link}
            className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-green-200 transform hover:-translate-y-2 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionDelay: `${200 + idx * 100}ms`,
            }}
          >
            <div className="relative overflow-hidden h-48 bg-gradient-to-br from-green-50 to-emerald-50">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x400?text=Blog+Post";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition">
                {blog.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm line-clamp-3 mb-4">
                {blog.excerpt}
              </p>
              <div className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
                <span>Read More</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link
          to="/blog"
          className={`inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <span>View All Articles</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
