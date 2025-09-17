import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LimitedOffer() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2); // 2-day countdown
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    return {
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-green-600 text-white p-10 rounded-2xl mt-16 text-center">
      <h2 className="text-3xl font-bold mb-2">Limited Time Offer!</h2>
      <p className="text-lg mb-4">
        Get 30% OFF all hiking essentials. Offer ends soon!
      </p>

      {/* Countdown */}
      <div className="flex justify-center gap-6 mb-6">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="text-center">
            <div className="text-3xl font-bold">{value}</div>
            <span className="text-sm uppercase">{label}</span>
          </div>
        ))}
      </div>

      <Link
        to="/shop"
        className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-md hover:bg-gray-100 transition"
      >
        Shop Now <ArrowRight size={18} />
      </Link>
    </section>
  );
}
