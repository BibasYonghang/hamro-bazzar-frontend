import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import blogs from "../data/blog";
import { Calendar, User, ArrowRight, BookOpen, Sparkles } from "lucide-react";

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const blogsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

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

    setTimeout(() => {
      if (heroRef.current) observer.observe(heroRef.current);
      if (blogsRef.current) observer.observe(blogsRef.current);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (blogsRef.current) observer.unobserve(blogsRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div
            className={`flex items-center gap-3 mb-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <BookOpen className="w-10 h-10" />
            <h1 className="text-5xl md:text-6xl font-bold">Shopping Guides & Tips</h1>
          </div>
          <p
            className={`text-xl md:text-2xl text-green-100 max-w-3xl mb-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Discover expert tips, shopping guides, and the latest trends to make informed purchasing decisions.
          </p>
          <div
            className={`flex items-center gap-4 text-green-100 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-lg font-medium">{blogs.length} Articles</span>
            </div>
            <span className="text-green-200">•</span>
            <span className="text-lg font-medium">Expert Tips</span>
            <span className="text-green-200">•</span>
            <span className="text-lg font-medium">Latest Trends</span>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          ref={blogsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogs.map((blog, idx) => (
            <Link
              to={`/blog/${blog.slug}`}
              key={blog.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-green-200 transform hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${300 + idx * 100}ms`,
              }}
            >
              {/* Blog Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 h-64">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x400?text=Blog+Post";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-600 transition">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
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
      </div>
    </div>
  );
}
