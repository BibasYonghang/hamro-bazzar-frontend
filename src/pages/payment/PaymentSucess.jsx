import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../auth.js";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const canvasRef = useRef(null);

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
  const { user, token } = isAuthenticated() || {};

  const API_BASE = import.meta.env.VITE_BASE_URL;

  const order = {
    orderItems: cartItems,
    shippingAddress1: shippingInfo?.shippingAddress1 || "",
    shippingAddress2: shippingInfo?.shippingAddress2 || "",
    city: shippingInfo?.city || "",
    country: shippingInfo?.country || "",
    zip: shippingInfo?.zip || "",
    phone: shippingInfo?.phone || "",
    user: user?._id || null,
  };

  // Particle system for 4D effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.reset();
        this.z = Math.random() * 4 - 2;
        this.w = Math.random() * 2 - 1; // 4th dimension
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 3 + 1;
        this.alpha = Math.random() * 0.5 + 0.3;
        this.color = `hsl(${120 + Math.random() * 30}, 70%, 60%)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += (Math.random() - 0.5) * 0.1;
        this.w += (Math.random() - 0.5) * 0.05;

        // 4D transformation effect
        const scale = 1 + this.w * 0.1;
        this.displayX = this.x + this.z * 10;
        this.displayY = this.y + this.w * 10;
        this.displayRadius = this.radius * scale;

        if (
          this.displayX < -50 ||
          this.displayX > canvas.width + 50 ||
          this.displayY < -50 ||
          this.displayY > canvas.height + 50
        ) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
          this.displayX,
          this.displayY,
          this.displayRadius,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // Glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    particlesRef.current = Array.from({ length: 50 }, () => new Particle());

    let animationFrameId;

    const animate = () => {
      ctx.fillStyle = "rgba(240, 253, 244, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 4D Card animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = ((centerY - y) / centerY) * 8;
      const translateZ = Math.abs(rotateX + rotateY) * 0.5;

      // 4D effect with perspective and depth
      card.style.transform = `
                perspective(1200px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                translateZ(${translateZ}px)
                scale3d(1.02, 1.02, 1.02)
            `;

      // Dynamic shadow and glow
      const glowIntensity = Math.abs(rotateX + rotateY) * 0.5;
      card.style.boxShadow = `
                ${rotateY}px ${rotateX}px 40px rgba(34, 197, 94, 0.3),
                ${-rotateY}px ${-rotateX}px 30px rgba(134, 239, 172, 0.2),
                0 0 ${20 + glowIntensity * 10}px rgba(34, 197, 94, 0.4)
            `;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;

      cardRef.current.style.transform = `
                perspective(1200px) 
                rotateX(0) 
                rotateY(0) 
                translateZ(0)
                scale3d(1, 1, 1)
            `;
      cardRef.current.style.boxShadow = `
                0 25px 50px rgba(34, 197, 94, 0.25),
                0 0 60px rgba(134, 239, 172, 0.15)
            `;
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const processPayment = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const encodedData = params.get("data");

        if (!encodedData) {
          navigate("/payment-failure");
          return;
        }

        const decodedData = atob(encodedData);
        const paymentData = JSON.parse(decodedData);

        if (paymentData.status === "COMPLETE") {
          if (token) {
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
            await axios.post(`${API_BASE}/postorder`, order, config);
          }

          localStorage.removeItem("cartItems");
          localStorage.removeItem("shippingInfo");

          setTimeout(() => {
            navigate("/thank-you");
          }, 2000);
        } else {
          navigate("/payment-failure");
        }
      } catch (err) {
        console.error("Payment processing error:", err);
        navigate("/payment-failure");
      }
    };

    processPayment();
  }, [navigate, token, order]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4">
      {/* 4D Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-pulse rounded-full bg-green-300 opacity-20 blur-xl filter"></div>
        <div className="absolute right-1/4 bottom-1/3 h-40 w-40 animate-pulse rounded-full bg-emerald-300 opacity-15 blur-xl filter"></div>
        <div className="absolute top-1/3 right-1/3 h-28 w-28 animate-pulse rounded-full bg-teal-300 opacity-25 blur-xl filter"></div>
      </div>

      <style jsx>{`
        @keyframes float4D {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate3d(-5px, -8px, 10px) rotate(-1deg) scale(1.02);
          }
          50% {
            transform: translate3d(0, -12px, 20px) rotate(0deg) scale(1.05);
          }
          75% {
            transform: translate3d(5px, -8px, 10px) rotate(1deg) scale(1.02);
          }
        }

        @keyframes pulse4D {
          0%,
          100% {
            box-shadow:
              0 0 30px rgba(34, 197, 94, 0.4),
              0 0 60px rgba(134, 239, 172, 0.3),
              0 0 90px rgba(187, 247, 208, 0.2);
          }
          50% {
            box-shadow:
              0 0 50px rgba(34, 197, 94, 0.6),
              0 0 80px rgba(134, 239, 172, 0.4),
              0 0 120px rgba(187, 247, 208, 0.3);
          }
        }

        @keyframes iconOrbit {
          0% {
            transform: rotate(0deg) translateX(20px) rotate(0deg) scale(1);
          }
          100% {
            transform: rotate(360deg) translateX(20px) rotate(-360deg)
              scale(1.1);
          }
        }

        .floating-4d {
          animation: float4D 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .pulse-4d {
          animation: pulse4D 3s ease-in-out infinite;
        }

        .orbiting-icon {
          animation: iconOrbit 8s linear infinite;
          transform-style: preserve-3d;
        }
      `}</style>

      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md transform overflow-hidden rounded-3xl bg-white/90 p-8 text-center backdrop-blur-sm transition-all duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          boxShadow:
            "0 25px 50px rgba(34, 197, 94, 0.25), 0 0 60px rgba(134, 239, 172, 0.15)",
        }}
      >
        {/* Animated Border */}
        <div className="pulse-4d absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400 to-emerald-500 opacity-20"></div>
        <div className="absolute inset-1 rounded-2xl bg-white/95 backdrop-blur-sm"></div>

        {/* Orbiting Elements */}
        <div className="orbiting-icon absolute -top-4 -right-4 h-8 w-8 rounded-full bg-green-400 opacity-60"></div>
        <div
          className="orbiting-icon absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-emerald-400 opacity-60"
          style={{ animationDelay: "-4s" }}
        ></div>

        {/* Main Content */}
        <div
          className="relative z-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* 4D Animated Icon */}
          <div className="floating-4d relative mx-auto mb-8 h-28 w-28">
            <div className="absolute inset-0 scale-150 transform rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 blur-xl"></div>
            <CheckCircle2 className="floating-4d relative z-10 h-full w-full text-green-500" />

            {/* Orbiting mini icons */}
            <div className="orbiting-icon absolute top-0 left-1/2 h-6 w-6 rounded-full bg-green-400 opacity-70"></div>
            <div
              className="orbiting-icon absolute bottom-0 left-1/2 h-4 w-4 rounded-full bg-emerald-400 opacity-70"
              style={{ animationDelay: "-2s" }}
            ></div>
          </div>

          {/* 4D Text Effects */}
          <div className="mb-6" style={{ transformStyle: "preserve-3d" }}>
            <h1
              className="floating-4d mb-4 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-4xl font-black text-transparent"
              style={{ animationDelay: "0.5s" }}
            >
              Payment Successful!
            </h1>

            <div
              className="floating-4d mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* Animated Content */}
          <div
            className="mb-8 space-y-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <p
              className="floating-4d text-lg leading-relaxed text-gray-700"
              style={{ animationDelay: "1.5s" }}
            >
              Thank you for your purchase! Your order has been successfully
              processed.
            </p>
            <p
              className="floating-4d text-sm text-gray-500"
              style={{ animationDelay: "2s" }}
            >
              You will be redirected to the Thank You page shortly.
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-2000 ease-linear"
              style={{
                width: "100%",
                animation: "pulse4D 2s ease-in-out infinite",
              }}
            ></div>
          </div>

          {/* Floating Celebration Text */}
          <div
            className="floating-4d text-xs text-gray-400"
            style={{ animationDelay: "2.5s" }}
          >
            🎉 Celebrating your successful transaction! 🎉
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
