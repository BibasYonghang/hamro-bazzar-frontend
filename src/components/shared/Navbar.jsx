import { Search } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_BASE_URL;

  const navLinks = [
    {
      name: "Home",
      path: "/",
      classname:
        "hover:text-blue-700 text-blue-900 font-semibold md:text-xl text-base",
    },
    {
      name: "All Products",
      path: "/all-products",
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

  // Fetch product globally by name
  const searchProductByName = async (productName) => {
    const endpoints = [
      "all-products",
      "electronics",
      "home-furniture",
      "gaming",
      "personal-care",
    ];

    for (const endpoint of endpoints) {
      try {
        const res = await fetch(`${API_BASE}/${endpoint}`);
        if (!res.ok) continue;

        const data = await res.json();

        // Try exact match first
        let found = data.find(
          (p) => p.name?.toLowerCase() === productName.toLowerCase()
        );
        if (!found) {
          // Fallback to partial match
          found = data.find((p) =>
            p.name?.toLowerCase().includes(productName.toLowerCase())
          );
        }

        if (found) return found;
      } catch (err) {
        console.log("Search error:", err);
      }
    }

    return null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError("");

    const term = searchQuery.trim();
    if (!term) {
      setSearchError("Enter a product name to search.");
      return;
    }

    try {
      const foundProduct = await searchProductByName(term);

      if (foundProduct) {
        // Use correct route `/products/:id`
        navigate(`/products/${foundProduct._id}`, {
          state: { product: foundProduct },
        });
      } else {
        // Redirect to All Products with query param for fallback
        navigate(`/all-products?q=${encodeURIComponent(term)}`);
      }

      setSearchQuery(""); // optional
    } catch (error) {
      console.log(error);
      setSearchError("Something went wrong. Please try again.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white px-3 py-2 shadow-md sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
        <Link to="/" className="flex items-center">
          <img
            src="/images/hamro-bazzar-logo.png"
            alt="Hamro Bazzar Logo"
            className="h-10 sm:h-12 md:h-[60px]"
          />
        </Link>

        {/* Search (desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-1 sm:flex sm:w-auto md:w-[40vw]"
        >
          <input
            type="text"
            placeholder="Search Products in Hamro Bazzar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full flex-1 rounded-full px-3 py-2 text-sm outline-none placeholder:text-gray-500 sm:px-4 sm:text-base"
          />
          <button type="submit">
            <Search className="cursor-pointer text-blue-800 hover:text-blue-500" />
          </button>
        </form>

        <div className="flex w-auto items-center justify-center gap-6 md:gap-10">
          {navLinks.map(({ name, path, classname }, i) => (
            <Link key={i} to={path} className={classname}>
              {name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Search */}
      <form
        onSubmit={handleSearch}
        className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-1 sm:hidden"
      >
        <input
          type="text"
          placeholder="Search Hamro Bazzar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full flex-1 rounded-full px-3 py-2 text-sm outline-none placeholder:text-gray-500"
        />
        <button type="submit">
          <Search className="cursor-pointer text-blue-800 hover:text-blue-500" />
        </button>
      </form>

      {searchError && (
        <p className="mt-2 text-center text-sm text-red-500">{searchError}</p>
      )}
    </nav>
  );
};

export default Navbar;
