// ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => (
  <div className="grid 
  grid-cols-2 md:grid-cols-3 xl:grid-cols-4
  gap-3 sm:gap-6 md:gap-3 lg:gap-6
  ">
    {products.map(product => (
      <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
    ))}
  </div>
);

export default ProductList;
