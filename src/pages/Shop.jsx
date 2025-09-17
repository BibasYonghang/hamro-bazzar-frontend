// Shop.jsx
import React, { useState } from 'react';
import ProductList from '../components/ProductList';
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
      <h2 className="text-2xl font-bold mb-4">Shop</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/2"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/4"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <ProductList products={filtered} onAddToCart={onAddToCart} />
    </div>
  );
};

export default Shop;
