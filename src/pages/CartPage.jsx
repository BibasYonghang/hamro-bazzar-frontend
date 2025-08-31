// CartPage.jsx
import React from 'react';
import Cart from '../components/Cart';
import { Link } from 'react-router-dom';

const CartPage = ({ cartItems, onRemove, onUpdateQty }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <Cart cartItems={cartItems} onRemove={onRemove} onUpdateQty={onUpdateQty} />
      {cartItems.length > 0 && (
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
          <Link to="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
