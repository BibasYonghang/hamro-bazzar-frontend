// Footer.jsx
import { Mail, Phone } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
    setIsVisible(true);

    // Animation for elements on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const socialMediaIcons = [
    {
      path: "https://facebook.com",
      icon: FaFacebook,
      color: "hover:bg-blue-700",
      label: "Facebook",
    },
    {
      path: "https://instagram.com",
      icon: FaInstagram,
      color: "hover:bg-pink-600",
      label: "Instagram",
    },
    {
      path: "https://linkedin.com",
      icon: FaLinkedin,
      color: "hover:bg-blue-800",
      label: "LinkedIn",
    },
    {
      path: "https://youtube.com",
      icon: FaYoutube,
      color: "hover:bg-red-600",
      label: "YouTube",
    },
  ];

  const contactInfo = [
    { icon: Phone, text: "+977 9808102206", href: "tel:+9779808102206" },
    { icon: Mail, text: "hmrobzr@gmail.com", href: "mailto:hmrobzr@gmail.com" },
    { icon: FaWhatsapp, text: "WhatsApp", href: "https://wa.me/9779808102206" },
  ];

  const informationLinks = [
    { text: "Home", href: "/" },
    { text: "Blog", href: "/blog" },
    { text: "Testimonials", href: "/testimonials" },
    { text: "Careers", href: "/careers" },
  ];

  const helpfulLinks = [
    { text: "Services", href: "/services" },
    { text: "Supports", href: "/support" },
    { text: "Terms & Conditions", href: "/terms" },
    { text: "Privacy Policy", href: "/privacy" },
  ];

  const ourServices = [
    { text: "Brand Partnerships", href: "/brands" },
    { text: "Order Tracking", href: "/track-order" },
    { text: "Exchange & Return", href: "/exchange" },
    { text: "Delivery Information", href: "/delivery" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-blue-50 to-white text-gray-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Social Media Section */}
          <div className="animate-on-scroll opacity-0">
            <div className="mb-8">
              <div className="mb-2 transform transition-transform duration-300 hover:scale-105">
                <img
                  src="/images/hamro-bazzar-logo.png"
                  alt="Hamro Bazzar"
                  className="h-24 md:h-28 lg:h-32 "
                />
              </div>

              {/* Social Media Icons with Animation */}
              <div className="flex gap-4">
                {socialMediaIcons.map(
                  ({ path, icon: Icon, color, label }, idx) => (
                    <a
                      key={idx}
                      href={path}
                      aria-label={label}
                      className={`group relative bg-white shadow-lg rounded-full p-3 transition-all duration-300 
                               transform hover:-translate-y-1 hover:shadow-xl ${color}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      <span
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 
                                   transition-opacity duration-300 text-xs text-gray-600 whitespace-nowrap"
                      >
                        {label}
                      </span>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className="animate-on-scroll opacity-0"
            style={{ animationDelay: "100ms" }}
          >
            <h3 className="text-xl font-bold mb-6 text-blue-700 flex items-center">
              <div className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></div>
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map(({ icon: Icon, text, href }, idx) => (
                <li key={idx}>
                  <a
                    href={href}
                    className="flex items-center group text-gray-600 hover:text-blue-700 transition-colors duration-300"
                  >
                    <div className="bg-blue-100 p-2 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors duration-300">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div
            className="animate-on-scroll opacity-0"
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="text-xl font-bold mb-6 text-blue-700 flex items-center">
              <div className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></div>
              Information
            </h3>
            <ul className="space-y-3">
              {informationLinks.map(({ text, href }, idx) => (
                <li key={idx}>
                  <a
                    href={href}
                    className="text-gray-600 hover:text-blue-700 transition-colors duration-300 group flex items-center"
                  >
                    <span className="w-2 h-0.5 bg-blue-400 opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300"></span>
                    {text}
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful Links & Services */}
          <div
            className="animate-on-scroll opacity-0"
            style={{ animationDelay: "300ms" }}
          >
            <h3 className="text-xl font-bold mb-6 text-blue-700 flex items-center">
              <div className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {helpfulLinks.map(({ text, href }, idx) => (
                <li key={idx}>
                  <a
                    href={href}
                    className="text-gray-600 hover:text-blue-700 transition-colors duration-300 group flex items-center"
                  >
                    <span className="w-2 h-0.5 bg-blue-400 opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300"></span>
                    {text}
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t border-gray-200 pt-8 animate-on-scroll opacity-0"
          style={{ animationDelay: "500ms" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-600">
                &copy; {year} Hamro Bazzar. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-gray-600 hover:text-blue-700 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-600 hover:text-blue-700 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/sitemap"
                className="text-gray-600 hover:text-blue-700 transition-colors duration-300"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
