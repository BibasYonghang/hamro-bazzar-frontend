// Home.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductList from '../components/ProductList';
import products from '../data/products';

const Home = ({ onAddToCart }) => {
  // Show featured products (first 4 for demo)
  const featured = products.slice(0, 4);
  return (
    <div>
      <HeroSection />
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <ProductList products={featured} onAddToCart={onAddToCart} />
    </div>
  );
};

export default Home;
