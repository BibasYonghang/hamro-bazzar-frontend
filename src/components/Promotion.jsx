import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Promotion() {
    return (
        <section className="relative w-full h-[90vh] overflow-hidden mt-7 rounded-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/component-image/promotion-bg-image.png" // <- Replace with your hiking image
                    alt="Hero background"
                    className="w-full h-full object-cover object-center"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-6">
                {/* Discount Badge */}
                <div className="mb-4">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg animate-bounce">
                        🔥 Limited Time Offer – 30% OFF
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                    Gear Up For Your Next <br className="hidden md:block" />
                    <span className="text-green-400">Adventure</span>
                </h1>

                {/* Subheading */}
                <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
                    Discover premium hiking gear and outdoor essentials. Free shipping on
                    orders over <span className="font-semibold">$50</span>.
                </p>

                {/* Call-To-Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/shop"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-md transition-all duration-300"
                    >
                        Shop Now <ArrowRight size={18} />
                    </Link>

                    <Link
                        to="/collections"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full border border-white/30 shadow-md transition-all duration-300"
                    >
                        View Collections
                    </Link>
                </div>
            </div>

            {/* Bottom Wave Divider (Optional, Fancy Look) */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg
                    className="relative block w-[calc(150%+1.3px)] h-[60px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.52,22.19,103.79,29.05,158,17.39C230.8,51.11,284.58,13.9,339,7.14c54.72-6.85,104.86,15.71,160,26.5C617.41,46,673.23,39,729,28.25c55.44-10.66,111.37-25.83,166-17.46C949.73,19.21,1006.64,51,1062,66.25c55.43,15.12,111.66,12.77,138,10.46V0Z"
                        opacity=".25"
                        className="fill-white"
                    ></path>
                    <path
                        d="M0,0V15.81C47.52,37.34,103.79,52,158,51.25c72.8-1.22,126.58-34.43,181-41.19,54.72-6.85,104.86,15.71,160,26.5,57.41,11.34,113.23,4.31,169-6.44,55.44-10.66,111.37-25.83,166-17.46C949.73,19.21,1006.64,51,1062,66.25c55.43,15.12,111.66,12.77,138,10.46V0Z"
                        opacity=".5"
                        className="fill-white"
                    ></path>
                    <path
                        d="M0,0V5.63C47.52,27.16,103.79,41.83,158,41.08c72.8-1.22,126.58-34.43,181-41.19,54.72-6.85,104.86,15.71,160,26.5,57.41,11.34,113.23,4.31,169-6.44,55.44-10.66,111.37-25.83,166-17.46C949.73,19.21,1006.64,51,1062,66.25c55.43,15.12,111.66,12.77,138,10.46V0Z"
                        className="fill-white"
                    ></path>
                </svg>
            </div>
        </section>
    );
}
