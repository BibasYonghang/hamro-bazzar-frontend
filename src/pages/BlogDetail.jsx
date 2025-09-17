import React from "react";
import { useParams, Link } from "react-router-dom";
import blogs from "../data/blog";

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return <p className="text-center text-gray-600 mt-10">Blog not found.</p>;
  }

  return (
    <article className="max-w-4xl mx-auto px-5 py-16">
      <Link to="/blog" className="text-green-600 hover:underline mb-4 inline-block">
        ← Back to Blog
      </Link>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {blog.date} • By {blog.author}
      </p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </article>
  );
}
