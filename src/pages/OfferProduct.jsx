import React, { useState, useEffect } from 'react';
import products from '../data/products';
import { Search, Filter, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const OfferProduct = ({ onAddToCart }) => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Get unique categories
    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    // Filter products
    const filtered = products.filter(p =>
        (category === '' || category === 'All' || p.category === category) &&
        (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white w-[94vw] mx-auto py-8'>
            {/* Header */}
            <div
                className={`mb-8 transition-all duration-1000 ${
                    isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-10"
                }`}
            >
                <div className="flex items-center gap-3 mb-4">
                    <Tag className="w-8 h-8 text-blue-600" />
                    <h2 className="text-4xl sm:text-5xl text-blue-700 font-bold">
                        Offered Products
                    </h2>
                </div>
                <p className="text-gray-600 text-lg">
                    Special deals and exclusive offers just for you!
                </p>
            </div>

            {/* Search and Filter */}
            <div
                className={`mb-8 transition-all duration-1000 ${
                    isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "200ms" }}
            >
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-blue-600 placeholder:text-blue-500 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 outline-none rounded-xl transition-all shadow-lg hover:shadow-xl"
                        />
                    </div>
                    <div className="relative md:w-[30%]">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5 pointer-events-none" />
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-blue-600 text-blue-700 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 outline-none rounded-xl transition-all shadow-lg hover:shadow-xl cursor-pointer bg-white"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            {filtered.length > 0 ? (
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-1000 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                >
                    {filtered.map((product, idx) => (
                        <div
                            key={idx}
                            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100"
                            style={{
                                animationDelay: `${idx * 50}ms`,
                            }}
                        >
                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/400x400?text=Product";
                                    }}
                                />
                                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                    OFFER
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                                <p className="text-blue-600 font-bold text-xl">
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className={`text-center py-20 transition-all duration-1000 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                >
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                        No products found
                    </h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            )}

            {/* Results Count */}
            {filtered.length > 0 && (
                <div
                    className={`mt-8 text-center text-gray-600 transition-all duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "600ms" }}
                >
                    Showing <span className="font-semibold text-blue-600">{filtered.length}</span> product{filtered.length > 1 ? 's' : ''}
                </div>
            )}
        </div>
    );
};

export default OfferProduct;
