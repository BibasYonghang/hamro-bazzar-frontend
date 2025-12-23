import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../auth.js";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const API_BASE = import.meta.env.VITE_BASE_URL;

  // Main payment processing
  useEffect(() => {
    const processPayment = async () => {
      try {
        console.log("=== PAYMENT SUCCESS - STARTING ===");

        // Get authentication FIRST
        const { user, token } = isAuthenticated() || {};
        if (!user || !token) {
          setError("Please login to complete your order");
          setTimeout(() => navigate("/login"), 3000);
          return;
        }

        // 1. Get payment data from URL
        const params = new URLSearchParams(window.location.search);
        const encodedData = params.get("data");

        if (!encodedData) {
          setError("No payment data found");
          setTimeout(() => navigate("/payment-failure"), 2000);
          return;
        }

        // 2. Decode payment data
        const decodedData = atob(encodedData);
        const paymentData = JSON.parse(decodedData);

        console.log("✅ Payment data received:", paymentData);

        if (paymentData.status !== "COMPLETE") {
          setError("Payment failed or was cancelled");
          setTimeout(() => navigate("/payment-failure"), 2000);
          return;
        }

        // 3. CRITICAL: Get cart data - RESTORE FROM BACKUP IF NEEDED
        let cartItems = [];
        let shippingInfo = {};

        // First check the main cart storage
        const mainCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const mainShipping =
          JSON.parse(localStorage.getItem("shippingInfo")) || {};

        console.log("Main cart items:", mainCart.length);
        console.log("Main shipping info:", mainShipping);

        if (mainCart.length > 0) {
          // Use main cart if it has items
          cartItems = mainCart;
          shippingInfo = mainShipping;
          console.log("✅ Using main cart with", cartItems.length, "items");
        } else {
          console.log("Main cart empty, checking backups...");

          // Backup 1: orderBackup (most reliable)
          const orderBackup = JSON.parse(localStorage.getItem("orderBackup"));
          if (
            orderBackup &&
            orderBackup.cartItems &&
            orderBackup.cartItems.length > 0
          ) {
            console.log(
              "✅ Found orderBackup with",
              orderBackup.cartItems.length,
              "items"
            );
            cartItems = orderBackup.cartItems;
            shippingInfo = orderBackup.shippingInfo || {};

            // RESTORE to main storage so other parts of code can use it
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
          }
          // Backup 2: sessionStorage
          else {
            const sessionBackup = JSON.parse(
              sessionStorage.getItem("pendingOrder")
            );
            if (
              sessionBackup &&
              sessionBackup.cartItems &&
              sessionBackup.cartItems.length > 0
            ) {
              console.log(
                "✅ Found session backup with",
                sessionBackup.cartItems.length,
                "items"
              );
              cartItems = sessionBackup.cartItems;
              shippingInfo = sessionBackup.shippingInfo || {};

              // Also save to main storage
              localStorage.setItem("cartItems", JSON.stringify(cartItems));
              localStorage.setItem(
                "shippingInfo",
                JSON.stringify(shippingInfo)
              );
            }
          }
        }

        // 4. If still no cart items after all checks
        if (cartItems.length === 0) {
          console.warn("❌ No cart items found after checking all sources");
          console.log("Payment was:", paymentData);

          // Check if we have recent carts
          const recentCarts = JSON.parse(
            localStorage.getItem("recentCarts") || "[]"
          );
          if (recentCarts.length > 0) {
            const lastCart = recentCarts[recentCarts.length - 1];
            console.log("Trying last recent cart:", lastCart);
            cartItems = lastCart.items || [];
            shippingInfo = lastCart.shippingInfo || {};
          }

          if (cartItems.length === 0) {
            // Create minimal order with payment info only
            const minimalOrder = {
              orderItems: [
                {
                  name: "Payment Transaction",
                  quantity: 1,
                  price: parseFloat(paymentData.total_amount) || 0,
                  note: `Payment ID: ${paymentData.transaction_uuid}`,
                },
              ],
              shippingAddress: {
                address: "To be confirmed",
                city: "",
                country: "",
              },
              paymentMethod: "Card",
              paymentResult: {
                id: paymentData.transaction_uuid,
                status: paymentData.status,
                update_time: new Date().toISOString(),
                email_address: user.email,
              },
              shippingPrice: 0,
              totalPrice: parseFloat(paymentData.total_amount) || 0,
              user: user._id,
              notes: "Cart data was lost. Payment was successful.",
            };

            console.log("Creating minimal order from payment data");
            await createOrder(minimalOrder, token, paymentData);
            return;
          }
        }

        console.log("✅ Final cart items:", cartItems.length);
        console.log("✅ Shipping info:", shippingInfo);

        // 5. Create proper order
        const order = {
          orderItems: cartItems.map((item) => ({
            product: item._id || item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          })),
          shippingAddress: {
            address: shippingInfo?.shippingAddress1 || "",
            address2: shippingInfo?.shippingAddress2 || "",
            city: shippingInfo?.city || "",
            country: shippingInfo?.country || "",
            postalCode: shippingInfo?.zip || "",
            phone: shippingInfo?.phone || "",
          },
          paymentMethod: "Card",
          paymentResult: {
            id: paymentData.transaction_uuid,
            status: paymentData.status,
            update_time: new Date().toISOString(),
            email_address: user.email,
          },
          shippingPrice: 0,
          totalPrice: cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
          user: user._id,
        };

        console.log("✅ Creating order:", order);
        await createOrder(order, token, paymentData);
      } catch (err) {
        console.error("Payment processing error:", err);
        setError("An error occurred while processing your payment");
      }
    };

    const createOrder = async (order, token, paymentData) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        console.log("Sending order to:", `${API_BASE}/postorder`);

        const response = await axios.post(
          `${API_BASE}/postorder`,
          order,
          config
        );

        console.log("✅ Order created successfully:", response.data);

        // Save order details for display
        setOrderDetails({
          orderId:
            response.data._id ||
            response.data.orderId ||
            paymentData.transaction_uuid,
          items: order.orderItems,
          total: order.totalPrice,
          date: new Date().toLocaleDateString(),
        });

        // Clear backup data ONLY AFTER successful order
        localStorage.removeItem("orderBackup");
        sessionStorage.removeItem("pendingOrder");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("shippingInfo");

        // Save to recent orders
        const recentOrders = JSON.parse(
          localStorage.getItem("recentOrders") || "[]"
        );
        recentOrders.push({
          orderId: response.data._id || paymentData.transaction_uuid,
          date: new Date().toISOString(),
          total: order.totalPrice,
        });
        localStorage.setItem(
          "recentOrders",
          JSON.stringify(recentOrders.slice(-10))
        );

        setIsProcessing(false);

        // Redirect to thank you page
        setTimeout(() => {
          navigate("/thank-you", {
            state: {
              orderId: response.data._id || paymentData.transaction_uuid,
              orderDetails: order,
            },
          });
        }, 3000);
      } catch (err) {
        console.error(
          "❌ Failed to create order:",
          err.response?.data || err.message
        );
        setError(
          err.response?.data?.message ||
            `Payment successful but order creation failed. Please contact support with payment ID: ${paymentData.transaction_uuid}`
        );

        // Save payment data for manual recovery
        const failedPayments = JSON.parse(
          localStorage.getItem("failedPayments") || "[]"
        );
        failedPayments.push({
          paymentData,
          order,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem(
          "failedPayments",
          JSON.stringify(failedPayments.slice(-5))
        );
      }
    };

    // Start processing after short delay
    const timer = setTimeout(() => {
      processPayment();
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate, API_BASE]);

  // ... rest of your component UI remains the same
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4">
      {/* Your existing UI code */}
      <div className="mb-8 space-y-4">
        {error ? (
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-lg font-medium text-red-800">
              Attention Required
            </p>
            <p className="mt-2 text-red-600">{error}</p>
            <button
              onClick={() => navigate("/contact")}
              className="mt-3 rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600"
            >
              Contact Support
            </button>
          </div>
        ) : isProcessing ? (
          <>
            <p className="text-lg text-gray-700">
              Payment verified! Creating your order...
            </p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-2 w-2 animate-pulse rounded-full bg-green-500"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-700">
              Success! Your order has been created.
            </p>
            {orderDetails && (
              <div className="rounded-lg bg-green-50 p-4">
                <p className="font-medium text-green-800">
                  Order #: {orderDetails.orderId?.slice(-8)}
                </p>
                <p className="text-green-600">Thank you for your purchase!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
