// CartContext.jsx
import React, { useReducer } from 'react';
import { CartContext } from './CartContextOnly';

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(item => item.id === action.product.id);
      if (exists) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }
    case 'REMOVE':
      return state.filter(item => item.id !== action.id);
    case 'UPDATE_QTY':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: Math.max(1, action.quantity) } : item
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = product => dispatch({ type: 'ADD', product });
  const removeFromCart = id => dispatch({ type: 'REMOVE', id });
  const updateQty = (id, quantity) => dispatch({ type: 'UPDATE_QTY', id, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// useCart hook moved to useCart.js for Fast Refresh compatibility
