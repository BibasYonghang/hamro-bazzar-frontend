// CheckoutPage.jsx
import React, { useState } from 'react';
import CheckoutForm from '../components/checkout/CheckoutForm';

const CheckoutPage = ({ cartItems, onCheckout }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (form) => {
    setOrderPlaced(true);
    setOrderDetails(form);
    onCheckout();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-6">
        <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
        <p className="mb-2">Order for: <span className="font-semibold">{orderDetails.name}</span></p>
        <p className="mb-2">Email: {orderDetails.email}</p>
        <p className="mb-2">Shipping to: {orderDetails.address}</p>
        <p className="mt-4 font-bold">Total Paid: ${total.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <CheckoutForm onSubmit={handleSubmit} />
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <ul className="mb-2">
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="font-bold">Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CheckoutPage;
