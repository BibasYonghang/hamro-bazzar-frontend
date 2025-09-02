// Navbar.jsx
import { ShoppingCart } from "lucide-react";
import React from "react";

import { Link } from 'react-router-dom';

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/", classname: "hover:text-blue-700 text-blue-900 font-semibold md:text-xl text-base" },
    { name: "Shop", path: "/shop", classname: "hover:text-blue-700 text-blue-900  font-semibold md:text-xl text-base" },
  ]

  return (
    <nav className="bg-white shadow-md flex justify-between items-center pr-5 
    lg:pl-4 sm:pl-2 
    lg:pr-9 sm:pr-6
   ">
      <Link to="/" className="text-2xl font-bold text-blue-600"><img src="/hamro-bazzar-logo.png" alt="" className="h-21" /></Link>
      <div className="space-x-6 flex">
        {navLinks.map(({ name, path, classname }, idx) => (
          <Link
            key={idx}
            to={path}
            className={classname}
          >
            {name}
          </Link>
        ))}
        <Link><ShoppingCart size={window.innerWidth > 768 ? 25 : 20} className="mt-1 hover:text-blue-700 text-blue-900 " /> </Link>
      </div>

    </nav>
  );
};

export default Navbar;
