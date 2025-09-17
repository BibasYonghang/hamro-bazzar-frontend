// ProductCard.jsx
import React from "react";

import { Link } from 'react-router-dom';


const ProductCard = ({ product, onAddToCart }) => (

  <div className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col mt-2
  w-full sm:w-[40vw] md:w-full
  ">
    <Link to={`/product/${product.id}`}>
      <img src={product.image} alt={product.name} className="w-full object-cover mb-4
      h-35 sm:h-44 md:h-55
      " />
      <h3 className="font-semibold  mb-1 hover:underline
      sm:text-lg text-base
      ">{product.name}</h3>
    </Link>
    <p className="text-gray-500 
    sm:text-lg text-base
    ">{product.category}</p>
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
