import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Collections() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">All Collections</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <Link
                        to={`/products/${product._id}`}
                        key={product._id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-gray-500 text-sm">{product.category}</p>
                            <p className="text-green-600 font-bold mt-2">${product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
