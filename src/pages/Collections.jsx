import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";

export default function Collections() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://hamro-bazzar.onrender.com/api/products");
                const data = await res.json();
                setProducts(data);
                setLoading(false);
                // Trigger visibility after data loads
                setTimeout(() => setIsVisible(true), 100);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [products]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading collections...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <section ref={sectionRef} className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div
                    className={`mb-8 transition-all duration-1000 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-10"
                    }`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <ShoppingBag className="w-8 h-8 text-blue-600" />
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
                            All Collections
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Discover our complete range of premium products
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, idx) => (
                        <Link
                            to={`/products/${product._id}`}
                            key={product._id}
                            className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}
                            style={{
                                transitionDelay: `${idx * 50}ms`,
                            }}
                        >
                            {/* Image Container */}
                            <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/400x400?text=Product";
                                    }}
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Category Badge */}
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {product.category}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-blue-600 font-bold text-xl">
                                        ${product.price}
                                    </p>
                                    {product.rating && (
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600">{product.rating}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {products.length === 0 && (
                    <div className="text-center py-20">
                        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-500">Check back later for new collections!</p>
                    </div>
                )}
            </section>
        </div>
    );
}
