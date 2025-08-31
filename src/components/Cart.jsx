// Cart.jsx
import React from 'react';

const Cart = ({ cartItems, onRemove, onUpdateQty }) => (
  <div>
    {cartItems.length === 0 ? (
      <p className="text-gray-500">Your cart is empty.</p>
    ) : (
      <ul className="divide-y">
        {cartItems.map(item => (
          <li key={item.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="h-16 w-16 object-contain" />
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-gray-500">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onUpdateQty(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
              <button onClick={() => onRemove(item.id)} className="ml-4 text-red-500 hover:underline">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Cart;
