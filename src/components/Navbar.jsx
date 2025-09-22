// Navbar.jsx
import { Search, ShoppingCart } from "lucide-react";
import React from "react";

import { Link } from 'react-router-dom';

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/", classname: "hover:text-blue-700 text-blue-900 font-semibold md:text-xl text-base" },
    { name: "Shop", path: "/shop", classname: "hover:text-blue-700 text-blue-900  font-semibold md:text-xl text-base" },
    { name: "Blogs", path: "/blog", classname: "hover:text-blue-700 text-blue-900  font-semibold md:text-xl text-base" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-blue-50 shadow-md flex justify-between items-center pr-5 
    lg:pl-4 sm:pl-2 
    lg:pr-9 sm:pr-6
   ">
      <Link to="/" className="text-2xl font-bold text-blue-600"><img src="/hamro-bazzar-logo.png" alt="" className="h-21" /></Link>
      <div className="w-[40vw] h-13 bg-white border border-gray-500 outline-gray-600 rounded-full">
        <input type="text" placeholder="Search Hamro Bazzar..." className="w-[35vw] h-13 pb-1 outline-none  placeholder:text-gray-500
        lg:pl-8 sm:pl-5 pl-3
        " />
        <Search className="inline mb-2  hover:cursor-pointer text-blue-800 hover:text-blue-500 
        lg:ml-2 
        sm:mr-2
        " />
      </div>
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
        <Link to="/cart"><ShoppingCart size={window.innerWidth > 768 ? 25 : 20} className="mt-1 hover:text-blue-700 text-blue-900 " /> </Link>
      </div>

    </nav>
  );
};

export default Navbar;
