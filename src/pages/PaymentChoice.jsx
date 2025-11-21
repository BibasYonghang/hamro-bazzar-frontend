import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ShieldCheck, CreditCard, ArrowLeft } from "lucide-react";
import { isAuthenticated } from "../auth";
import { APP_URL } from "../config";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

// -----------------------------
// Utilities: clamp & lerp
// -----------------------------
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

// -----------------------------
// Hook: per-card 4D tilt
// -----------------------------
function use4DTilt({
  maxAngle = 36,
  scale = 1.09,
  spring = 0.12,
  stop = false,
} = {}) {
  const ref = useRef(null);
  const state = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const raf = useRef(null);

  useEffect(() => {
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const apply = () => {
    const el = ref.current;
    if (!el) return;

    state.current.rx = lerp(state.current.rx, state.current.tx, spring);
    state.current.ry = lerp(state.current.ry, state.current.ty, spring);

    const rx = state.current.rx;
    const ry = state.current.ry;

    el.style.transform = `perspective(1500px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale},${scale},${scale})`;

    const glow = Math.min(1, (Math.abs(rx) + Math.abs(ry)) / (maxAngle * 1.2));
    el.style.boxShadow = `0 ${10 + glow * 40}px ${28 + glow * 60}px ${Math.round(
      6 + glow * 18,
    )}px rgba(80,120,255,${0.08 + glow * 0.18}), 0 6px 30px rgba(160,86,255,${0.06 + glow * 0.12})`;

    raf.current = requestAnimationFrame(apply);
  };

  const handlePointer = (e) => {
    if (stop) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const ry = (px - 0.5) * 2 * maxAngle;
    const rx = (0.5 - py) * 2 * maxAngle;

    state.current.tx = clamp(rx, -maxAngle, maxAngle);
    state.current.ty = clamp(ry, -maxAngle, maxAngle);

    if (!raf.current) raf.current = requestAnimationFrame(apply);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;

    const duration = 180; // ms
    const start = performance.now();
    const startRx = state.current.rx;
    const startRy = state.current.ry;

    const step = (time) => {
      const t = clamp((time - start) / duration, 0, 1);
      state.current.rx = lerp(startRx, 0, t);
      state.current.ry = lerp(startRy, 0, t);

      el.style.transform = `perspective(1500px) rotateX(${state.current.rx}deg) rotateY(${state.current.ry}deg) scale3d(${scale},${scale},${scale})`;

      const glow = Math.min(
        1,
        (Math.abs(state.current.rx) + Math.abs(state.current.ry)) /
          (maxAngle * 1.2),
      );
      el.style.boxShadow = `0 ${10 + glow * 40}px ${28 + glow * 60}px ${Math.round(
        6 + glow * 18,
      )}px rgba(80,120,255,${0.08 + glow * 0.18}), 0 6px 30px rgba(160,86,255,${0.06 + glow * 0.12})`;

      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (stop && ref.current) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
      ref.current.style.transform =
        "perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      ref.current.style.boxShadow =
        "0 10px 30px rgba(59,130,246,0.14), 0 4px 18px rgba(139,92,246,0.08)";
    }
  }, [stop]);

  return { ref, handlePointer, reset };
}

// -----------------------------
// Hook: scene / parallax tilt
// -----------------------------
function useSceneTilt({ intensity = 8, ease = 0.08 } = {}) {
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onMove = (e) => {
    target.current.x = (e.clientX / window.innerWidth - 0.5) * intensity;
    target.current.y = (e.clientY / window.innerHeight - 0.5) * intensity;
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  };

  const tick = () => {
    current.current.x = lerp(current.current.x, target.current.x, ease);
    current.current.y = lerp(current.current.y, target.current.y, ease);
    raf.current = null;
    if (
      Math.abs(current.current.x - target.current.x) > 0.001 ||
      Math.abs(current.current.y - target.current.y) > 0.001
    ) {
      raf.current = requestAnimationFrame(tick);
    }
  };

  const getRotation = () => ({
    x: current.current.y * -1,
    y: current.current.x,
  });

  return { onMove, getRotation };
}

// -----------------------------
// Payment Data
// -----------------------------
const PAYMENTS = [
  {
    key: "esewa",
    label: "eSewa",
    bgGradient: "from-green-200 via-green-300 to-green-500",
    img: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1763390605/esewa-removebg-preview_nsaprz.png",
    desc: "Pay seamlessly with your eSewa wallet.\nSecure, fast & widely trusted in Nepal.",
    button: {
      text: "Pay with eSewa",
      bg: "bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-300/70",
    },
    ring: "ring-emerald-400/30",
  },
  {
    key: "khalti",
    label: "Khalti",
    bgGradient: "from-violet-200 via-purple-200 to-violet-500",
    img: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1763389595/636d065d9c7e80680e0a5f5bpng_aey0fz.png",
    desc: "Ace your checkout with Khalti wallet.\nLightning-fast & super reliable.",
    button: {
      text: "Pay with Khalti",
      bg: "bg-violet-600 hover:bg-violet-700 focus:ring-2 focus:ring-violet-400/80",
    },
    ring: "ring-violet-400/30",
  },
];

// -----------------------------
// Component
// -----------------------------
export default function PaymentChoice3D() {
  const location = useLocation();
  const product = location.state?.product;
  const { token } = isAuthenticated();
  const navigate = useNavigate();

  const [locked, setLocked] = useState([false, false]);
  const [selectedMethod, setSelectedMethod] = useState(null); // NEW STATE

  const scene = useSceneTilt({ intensity: 12, ease: 0.09 });
  const tiltHooks = [
    use4DTilt({ maxAngle: 44, scale: 1.095 }),
    use4DTilt({ maxAngle: 44, scale: 1.095 }),
  ];
  const setLock = (i, v) =>
    setLocked((s) => s.map((x, idx) => (idx === i ? v : x)));

  const handlePayment = (method) => {
    window.navigator.vibrate?.(30);
    setSelectedMethod(method); // SELECT METHOD ON CLICK
  };

  const bgRef = useRef(null);
  useEffect(() => {
    const updateParallax = () => {
      const rot = scene.getRotation();
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${rot.y * -10}px, ${rot.x * -10}px, 0) rotate(${rot.y * 0.12}deg)`;
      }
    };
    let rafId = null;
    const loop = () => {
      updateParallax();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [scene]);

  const handleProceed = async (e) => {
    e.preventDefault();
    if (!selectedMethod) {
      toast.error("Please select a payment method first!");
      return;
    }

    if (!product) {
      toast.error("No product selected!");
      return;
    }

    const paymentData = {
      amount: product.price, // ✅ locked price
      productName: product.name,
      productId: product._id,
      phone: "9801234567",
      fullName: "Bibas Yonghang",
    };

    try {
      if (selectedMethod === "esewa") {
        const { data } = await axios.post(
          `${APP_URL}/api/generate-signature`,
          paymentData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const formData = {
          ...data,
          success_url: `${window.location.origin}/payment-success`,
          failure_url: `${window.location.origin}/payment-failure`,
          signed_field_names: "total_amount,transaction_uuid,product_code",
        };

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        Object.keys(formData).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        alert("Khalti integration coming soon!");
      }
    } catch (err) {
      console.error("Payment initiation failed:", err);
      toast.error("Something went wrong. Redirecting...");
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-900 to-violet-950 text-white"
      onMouseMove={scene.onMove}
      onTouchMove={(e) => scene.onMove(e.touches ? e.touches[0] : e)}
      style={{ WebkitFontSmoothing: "antialiased" }}
    >
      {/* Parallax BG */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 -z-10 transition-transform will-change-transform"
      >
        <div className="absolute -top-48 -left-56 h-[60vw] w-[60vw] rounded-full bg-gradient-to-tr from-cyan-400/30 via-emerald-300/10 to-transparent blur-3xl" />
        <div className="absolute -right-56 -bottom-48 h-[50vw] w-[50vw] rounded-full bg-gradient-to-br from-violet-400/30 via-fuchsia-300/10 to-transparent blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full opacity-10"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#00ffd6" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#a586ff" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g1)" />
        </svg>
      </div>

      {/* Nav */}
      <div className="mt-6 flex w-full max-w-7xl items-center px-4 sm:px-8">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 font-semibold text-white/90 shadow-sm ring-1 ring-white/5 backdrop-blur-md transition-transform hover:scale-[1.03]"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Back</span>
        </button>
      </div>

      {/* Header */}
      <header className="mx-auto mb-10 w-full max-w-3xl px-2 text-start sm:text-center">
        <h1 className="mb-3 animate-pulse bg-gradient-to-tr text-2xl font-extrabold text-sky-400 drop-shadow-lg sm:text-3xl md:text-4xl">
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
      </header>

      {/* Cards Grid */}
      <main className="mx-auto w-full max-w-6xl px-6 pb-12">
        <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
          {PAYMENTS.map((p, idx) => {
            const hook = tiltHooks[idx];
            const isSelected = selectedMethod === p.key;
            return (
              <div
                key={p.key}
                ref={hook.ref}
                onMouseMove={locked[idx] ? undefined : hook.handlePointer}
                onTouchStart={() => setLock(idx, true)}
                onTouchEnd={() => setLock(idx, false)}
                onMouseLeave={() => {
                  setLock(idx, false);
                  hook.reset();
                }}
                className={`relative isolate flex flex-col items-center gap-4 rounded-3xl p-8 pt-10 hover:cursor-progress ${p.bgGradient} transform-gpu bg-white/5 bg-clip-padding ring-1 ring-white/6 backdrop-blur-md transition-shadow duration-300 will-change-transform ${
                  isSelected ? "ring-4 ring-white/40" : ""
                }`}
                style={{ minHeight: 320, cursor: "pointer" }}
                onClick={() => handlePayment(p.key)}
              >
                {/* ... keep rest of the card UI same */}
                <div
                  className="pointer-events-none absolute -inset-1 rounded-3xl opacity-80 blur-[12px]"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(0,255,213,0.12), rgba(165,95,255,0.08) 40%, rgba(0,200,255,0.02) 80%)",
                  }}
                />
                <div
                  className="relative z-20 -mt-6 flex items-center justify-center rounded-full bg-white/6 shadow-inner"
                  style={{ height: 130, width: 130 }}
                >
                  <img src={p.img} alt={p.label} draggable={false} />
                </div>
                <h3 className="z-20 text-3xl font-extrabold tracking-tight text-white drop-shadow">
                  {p.label}
                </h3>
                <p className="z-20 max-w-xs text-center whitespace-pre-line text-white/70">
                  {p.desc}
                </p>
                <div className="z-30 mt-auto flex w-full justify-center">
                  <button
                    onMouseEnter={() => setLock(idx, true)}
                    onMouseLeave={() => setLock(idx, false)}
                    onClick={() => setSelectedMethod(p.key)}
                    className={`relative inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase shadow-2xl hover:cursor-pointer ${p.button.bg} transform-gpu focus:outline-none active:scale-95`}
                  >
                    <span className="absolute -top-3 -left-3 h-3 w-3 animate-pulse rounded-full bg-white/30 blur-sm" />
                    {p.button.text}
                  </button>
                </div>
                <Sparkles className="pointer-events-none absolute top-4 right-4 h-8 w-8 animate-[spin_4.8s_linear_infinite] text-cyan-200/60 opacity-90" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-3xl opacity-20 mix-blend-overlay"
                >
                  <svg className="h-full w-full" preserveAspectRatio="none">
                    <defs>
                      <pattern
                        id={`p-${p.key}`}
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M20 0 L0 0 0 20"
                          stroke="rgba(255,255,255,0.03)"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill={`url(#p-${p.key})`}
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
        {/* Proceed button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleProceed}
            className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition hover:cursor-pointer hover:bg-blue-700"
          >
            Proceed
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-3xl px-6 pb-10 text-center text-sm text-white/60">
        <div className="mx-auto mb-2 flex items-center justify-center gap-2 text-xs">
          <ShieldCheck size={16} />
          End-to-end encrypted • PCI validated
        </div>
        By choosing a payment you agree to our{" "}
        <span className="underline">Terms</span> &{" "}
        <span className="underline">Privacy</span>.
      </footer>

      {/* Inline CSS */}
      <style>{`
        .animate-[spin_4.8s_linear_infinite] { animation: spin 4.8s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
        .payment-card, .isolate { will-change: transform; backface-visibility: hidden; }
        @media (max-width: 640px) { .isolate { padding: 1.25rem !important; } }
      `}</style>
    </div>
  );
}
