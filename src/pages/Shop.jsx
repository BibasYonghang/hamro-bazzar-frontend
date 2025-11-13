// Shop.jsx
import React, { useState } from 'react';
import products from '../data/products';

const Shop = ({ onAddToCart }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products
  const filtered = products.filter(p =>
    (category === '' || category === 'All' || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className='w-[94vw] mx-auto py-4'>
      <h2 className="text-3xl text-blue-700 font-bold mb-4">Shop</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border-2 border-blue-600 placeholder:text-blue-500 focus:ring-blue-700  focus:ring-1 outline-none  rounded px-3 py-2 
          w-full lg:w-[70vw] sm:w-[70%]"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border-2 border-blue-600 text-blue-700 focus:ring-blue-700  focus:ring-1 outline-none rounded px-3 py-2 w-full sm:w-[30%]"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Shop;
