import React from "react";

export const RobotIcon = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Background Glow */}
    <circle cx="32" cy="32" r="30" fill="url(#bgGlow)" />

    {/* Antenna */}
    <path
      d="M32 8V15"
      stroke="url(#blueMetal)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="32" cy="6" r="3" fill="#60A5FA" />

    {/* Robot Head */}
    <rect
      x="14"
      y="16"
      width="36"
      height="30"
      rx="10"
      fill="url(#robotBlue)"
      stroke="#60A5FA"
      strokeWidth="2"
    />

    {/* Inner Face */}
    <rect x="18" y="20" width="28" height="22" rx="7" fill="#0F172A" />

    {/* Eyes */}
    <circle cx="25" cy="30" r="4" fill="#38BDF8" />
    <circle cx="39" cy="30" r="4" fill="#38BDF8" />

    {/* Eye Reflection */}
    <circle cx="24" cy="29" r="1.2" fill="white" />
    <circle cx="38" cy="29" r="1.2" fill="white" />

    {/* Mouth */}
    <rect x="25" y="37" width="14" height="3" rx="1.5" fill="#93C5FD" />

    {/* Side Parts */}
    <rect x="10" y="25" width="4" height="10" rx="2" fill="url(#blueMetal)" />
    <rect x="50" y="25" width="4" height="10" rx="2" fill="url(#blueMetal)" />

    {/* Neck */}
    <rect x="27" y="46" width="10" height="5" rx="2" fill="#3B82F6" />

    {/* Bottom Base */}
    <rect x="22" y="51" width="20" height="5" rx="2.5" fill="url(#blueMetal)" />

    {/* Gradients */}
    <defs>
      <linearGradient id="robotBlue" x1="14" y1="16" x2="50" y2="46">
        <stop offset="0%" stopColor="#DBEAFE" />
        <stop offset="50%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>

      <linearGradient id="blueMetal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#BFDBFE" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>

      <radialGradient id="bgGlow" cx="0" cy="0" r="1">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);
