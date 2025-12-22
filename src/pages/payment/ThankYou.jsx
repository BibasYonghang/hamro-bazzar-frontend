import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { CheckCircle2 } from 'lucide-react';

const ThankYou = () => {
    const cardRef = useRef(null);
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const timeRef = useRef(0);

    // 5D Particle System (x, y, z, w, v)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle5D {
            constructor() {
                this.reset();
                // 5D coordinates: x, y, z, w, v
                this.z = Math.random() * 4 - 2;
                this.w = Math.random() * 3 - 1.5;
                this.v = Math.random() * 2 - 1; // 5th dimension - temporal/spatial distortion
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
                // 5D transformations
                this.x += this.vx + Math.sin(time * 0.001 + this.phase) * this.w;
                this.y += this.vy + Math.cos(time * 0.001 + this.phase) * this.v;
                this.z += Math.sin(time * 0.002 + this.phase) * 0.1;
                this.w += Math.cos(time * 0.003 + this.phase) * 0.05;
                this.v += Math.sin(time * 0.004 + this.phase) * 0.03;

                // 5D projection to 3D space
                const scale = 1 + (this.w + this.v) * 0.2;
                const timeWarp = Math.sin(time * 0.001 + this.phase * 2);
                
                this.displayX = this.x + this.z * 15 + timeWarp * 10;
                this.displayY = this.y + this.w * 12 + timeWarp * 8;
                this.displayRadius = this.radius * scale * (1 + timeWarp * 0.3);
                this.displayAlpha = this.alpha * (0.8 + Math.abs(timeWarp) * 0.4);

                // Boundary check with 5D warp
                if (this.displayX < -100 || this.displayX > canvas.width + 100 || 
                    this.displayY < -100 || this.displayY > canvas.height + 100) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.displayAlpha;
                ctx.fillStyle = this.color;
                
                // 5D glow effect
                const gradient = ctx.createRadialGradient(
                    this.displayX, this.displayY, 0,
                    this.displayX, this.displayY, this.displayRadius * 3
                );
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.displayX, this.displayY, this.displayRadius * 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Core particle
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.displayX, this.displayY, this.displayRadius, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }
        }

        // Create 5D particles
        particlesRef.current = Array.from({ length: 60 }, () => new Particle5D());

        let animationFrameId;

        const animate = (time) => {
            timeRef.current = time;
            ctx.fillStyle = 'rgba(240, 253, 244, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(particle => {
                particle.update(time);
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate(0);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 5D Card Animation with Temporal Effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!cardRef.current) return;
            
            const card = cardRef.current;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // 5D calculations with temporal component
            const time = timeRef.current * 0.001;
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;
            const translateZ = Math.abs(rotateX + rotateY) * 2;
            const skewX = Math.sin(time + x * 0.01) * 0.5;
            const skewY = Math.cos(time + y * 0.01) * 0.5;
            
            // 5D transformation matrix simulation
            card.style.transform = `
                perspective(1500px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                rotateZ(${skewX}deg)
                translateZ(${translateZ}px)
                scale3d(${1 + translateZ * 0.01}, ${1 + translateZ * 0.01}, 1)
                skew(${skewX}deg, ${skewY}deg)
            `;
            
            // 5D dynamic lighting and shadow
            const glowIntensity = (Math.abs(rotateX) + Math.abs(rotateY)) * 0.3;
            const timeGlow = Math.sin(time * 2) * 0.2 + 0.8;
            
            card.style.filter = `
                hue-rotate(${rotateY * 0.5}deg)
                brightness(${1 + glowIntensity * 0.1})
            `;
            
            card.style.boxShadow = `
                ${rotateY * 2}px ${rotateX * 2}px 60px rgba(34, 197, 94, ${0.3 * timeGlow}),
                ${-rotateY}px ${-rotateX}px 40px rgba(134, 239, 172, ${0.4 * timeGlow}),
                0 0 ${80 + glowIntensity * 40}px rgba(34, 197, 94, ${0.5 * timeGlow}),
                inset 0 0 ${50 + glowIntensity * 20}px rgba(255, 255, 255, 0.1)
            `;
        };

        const handleMouseLeave = () => {
            if (!cardRef.current) return;
            
            cardRef.current.style.transform = `
                perspective(1500px) 
                rotateX(0) 
                rotateY(0) 
                rotateZ(0)
                translateZ(0)
                scale3d(1, 1, 1)
                skew(0deg, 0deg)
            `;
            cardRef.current.style.filter = 'none';
            cardRef.current.style.boxShadow = `
                0 35px 70px rgba(34, 197, 94, 0.3),
                0 0 80px rgba(134, 239, 172, 0.2),
                0 0 120px rgba(187, 247, 208, 0.1)
            `;
        };

        const card = cardRef.current;
        if (card) {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (card) {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 px-4 overflow-hidden relative">
            {/* 5D Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
            
            {/* 5D Background Warp Elements */}
            <div className="absolute inset-0  overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-green-400 rounded-full opacity-15 animate-pulse filter blur-3xl transform-gpu"></div>
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-emerald-400 rounded-full opacity-10 animate-pulse filter blur-3xl transform-gpu"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-lime-400 rounded-full opacity-20 animate-pulse filter blur-3xl transform-gpu"></div>
                
                {/* 5D Warp Grid */}
                <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="absolute top-0 bottom-0 w-px bg-green-300 left-0" 
                             style={{ left: `${(i * 5)}%`, transform: `translateZ(${Math.sin(i * 0.5) * 10}px)` }} />
                    ))}
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="absolute left-0 right-0 h-px bg-green-300 top-0" 
                             style={{ top: `${(i * 5)}%`, transform: `translateZ(${Math.cos(i * 0.5) * 10}px)` }} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes float5D {
                    0%, 100% { 
                        transform: 
                            translate3d(0, 0, 0) 
                            rotateX(0deg) 
                            rotateY(0deg)
                            rotateZ(0deg)
                            scale3d(1, 1, 1);
                        filter: hue-rotate(0deg) brightness(1);
                    }
                    16.6% { 
                        transform: 
                            translate3d(-8px, -12px, 20px) 
                            rotateX(-2deg) 
                            rotateY(1deg)
                            rotateZ(-1deg)
                            scale3d(1.03, 1.03, 1.05);
                        filter: hue-rotate(30deg) brightness(1.05);
                    }
                    33.3% { 
                        transform: 
                            translate3d(0, -18px, 40px) 
                            rotateX(0deg) 
                            rotateY(0deg)
                            rotateZ(0deg)
                            scale3d(1.06, 1.06, 1.1);
                        filter: hue-rotate(60deg) brightness(1.1);
                    }
                    50% { 
                        transform: 
                            translate3d(8px, -12px, 20px) 
                            rotateX(2deg) 
                            rotateY(-1deg)
                            rotateZ(1deg)
                            scale3d(1.03, 1.03, 1.05);
                        filter: hue-rotate(90deg) brightness(1.05);
                    }
                    66.6% { 
                        transform: 
                            translate3d(0, -6px, 10px) 
                            rotateX(-1deg) 
                            rotateY(0deg)
                            rotateZ(-0.5deg)
                            scale3d(1.01, 1.01, 1.02);
                        filter: hue-rotate(120deg) brightness(1.02);
                    }
                    83.3% { 
                        transform: 
                            translate3d(-4px, -9px, 15px) 
                            rotateX(1deg) 
                            rotateY(0.5deg)
                            rotateZ(0.5deg)
                            scale3d(1.02, 1.02, 1.03);
                        filter: hue-rotate(150deg) brightness(1.03);
                    }
                }
                
                @keyframes pulse5D {
                    0%, 100% { 
                        box-shadow: 
                            0 0 40px rgba(34, 197, 94, 0.5),
                            0 0 80px rgba(134, 239, 172, 0.4),
                            0 0 120px rgba(187, 247, 208, 0.3),
                            inset 0 0 60px rgba(255, 255, 255, 0.2);
                        filter: hue-rotate(0deg);
                    }
                    50% { 
                        box-shadow: 
                            0 0 70px rgba(34, 197, 94, 0.8),
                            0 0 120px rgba(134, 239, 172, 0.6),
                            0 0 180px rgba(187, 247, 208, 0.4),
                            inset 0 0 90px rgba(255, 255, 255, 0.3);
                        filter: hue-rotate(180deg);
                    }
                }
                
                @keyframes orbit5D {
                    0% { 
                        transform: 
                            rotateX(0deg) rotateY(0deg) rotateZ(0deg)
                            translate3d(30px, 0, 0)
                            rotateX(0deg) rotateY(0deg) rotateZ(0deg)
                            scale3d(1, 1, 1);
                    }
                    100% { 
                        transform: 
                            rotateX(360deg) rotateY(360deg) rotateZ(360deg)
                            translate3d(30px, 0, 0)
                            rotateX(-360deg) rotateY(-360deg) rotateZ(-360deg)
                            scale3d(1.2, 1.2, 1.5);
                    }
                }
                
                @keyframes warpTunnel {
                    0% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
                    50% { transform: translate3d(0, 0, 100px) scale(1.1) rotate(180deg); }
                    100% { transform: translate3d(0, 0, 0) scale(1) rotate(360deg); }
                }
                
                .floating-5d {
                    animation: float5D 12s ease-in-out infinite;
                    transform-style: preserve-3d;
                }
                
                .pulse-5d {
                    animation: pulse5D 4s ease-in-out infinite;
                    transform-style: preserve-3d;
                }
                
                .orbit-5d {
                    animation: orbit5D 15s linear infinite;
                    transform-style: preserve-3d;
                }
                
                .warp-tunnel {
                    animation: warpTunnel 8s linear infinite;
                    transform-style: preserve-3d;
                }
            `}</style>
            
            <div 
                ref={cardRef}
                className="bg-white/95 backdrop-blur-lg rounded-3xl w-[60vw] p-10 text-center relative overflow-hidden transform-gpu transition-all duration-700 ease-out z-10 border border-green-200/30"
                style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 35px 70px rgba(34, 197, 94, 0.3), 0 0 80px rgba(134, 239, 172, 0.2), 0 0 120px rgba(187, 247, 208, 0.1)'
                }}
            >
                {/* 5D Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 opacity-30 pulse-5d"></div>
                <div className="absolute inset-1 rounded-2xl bg-white/98 backdrop-blur-md"></div>
                
                {/* 5D Orbiting Elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full orbit-5d opacity-70"></div>
                <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-r from-emerald-400 to-lime-500 rounded-full orbit-5d opacity-70" style={{animationDelay: '-5s'}}></div>
                <div className="absolute top-1/2 -right-8 w-8 h-8 bg-lime-400 rounded-full orbit-5d opacity-60" style={{animationDelay: '-10s'}}></div>

                {/* Main Content */}
                <div className="relative z-10" style={{transformStyle: 'preserve-3d'}}>
                    {/* 5D Animated Icon */}
                    <div className="relative mx-auto w-32 h-32 mb-10 floating-5d">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-25 blur-2xl transform-gpu scale-150 warp-tunnel"></div>
                        <CheckCircle2 className="w-full h-full text-green-500 relative z-10 floating-5d" style={{animationDelay: '1s'}} />
                        
                        {/* 5D Orbiting Rings */}
                        <div className="absolute inset-0 border-2 border-green-400/50 rounded-full floating-5d" style={{animationDelay: '2s', transform: 'scale(1.2)'}}></div>
                        <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-full floating-5d" style={{animationDelay: '3s', transform: 'scale(1.4)'}}></div>
                    </div>
                    
                    {/* 5D Text Effects */}
                    <div className="mb-8" style={{transformStyle: 'preserve-3d'}}>
                        <h2 
                            className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-700 to-lime-600 mb-6 floating-5d"
                            style={{animationDelay: '0.5s'}}
                        >
                            Thank You!
                        </h2>
                        
                        <div className="w-32 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 mx-auto rounded-full mb-8 floating-5d"
                             style={{animationDelay: '1.5s'}}>
                        </div>
                    </div>

                    {/* 5D Content Animation */}
                    <div className="space-y-6 mb-10" style={{transformStyle: 'preserve-3d'}}>
                        <p 
                            className="text-gray-800 text-xl leading-relaxed font-medium floating-5d"
                            style={{animationDelay: '2s'}}
                        >
                            Your order has been placed successfully. Thank you for choosing us!
                        </p>
                    </div>

                    {/* 5D Animated Button */}
                    <Link 
                        to='/' 
                        className="inline-block px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold rounded-2xl 
                                 transform-gpu transition-all duration-500 hover:scale-110 hover:rotate-3 floating-5d relative overflow-hidden group"
                        style={{animationDelay: '2.5s', transformStyle: 'preserve-3d'}}
                    >
                        <span className="relative z-10">Go To HomePage</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-100 transition-all duration-500 transform-gpu"></div>
                        <div className="absolute inset-0 bg-white/20 transform-gpu skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </Link>

                    {/* 5D Footer */}
                    <div className="mt-8 text-gray-500 text-sm floating-5d" style={{animationDelay: '3s'}}>
                        If you have any questions about your order, feel free to contact our{' '}
                        <a href="mailto:support@example.com" className="underline hover:text-green-600 transition-colors duration-300 font-semibold">
                            support team
                        </a>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;