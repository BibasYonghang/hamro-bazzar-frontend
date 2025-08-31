// ProductDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">&larr; Back</button>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.name} className="h-64 object-contain rounded" />
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-500 mb-2">{product.category}</p>
          <p className="text-xl font-bold text-blue-600 mb-4">${product.price}</p>
          <p className="mb-6">{product.description}</p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
