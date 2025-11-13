import React from "react";
import { Link } from "react-router-dom";

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
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-8 text-center">From Our Blog</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{blog.excerpt}</p>
              <Link
                to={blog.link}
                className="mt-4 inline-block text-green-600 font-semibold hover:underline"
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
