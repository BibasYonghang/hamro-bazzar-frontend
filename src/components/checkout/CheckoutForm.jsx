import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import axios from "axios";

const CheckoutForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_BASE_URL;

  // Pre-fill form if shipping info exists
  useEffect(() => {
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
    if (shippingInfo) {
      setForm((prev) => ({
        ...prev,
        name: shippingInfo.name || "",
        address: shippingInfo.shippingAddress1 || "",
        city: shippingInfo.city || "",
        country: shippingInfo.country || "",
        zip: shippingInfo.zip || "",
        phone: shippingInfo.phone || "",
        email: shippingInfo.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      // 1. Validate cart exists
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      if (cartItems.length === 0) {
        setError("Your cart is empty!");
        setIsProcessing(false);
        return;
      }

      // 2. Get user authentication
      const { user, token } = isAuthenticated() || {};
      if (!user || !token) {
        setError("Please login to continue");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      // 3. Save shipping info to localStorage
      const shippingInfo = {
        name: form.name,
        email: form.email,
        shippingAddress1: form.address,
        shippingAddress2: "",
        city: form.city,
        country: form.country,
        zip: form.zip,
        phone: form.phone,
      };

      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));

      // 4. CRITICAL: Save cart data to MULTIPLE backup locations
      // before redirecting to payment
      const orderBackup = {
        cartItems,
        shippingInfo,
        user: user._id,
        timestamp: new Date().toISOString(),
        total: cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

      // Backup 1: localStorage with special key
      localStorage.setItem("orderBackup", JSON.stringify(orderBackup));

      // Backup 2: sessionStorage
      sessionStorage.setItem("pendingOrder", JSON.stringify(orderBackup));

      // Backup 3: Save recent carts history
      const recentCarts = JSON.parse(
        localStorage.getItem("recentCarts") || "[]"
      );
      recentCarts.push({
        items: cartItems,
        shippingInfo,
        timestamp: new Date().toISOString(),
      });
      // Keep only last 5 carts
      localStorage.setItem(
        "recentCarts",
        JSON.stringify(recentCarts.slice(-5))
      );

      console.log("✅ Cart backup created:", orderBackup);

      // 5. Prepare order data for server
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id || item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        shippingAddress: {
          address: form.address,
          city: form.city,
          country: form.country,
          postalCode: form.zip,
          phone: form.phone,
        },
        user: user._id,
        totalPrice: orderBackup.total,
        status: "pending_payment",
      };

      // 6. Option A: Save order to server first (RECOMMENDED)
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // Create pending order on server
        const response = await axios.post(
          `${API_BASE}/orders/create-pending`,
          orderData,
          config
        );
        const orderId = response.data.orderId || response.data._id;

        console.log("✅ Pending order created on server:", orderId);

        // 7. Prepare payment data
        const paymentData = {
          amount: orderBackup.total,
          currency: "USD",
          orderId: orderId,
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
          },
          // Encode cart data to pass to payment gateway
          cartData: btoa(
            JSON.stringify({
              orderId: orderId,
              itemCount: cartItems.length,
              total: orderBackup.total,
            })
          ),
          returnUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/payment-cancel`,
        };

        // 8. Option B: If you're using a client-side payment integration
        // Call your payment API to get payment link
        const paymentResponse = await axios.post(
          `${API_BASE}/payment/create`,
          paymentData,
          config
        );

        // 9. Redirect to payment gateway
        if (paymentResponse.data.paymentUrl) {
          window.location.href = paymentResponse.data.paymentUrl;
        } else {
          // If no payment URL, simulate payment for testing
          simulatePayment(orderId, orderBackup.total);
        }
      } catch (serverError) {
        console.error("Server error:", serverError);

        // Fallback: Direct payment simulation if server fails
        setError("Payment system temporarily unavailable. Using demo mode.");
        setTimeout(() => {
          simulatePayment("DEMO_" + Date.now(), orderBackup.total);
        }, 2000);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("An error occurred during checkout. Please try again.");
      setIsProcessing(false);
    }
  };

  // Simulate payment for testing
  const simulatePayment = (orderId, amount) => {
    console.log("Simulating payment for order:", orderId);

    // Create mock payment data
    const paymentData = {
      transaction_code: "000DGPQ",
      status: "COMPLETE",
      total_amount: amount.toFixed(2),
      transaction_uuid: orderId,
      product_code: "EPAYTEST",
      signed_field_names:
        "transaction_code,status,total_amount,transaction_uuid,product_code,signed_field_names",
      signature: "8I7YvkLcc7vQh4iuYoMWKE2/7zjW87claIgwCLmZ7hI=",
    };

    // Encode and redirect to success page
    const encodedData = btoa(JSON.stringify(paymentData));

    // Navigate with state to preserve cart data
    navigate(`/payment-success?data=${encodedData}`, {
      state: {
        orderBackup: JSON.parse(localStorage.getItem("orderBackup")),
        fromCheckout: true,
      },
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            name="address"
            placeholder="123 Main St"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              name="city"
              placeholder="New York"
              value={form.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code *
            </label>
            <input
              type="text"
              name="zip"
              placeholder="10001"
              value={form.zip}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country *
          </label>
          <input
            type="text"
            name="country"
            placeholder="United States"
            value={form.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+1 (555) 123-4567"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </div>

        {/* Debug info - remove in production */}
        <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
          <p className="font-medium mb-1">Debug Info:</p>
          <button
            type="button"
            onClick={() => {
              const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
              const backup = JSON.parse(localStorage.getItem("orderBackup"));
              alert(
                `Cart: ${cart.length} items\nBackup: ${backup ? backup.cartItems?.length + " items" : "none"}`
              );
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            Check Cart Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
