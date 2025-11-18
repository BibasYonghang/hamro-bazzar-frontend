import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ShieldCheck, CreditCard, ArrowLeft } from "lucide-react";

// 4D/3D tilt card animation hook (inspired by use3DTilt)
function use4DTilt(maxAngle = 27, stopAnimation = false) {
  const ref = useRef(null);

  function handleMove(e) {
    if (stopAnimation) return;
    const card = ref.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const cx = bounds.width / 2;
    const cy = bounds.height / 2;
    const rotY = ((x - cx) / cx) * maxAngle;
    const rotX = ((cy - y) / cy) * maxAngle;
    card.style.transform = `perspective(1400px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.08,1.08,1.08)`;
    card.style.boxShadow =
      `0 16px 46px 0 rgba(69,150,255,0.20), 0 6px 22px 0 rgba(162,88,249,0.14), 0 0 42px 6px #b5fff7bb` +
      (Math.abs(rotY) > 13 ? ", 0 0 72px 14px #6fd4c2" : "");
  }

  function handleLeave() {
    if (stopAnimation) return;
    const card = ref.current;
    if (!card) return;
    card.style.transform =
      "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.boxShadow =
      "0 8px 28px 0 rgba(59,130,246,0.18), 0 4px 18px 0 rgba(139,92,246,0.13)";
  }

  // Reset tilt if animation is stopped (when button is hovered/clicked/pressed)
  React.useEffect(() => {
    if (stopAnimation && ref.current) {
      ref.current.style.transform =
        "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      ref.current.style.boxShadow =
        "0 8px 28px 0 rgba(59,130,246,0.18), 0 4px 18px 0 rgba(139,92,246,0.13)";
    }
  }, [stopAnimation]);

  return { ref, handleMove, handleLeave };
}

const PAYMENTS = [
  {
    key: "esewa",
    label: "eSewa",
    bgGradient: "from-green-200 via-green-300 to-green-500",
    accent: "bg-green-500",
    img: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1763390605/esewa-removebg-preview_nsaprz.png",
    desc: "Pay seamlessly with your eSewa wallet.\nSecure, fast & widely trusted in Nepal.",
    button: {
      text: "Pay with eSewa",
      bg: "bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-300/70",
    },
    ring: "ring-emerald-400/30",
    glow: "shadow-[0_0_32px_8px_#00ffad88]",
  },
  {
    key: "khalti",
    label: "Khalti",
    bgGradient: "from-violet-200 via-purple-200 to-violet-500",
    accent: "bg-violet-600",
    img: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1763389595/636d065d9c7e80680e0a5f5bpng_aey0fz.png",
    desc: "Ace your checkout with Khalti wallet.\nLightning-fast & super reliable.",
    button: {
      text: "Pay with Khalti",
      bg: "bg-violet-600 hover:bg-violet-700 focus:ring-2 focus:ring-violet-400/80",
    },
    ring: "ring-violet-400/30",
    glow: "shadow-[0_0_32px_8px_#a586ff88]",
  },
];

export default function PaymentChoice() {
  const navigate = useNavigate();

  // Manage tilt lock for each payment card separately
  const [tiltLockedArr, setTiltLockedArr] = useState([false, false]);

  // Pass state to both tilt hooks
  const tilt1 = use4DTilt(27, tiltLockedArr[0]);
  const tilt2 = use4DTilt(27, tiltLockedArr[1]);

  // Utility functions
  const setTiltLock = (idx, val) => {
    setTiltLockedArr((old) => {
      if (old[idx] === val) return old;
      const arr = [...old];
      arr[idx] = val;
      return arr;
    });
  };

  // Payment choice + navigation
  const handlePayment = (method) => {
    setTimeout(() => navigate(`/payment/${method}`), 0);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-cyan-50 via-sky-100 to-gray-50 transition-colors dark:from-black dark:via-gray-900 dark:to-gray-950">
      {/* Animated Sparkle BG */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none">
        {/* Top Left Glow */}
        <div className="absolute top-[-16vh] left-[-11vw] h-[35vw] w-[35vw] rounded-full bg-gradient-to-tr from-cyan-300/40 via-blue-300/10 to-transparent blur-3xl" />
        {/* Bottom Right Glow */}
        <div className="absolute right-[-15vw] bottom-[-14vh] h-[28vw] w-[33vw] rounded-full bg-gradient-to-br from-violet-300/40 via-emerald-300/10 to-transparent blur-3xl" />
        {/* Random Sparks */}
        <Sparkles
          color="#77fdfadb"
          className="absolute top-24 left-24 h-8 w-8 animate-bounce"
        />
        <Sparkles
          color="#c494fd91"
          className="absolute right-16 bottom-36 h-7 w-7 animate-pulse"
        />
      </div>
      {/* Navigation Back */}
      <div className="mt-4 flex w-full max-w-7xl items-center px-2 sm:px-8">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-gray-900/80 via-cyan-900/80 to-violet-900/80 px-3 py-[7px] font-semibold text-cyan-100 shadow-sm ring-1 ring-cyan-400/20 transition hover:scale-[1.04] active:scale-[.98]"
        >
          <ArrowLeft size={21} className="text-cyan-400" />
          <span className="text-sm font-bold">Back</span>
        </button>
      </div>
      {/* Header */}
      <section className="mx-auto mt-4 mb-10 w-full max-w-3xl px-2 text-start sm:mt-2 sm:text-center">
        <h1 className="mb-3 bg-gradient-to-tr from-cyan-800 via-blue-900 to-violet-800 bg-clip-text text-2xl font-extrabold text-transparent drop-shadow-lg sm:text-3xl md:text-4xl">
          Select Payment Method
        </h1>
        <div className="flex max-w-2xl flex-col gap-2 sm:mx-auto sm:items-center md:flex-row md:justify-center">
          <div className="flex items-center gap-2">
            <CreditCard size={22} className="text-cyan-500 drop-shadow" />
            <span className="block text-lg font-semibold text-cyan-700 drop-shadow dark:text-cyan-200">
              100% Secure & Instant
            </span>
          </div>
          <span className="hidden text-gray-400 md:inline">|</span>
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-violet-500" />
            <span className="text-md font-medium text-violet-700 dark:text-violet-200">
              Payment protection Guaranteed
            </span>
          </div>
        </div>
        <p className="mx-auto mt-3 text-base text-gray-500 dark:text-gray-300">
          Pay with your favorite Nepali wallet. Just tap one card and finish in
          under a minute!
        </p>
      </section>
      {/* Payment Cards */}
      <main className="mx-auto w-full max-w-5xl px-2">
        <div className="grid grid-cols-1 gap-x-15 gap-y-7 sm:grid-cols-2">
          {PAYMENTS.map((p, i) => {
            const tilt = i === 0 ? tilt1 : tilt2;
            return (
              <div
                key={p.key}
                ref={tilt.ref}
                tabIndex={0}
                onMouseMove={tiltLockedArr[i] ? undefined : tilt.handleMove}
                onMouseLeave={(e) => {
                  // If button is pressed/hovering, keep locked -- otherwise unlock
                  setTiltLock(i, false);
                  tilt.handleLeave(e);
                }}
                onTouchStart={
                  tiltLockedArr[i]
                    ? undefined
                    : (e) => {
                        tilt.ref.current.style.transform =
                          "perspective(1400px) rotateX(5deg) scale3d(1.04,1.04,1.04)";
                        tilt.ref.current.style.boxShadow =
                          "0 8px 32px 5px #fffdbb99, 0 2px 33px 2px #a7ffea44";
                      }
                }
                onTouchEnd={(e) => {
                  setTiltLock(i, false);
                  tilt.handleLeave(e);
                }}
                className={
                  `relative flex flex-col items-center gap-1 rounded-[2.3rem] bg-gradient-to-br p-7 pb-6 ${p.bgGradient} shadow-xl ring-2 transition-all hover:shadow-2xl ${p.ring} ${p.glow} outline-none hover:scale-[1.038] focus:scale-[1.03] active:scale-[0.97] ` +
                  " " +
                  "payment-card"
                }
                onClick={() => {
                  // Card click: Only navigate to payment if NOT clicking button (i.e., click bubble-up avoided by button)
                  handlePayment(p.key);
                }}
                style={{
                  minHeight: "320px",
                  boxShadow:
                    "0 8px 44px 0 rgba(69,150,255,0.14), 0 4px 16px 0 rgba(105,95,255,0.12)",
                  transition:
                    "transform .22s cubic-bezier(.15,.98,.48,1.13), box-shadow .15s",
                  zIndex: 2 + i,
                }}
              >
                {/* Glow Border */}
                <div className="pointer-events-none absolute -inset-1.5 z-20 rounded-[2.8rem] bg-gradient-to-br from-white/40 via-cyan-300/10 to-transparent blur-[6px]" />
                {/* logo */}
                <img
                  src={p.img}
                  alt={p.label}
                  className={
                    `mb-5 h-20 w-auto drop-shadow-xl transition-transform duration-200 group-hover:scale-[1.10]` +
                    (p.key === "khalti" ? " brightness-[1.12]" : "")
                  }
                  draggable="false"
                />
                {/* Name */}
                <h2
                  className={
                    "mb-2 text-3xl font-black tracking-tight text-gray-900 drop-shadow-md dark:text-gray-100"
                  }
                  style={{ textShadow: "0 2px 18px #b9e2fa40" }}
                >
                  {p.label}
                </h2>
                {/* Info */}
                <p className="mb-5 text-base font-medium whitespace-pre-line text-gray-700 dark:text-gray-200/90">
                  {p.desc}
                </p>
                {/* Action */}
                <button
                  className={`relative z-10 mt-auto rounded-lg px-7 py-2.5 text-lg font-extrabold tracking-tight text-white uppercase shadow-lg ring-2 ring-white/10 outline-none hover:cursor-pointer focus:outline-none ${p.button.bg} drop-shadow-md transition-all`}
                  tabIndex={-1}
                  // Mouse: Lock tilt on mouse enter, unlock on mouse leave
                  onMouseEnter={() => setTiltLock(i, true)}
                  onMouseLeave={() => setTiltLock(i, false)}
                  // Touch: Lock on touch start, unlock on touch end/cancel
                  onTouchStart={() => setTiltLock(i, true)}
                  onTouchEnd={() => setTiltLock(i, false)}
                  // Stop event bubbling to card
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePayment(p.key);
                  }}
                >
                  <span className="absolute -top-3 -left-3 z-50 h-3 w-3 animate-pulse cursor-pointer rounded-full bg-white/30 opacity-80 blur-[2.5px]" />
                  {p.button.text}
                </button>
                {/* Animated Sparkles */}
                <Sparkles className="animate-spin-slow pointer-events-none absolute top-3 right-2 h-8 w-8 text-cyan-300/50" />
              </div>
            );
          })}
        </div>
      </main>
      {/* Info & Policy */}
      <footer className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-0.5 px-3 pb-8 text-center text-sm text-gray-400 dark:text-gray-400/80">
        <div className="mb-1.5 flex items-center justify-center gap-2 text-xs md:text-sm">
          <ShieldCheck size={18} className="text-cyan-500" />
          End-to-end encrypted • PCI validated Certified
        </div>
        <span>
          By choosing a payment, you agree to our{" "}
          <span className="cursor-pointer text-cyan-600 underline underline-offset-2 transition hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-white">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="cursor-pointer text-cyan-600 underline underline-offset-2 transition hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-white">
            Privacy Policy
          </span>
          .
        </span>
      </footer>
      {/* Responsive Animations */}
      <style>{`
        .payment-card:active, .payment-card:focus-visible {
          outline: 2px solid #03d8af;
        }
        @media (max-width: 600px) {
          .payment-card {
            min-height: 260px !important;
            padding: 1.6rem 0.9rem !important;
          }
        }
        /* Animation for Sparkles icon */
        .animate-spin-slow {
          animation: spin 3.6s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
