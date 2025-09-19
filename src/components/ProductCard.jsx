import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white shadow-2xl hover:shadow-lg flex flex-col mt-2  
  w-full sm:w-[40vw] md:w-full
  sm:p-4 p-2
  ">
      <Link to={`/product/${product.id}`}>
        <div className='w-full overflow-hidden
        h-28 sm:h-44 md:h-55'>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover mb-4 hover:scale-105 duration-200 transition-transform" />
        </div>

        <h3 className="font-semibold  mb-1 hover:underline
         sm:text-lg text-sm
         ">
          {product.name}
        </h3>
      </Link>
      <p className="text-gray-500 
       sm:text-lg text-sm
      ">
        {product.category}

      </p>
      <p className="font-bold text-blue-600 
       sm:mb-4 mb-1
      ">
        ${product.price}
      </p>
      <button
        className="relative w-38 group overflow-hidden bg-blue-600 text-white rounded transition hover:cursor-pointer
        sm:h-10 h-8"
        onClick={() => onAddToCart(product)}
      >
        <span
          className="absolute inset-0 h-full w-full bg-blue-500 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 ease-in-out z-0"
        ></span>
        <span className="relative z-10 flex items-center justify-center h-full w-full">
          Add to Cart
        </span>
      </button>
    </div>
  )
}
