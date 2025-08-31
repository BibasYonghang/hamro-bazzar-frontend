// HeroSection.jsx
import React from 'react';

const HeroSection = () => (
  <section className="bg-gradient-to-r from-blue-100 to-blue-300 py-16 px-4 text-center rounded-lg mb-10">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">Welcome to Hamro Bazzar</h1>
    <p className="text-lg md:text-xl text-blue-700 mb-6">Your one-stop shop for the best products at unbeatable prices!</p>
    <a href="/shop" className="inline-block bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition">Shop Now</a>
  </section>
);

export default HeroSection;
