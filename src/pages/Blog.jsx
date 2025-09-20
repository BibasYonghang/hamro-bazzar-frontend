import React from "react";
import { Link } from "react-router-dom";
import blogs from "../data/blog";

export default function Blog() {
    return (
        <section className="w-full
         px-3 sm:px-8 
         py-9 sm:py-9
        ">
            <h1 className=" font-bold mb-5
                          text-2xl sm:text-4xl
                          text-start  sm:text-center 
            ">
                Online Shopping Guides & Tips
            </h1>
            <div className="grid 
             grid-cols-2 md:grid-cols-3 xl:grid-cols-4
             gap-2 sm:gap-8 md:gap-2 lg:gap-8
            ">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white  shadow-md overflow-hidden hover:shadow-lg transition 
                                   p-2 sm:p-4 
                    ">
                        <img src={blog.image} alt={blog.title}
                            className="w-full bg-amber-400 object-cover
                                       h-40 sm:h-48 
                         " />
                        <div className="">
                            <h2 className="font-semibold mb-2
                                          text-base sm:text-xl
                            ">
                                {blog.title}
                            </h2>
                            <Link
                                to={`/blog/${blog.slug}`}
                                className="text-blue-600 font-medium hover:underline"
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
