import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';

const NotFound = () => {
  // Generate fixed positions for particles to avoid re-rendering issues
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent animate-slide-in"></div>
            <Sparkles className="w-6 h-6 text-purple-600 animate-spin-slow" />
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent animate-slide-in animation-delay-500"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 animate-fade-in">
            Oops! Page Not Found
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 animate-fade-in animation-delay-300">
            The page you're looking for seems to have wandered off into the digital void.
          </p>
          <p className="text-lg text-gray-500 animate-fade-in animation-delay-500">
            Don't worry, let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in animation-delay-700">
          <Link
            to="/"
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5 group-hover:animate-bounce" />
            Go to Home
          </Link>
          <Link
            to="/all-products"
            className="group flex items-center gap-2 px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold text-lg border-2 border-gray-300 shadow-lg hover:shadow-2xl hover:border-blue-500 transform hover:scale-105 transition-all duration-300"
          >
            <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
            Browse Products
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold text-lg border-2 border-gray-300 shadow-lg hover:shadow-2xl hover:border-purple-500 transform hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:animate-bounce" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-in animation-delay-1000">
          <Link
            to="/electronics"
            className="p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-200"
          >
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm font-medium text-gray-700">Electronics</div>
          </Link>
          <Link
            to="/personal-care"
            className="p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-200"
          >
            <div className="text-2xl mb-2">✨</div>
            <div className="text-sm font-medium text-gray-700">Personal Care</div>
          </Link>
          <Link
            to="/home-furniture"
            className="p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-200"
          >
            <div className="text-2xl mb-2">🏠</div>
            <div className="text-sm font-medium text-gray-700">Furniture</div>
          </Link>
          <Link
            to="/gaming"
            className="p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-200"
          >
            <div className="text-2xl mb-2">🎮</div>
            <div className="text-sm font-medium text-gray-700">Gaming</div>
          </Link>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes slide-in {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 4rem;
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slide-in 1s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
