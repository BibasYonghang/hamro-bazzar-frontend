import { Search, ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    {
      name: "Home",
      path: "/",
      classname:
        "hover:text-blue-700 text-blue-900 font-semibold md:text-xl text-base",
    },
    {
      name: "Shop",
      path: "/shop",
      classname:
        "hover:text-blue-700 text-blue-900 font-semibold md:text-xl text-base",
    },
    {
      name: "Blogs",
      path: "/blog",
      classname:
        "hover:text-blue-700 text-blue-900 font-semibold md:text-xl text-base",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white px-3 py-2 shadow-md sm:px-4 md:px-6 lg:px-8">
      {/* Top Section (Logo + Nav + Cart) */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/hamro-bazzar-logo.png"
            alt="Hamro Bazzar Logo"
            className="h-10 sm:h-12 md:h-[60px]"
          />
        </Link>

        {/* Search Bar (for sm and above) */}
        <div className="hidden sm:flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-1 sm:w-auto md:w-[40vw]">
          <input
            type="text"
            placeholder="Search Hamro Bazzar..."
            className="w-full flex-1 rounded-full px-3 py-2 text-sm placeholder:text-gray-500 outline-none sm:px-4 sm:text-base"
          />
          <Search className="cursor-pointer text-blue-800 hover:text-blue-500" />
        </div>

        {/* Nav Links + Cart */}
        <div className="flex w-auto items-center justify-center gap-6 md:gap-10">
          {navLinks.map(({ name, path, classname }, idx) => (
            <Link key={idx} to={path} className={classname}>
              {name}
            </Link>
          ))}
          <Link to="/cart">
            <ShoppingCart
              size={window.innerWidth > 768 ? 25 : 20}
              className="mt-1 text-blue-900 hover:text-blue-700"
            />
          </Link>
        </div>
      </div>

      {/* Search Bar (only for small screens) */}
      <div className="mt-3 flex sm:hidden items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-1">
        <input
          type="text"
          placeholder="Search Hamro Bazzar..."
          className="w-full flex-1 rounded-full px-3 py-2 text-sm placeholder:text-gray-500 outline-none"
        />
        <Search className="cursor-pointer text-blue-800 hover:text-blue-500" />
      </div>
    </nav>
  );
};

export default Navbar;
