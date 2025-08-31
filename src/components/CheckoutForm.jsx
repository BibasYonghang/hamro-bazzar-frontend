// CheckoutForm.jsx
import React, { useState } from 'react';

const CheckoutForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Shipping Address"
        value={form.address}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Place Order</button>
    </form>
  );
};

export default CheckoutForm;
