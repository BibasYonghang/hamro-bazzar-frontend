import React from 'react';
import Cart from '../pages/Cart';
import { Link } from 'react-router-dom';

const CartPage = ({ cart }) => {
  // Make sure each product has a quantity, or default to 1
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className='px-[3vw]'>
      <h2 className="text-3xl font-bold mt-10">Your <span className='text-blue-600'>Cart</span> </h2>
      {/* Pass the correct prop name to Cart */}
      <Cart cartItems={cart} />

      {cart.length > 0 && (
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
          <Link to="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
