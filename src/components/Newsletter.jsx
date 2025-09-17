import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="bg-gray-100 py-12 mt-16 rounded-xl text-center">
      <h2 className="text-3xl font-bold mb-4">Join Our Adventure Club</h2>
      <p className="text-gray-600 mb-6">
        Subscribe and get 10% OFF your first order, plus exclusive deals.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400 flex-1"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
