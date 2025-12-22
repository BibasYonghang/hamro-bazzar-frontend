import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const CartPage = ({ cart }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Make sure each product has a quantity, or default to 1
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white px-[3vw] py-8'>
      {/* Header */}
      <div
        className={`mb-8 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h2 className="text-4xl sm:text-5xl font-bold">
            Your <span className='text-blue-600'>Cart</span>
          </h2>
        </div>
        <p className="text-gray-600 text-lg">
          {cart.length > 0 
            ? `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`
            : 'Your cart is empty'}
        </p>
      </div>

      {/* Cart Component */}
      <div
        className={`transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <Cart cartItems={cart} />
      </div>

      {/* Total and Checkout */}
      {cart.length > 0 && (
        <div
          className={`mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-gray-800">Total:</div>
            <div className="text-3xl font-bold text-blue-600">${total.toFixed(2)}</div>
          </div>
          <Link
            to="/checkout"
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}

      {/* Empty Cart Message */}
      {cart.length === 0 && (
        <div
          className={`text-center py-20 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500 mb-6">Start shopping to add items to your cart!</p>
          <Link
            to="/all-products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
