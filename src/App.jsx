import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import OfferProduct from "./pages/OfferProduct";
import NotFound from "./pages/NotFound";
import Collections from "./pages/Collections";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import ElectronicsProducts from "./pages/ElectronicsProducts";
import PersonalCareProducts from "./pages/PersonalCareProducts";
import GamingProducts from "./pages/GamingProducts";
import HomeFurnitureProducts from "./pages/HomeFurnitureProducts";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./components/shared/ScrollToTop.jsx";
import PaymentChoice from "./pages/PaymentChoice.jsx";
import PaymentFailure from "./pages/PaymentFailure.jsx";
import PaymentSuccess from "./pages/PaymentSucess.jsx";
import ThankYou from "./pages/ThankYou.jsx";

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
      <Navbar cartCount={cart.length} />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/offered-products" element={<OfferProduct />} />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/electronics" element={<ElectronicsProducts />} />
          <Route path="/personal-care" element={<PersonalCareProducts />} />
          <Route path="/gaming" element={<GamingProducts />} />
          <Route path="/home-furniture" element={<HomeFurnitureProducts />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/payment-choice" element={<PaymentChoice />} />

          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
