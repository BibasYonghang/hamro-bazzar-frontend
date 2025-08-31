// Navbar.jsx
import React from "react"; 

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">Hamro Bazzar</Link>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/shop" className="hover:text-blue-600">Shop</Link>
        <Link to="/cart" className="hover:text-blue-600">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
