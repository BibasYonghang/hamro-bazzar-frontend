import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const ThankYou = () => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);

  // 5D Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    class Particle5D {
      constructor() {
        this.reset();
        this.z = Math.random() * 4 - 2;
        this.w = Math.random() * 3 - 1.5;
        this.v = Math.random() * 2 - 1;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 4 + 1;
        this.alpha = Math.random() * 0.6 + 0.4;
        this.phase = Math.random() * Math.PI * 2;
        this.color = `hsl(${140 + Math.random() * 40}, 80%, 65%)`;
      }
      update(time) {
        this.x += this.vx + Math.sin(time * 0.001 + this.phase) * this.w;
        this.y += this.vy + Math.cos(time * 0.001 + this.phase) * this.v;
        this.z += Math.sin(time * 0.002 + this.phase) * 0.1;
        this.w += Math.cos(time * 0.003 + this.phase) * 0.05;
        this.v += Math.sin(time * 0.004 + this.phase) * 0.03;

        const scale = 1 + (this.w + this.v) * 0.2;
        const timeWarp = Math.sin(time * 0.001 + this.phase * 2);

        this.displayX = this.x + this.z * 15 + timeWarp * 10;
        this.displayY = this.y + this.w * 12 + timeWarp * 8;
        this.displayRadius = this.radius * scale * (1 + timeWarp * 0.3);
        this.displayAlpha = this.alpha * (0.8 + Math.abs(timeWarp) * 0.4);

        if (
          this.displayX < -100 ||
          this.displayX > canvas.width + 100 ||
          this.displayY < -100 ||
          this.displayY > canvas.height + 100
        ) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.displayAlpha;
        const gradient = ctx.createRadialGradient(
          this.displayX,
          this.displayY,
          0,
          this.displayX,
          this.displayY,
          this.displayRadius * 3
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          this.displayX,
          this.displayY,
          this.displayRadius * 3,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
          this.displayX,
          this.displayY,
          this.displayRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      }
    }

    particlesRef.current = Array.from({ length: 60 }, () => new Particle5D());

    let animationFrameId;
    const animate = (time) => {
      timeRef.current = time;
      ctx.fillStyle = "rgba(240, 253, 244, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.update(time);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate(0);

    window.addEventListener("resize", setCanvasSize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  // Card 5D Interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const time = timeRef.current * 0.001;

      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = ((centerY - y) / centerY) * 10;
      const translateZ = Math.abs(rotateX + rotateY) * 2;
      const skewX = Math.sin(time + x * 0.01) * 0.5;
      const skewY = Math.cos(time + y * 0.01) * 0.5;

      card.style.transform = `
        perspective(1500px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        rotateZ(${skewX}deg)
        translateZ(${translateZ}px)
        scale3d(${1 + translateZ * 0.01}, ${1 + translateZ * 0.01}, 1)
        skew(${skewX}deg, ${skewY}deg)
      `;

      const glowIntensity = (Math.abs(rotateX) + Math.abs(rotateY)) * 0.3;
      const timeGlow = Math.sin(time * 2) * 0.2 + 0.8;
      card.style.filter = `hue-rotate(${rotateY * 0.5}deg) brightness(${1 + glowIntensity * 0.1})`;
      card.style.boxShadow = `
        ${rotateY * 2}px ${rotateX * 2}px 60px rgba(34, 197, 94, ${0.3 * timeGlow}),
        ${-rotateY}px ${-rotateX}px 40px rgba(134, 239, 172, ${0.4 * timeGlow}),
        0 0 ${80 + glowIntensity * 40}px rgba(34, 197, 94, ${0.5 * timeGlow}),
        inset 0 0 ${50 + glowIntensity * 20}px rgba(255, 255, 255, 0.1)
      `;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      card.style.transform =
        "perspective(1500px) rotateX(0) rotateY(0) rotateZ(0) translateZ(0) scale3d(1,1,1) skew(0deg,0deg)";
      card.style.filter = "none";
      card.style.boxShadow =
        "0 35px 70px rgba(34, 197, 94, 0.3), 0 0 80px rgba(134, 239, 172, 0.2), 0 0 120px rgba(187, 247, 208, 0.1)";
    };

    const card = cardRef.current;
    card?.addEventListener("mousemove", handleMouseMove);
    card?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card?.removeEventListener("mousemove", handleMouseMove);
      card?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 px-4 overflow-hidden relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div
        ref={cardRef}
        className="bg-white/95 backdrop-blur-lg rounded-3xl w-full max-w-xl sm:p-8 p-6 text-center relative overflow-hidden transform-gpu transition-all duration-700 ease-out z-10 border border-green-200/30"
        style={{
          transformStyle: "preserve-3d",
          boxShadow:
            "0 35px 70px rgba(34, 197, 94, 0.3), 0 0 80px rgba(134, 239, 172, 0.2), 0 0 120px rgba(187, 247, 208, 0.1)",
        }}
      >
        <div className="relative z-10">
          <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-6 sm:mb-10 floating-5d">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-25 blur-2xl transform-gpu scale-150 warp-tunnel"></div>
            <CheckCircle2 className="w-full h-full text-green-500 relative z-10 floating-5d" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-700 to-lime-600 mb-4 sm:mb-6 floating-5d">
            Thank You!
          </h2>

          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 mx-auto rounded-full mb-6 sm:mb-8 floating-5d"></div>

          <p className="text-gray-800 text-base sm:text-xl leading-relaxed font-medium floating-5d mb-8">
            Your order has been placed successfully. Thank you for choosing us!
          </p>

          <Link
            to="/"
            className="inline-block px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-base sm:text-lg font-bold rounded-2xl transform-gpu transition-all duration-500 hover:scale-105 hover:rotate-1 floating-5d relative overflow-hidden group"
          >
            <span className="relative z-10">Go To HomePage</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-100 transition-all duration-500 transform-gpu"></div>
            <div className="absolute inset-0 bg-white/20 transform-gpu skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>

          <div className="mt-6 sm:mt-8 text-gray-500 text-sm floating-5d">
            If you have any questions, contact our{" "}
            <a
              href="mailto:support@example.com"
              className="underline hover:text-green-600 transition-colors duration-300 font-semibold"
            >
              support team
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
