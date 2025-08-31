// ProductCard.jsx
import React from "react"; 

import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
    <Link to={`/product/${product.id}`}>
      <img src={product.image} alt={product.name} className="h-40 object-contain mb-4" />
      <h3 className="font-semibold text-lg mb-2 hover:underline">{product.name}</h3>
    </Link>
    <p className="text-gray-500 mb-2">{product.category}</p>
    <p className="font-bold text-blue-600 mb-4">${product.price}</p>
    <button
      className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      onClick={() => onAddToCart(product)}
    >
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
