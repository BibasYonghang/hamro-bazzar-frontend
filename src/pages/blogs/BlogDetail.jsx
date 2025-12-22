import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import blogs from "../../data/blog";
import { Calendar, User, ArrowLeft, BookOpen, Share2, Clock } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

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
      if (contentRef.current) observer.observe(contentRef.current);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Estimate reading time (average 200 words per minute)
  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        <div className="w-[95vw] mx-auto px-6 relative z-10">
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 text-green-100 hover:text-white mb-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Blog</span>
          </Link>

          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6" />
              <span className="text-green-100 font-medium">Shopping Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-green-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className=" mx-auto px-6 py-16">
        <div
          ref={contentRef}
          className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Featured Image */}
          <div className="relative overflow-hidden h-96 bg-gradient-to-br from-green-50 to-emerald-50">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/1200x600?text=Blog+Post";
              }}
            />
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Share this article</h3>
                  <p className="text-gray-600 text-sm">Help others discover this guide</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: blog.title,
                          text: blog.excerpt,
                          url: window.location.href,
                        });
                      }
                    }}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition transform hover:scale-105"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Blog Link */}
        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>View All Articles</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
