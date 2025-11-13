import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import OfferProduct from "./pages/OfferProduct";
import NotFound from "./pages/NotFound";
import Collections from "./pages/Collections";
import ProductCard from "./components/shared/ProductCard";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";

function App() {
  // 1. Create cart state
  const [cart, setCart] = useState([]);

  // 2. Function to handle adding products to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log("Cart after adding:", [...cart, product]);
  };

  return (
    <div className="flex flex-col">
      <Navbar cartCount={cart.length} /> {/* Optional: pass cart count to navbar */}
      <main>
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
          <Route path="/offer-product" element={<OfferProduct />} />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/product/:id" element={<ProductCard onAddToCart={handleAddToCart} />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
