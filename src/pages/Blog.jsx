import React from "react";
import { Link } from "react-router-dom";
import blogs from "../data/blog";

export default function Blog() {
    return (
        <section className="max-w-6xl mx-auto px-5 py-16">
            <h1 className="text-4xl font-bold text-center mb-8">Online Shopping Guides & Tips</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                        <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                            <Link
                                to={`/blog/${blog.slug}`}
                                className="text-green-600 font-medium hover:underline"
                            >
                                Read More →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
