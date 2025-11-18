import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import axios from 'axios';
import { APP_URL } from '../config';
import { CheckCircle2 } from 'lucide-react';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const particlesRef = useRef([]);
    const canvasRef = useRef(null);
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
    const { user, token } = isAuthenticated() || {};

    const order = {
        orderItems: cartItems,
        shippingAddress1: shippingInfo?.shippingAddress1 || '',
        shippingAddress2: shippingInfo?.shippingAddress2 || '',
        city: shippingInfo?.city || '',
        country: shippingInfo?.country || '',
        zip: shippingInfo?.zip || '',
        phone: shippingInfo?.phone || '',
        user: user?._id || null
    };

    // Particle system for 4D effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
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

                if (this.displayX < -50 || this.displayX > canvas.width + 50 || 
                    this.displayY < -50 || this.displayY > canvas.height + 50) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.displayX, this.displayY, this.displayRadius, 0, Math.PI * 2);
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
            ctx.fillStyle = 'rgba(240, 253, 244, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(particle => {
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

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
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

    useEffect(() => {
        const processPayment = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const encodedData = params.get('data');

                if (!encodedData) {
                    navigate('/payment-failure');
                    return;
                }

                const decodedData = atob(encodedData);
                const paymentData = JSON.parse(decodedData);

                if (paymentData.status === 'COMPLETE') {
                    if (token) {
                        const config = {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            }
                        };
                        await axios.post(`${APP_URL}/postorder`, order, config);
                    }

                    localStorage.removeItem('cartItems');
                    localStorage.removeItem('shippingInfo');

                    setTimeout(() => {
                        navigate('/thank-you');
                    }, 2000);
                } else {
                    navigate('/payment-failure');
                }
            } catch (err) {
                console.error('Payment processing error:', err);
                navigate('/payment-failure');
            }
        };

        processPayment();
    }, [navigate, token, order]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4 overflow-hidden relative">
            {/* 4D Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-300 rounded-full opacity-20 animate-pulse filter blur-xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-emerald-300 rounded-full opacity-15 animate-pulse filter blur-xl"></div>
                <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-teal-300 rounded-full opacity-25 animate-pulse filter blur-xl"></div>
            </div>

            <style jsx>{`
                @keyframes float4D {
                    0%, 100% { 
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
                    0%, 100% { 
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
                        transform: 
                            rotate(0deg) 
                            translateX(20px) 
                            rotate(0deg)
                            scale(1);
                    }
                    100% { 
                        transform: 
                            rotate(360deg) 
                            translateX(20px) 
                            rotate(-360deg)
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
                className="bg-white/90 backdrop-blur-sm rounded-3xl max-w-md w-full p-8 text-center relative overflow-hidden transform transition-all duration-500 ease-out z-10"
                style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 25px 50px rgba(34, 197, 94, 0.25), 0 0 60px rgba(134, 239, 172, 0.15)'
                }}
            >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 pulse-4d"></div>
                <div className="absolute inset-1 rounded-2xl bg-white/95 backdrop-blur-sm"></div>
                
                {/* Orbiting Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full orbiting-icon opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-400 rounded-full orbiting-icon opacity-60" style={{animationDelay: '-4s'}}></div>

                {/* Main Content */}
                <div className="relative z-10" style={{transformStyle: 'preserve-3d'}}>
                    {/* 4D Animated Icon */}
                    <div className="relative mx-auto w-28 h-28 mb-8 floating-4d">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 blur-xl transform scale-150"></div>
                        <CheckCircle2 className="w-full h-full text-green-500 relative z-10 floating-4d" />
                        
                        {/* Orbiting mini icons */}
                        <div className="absolute top-0 left-1/2 w-6 h-6 bg-green-400 rounded-full orbiting-icon opacity-70"></div>
                        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-emerald-400 rounded-full orbiting-icon opacity-70" style={{animationDelay: '-2s'}}></div>
                    </div>
                    
                    {/* 4D Text Effects */}
                    <div className="mb-6" style={{transformStyle: 'preserve-3d'}}>
                        <h1 
                            className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700 mb-4 floating-4d"
                            style={{animationDelay: '0.5s'}}
                        >
                            Payment Successful!
                        </h1>
                        
                        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full mb-6 floating-4d"
                             style={{animationDelay: '1s'}}>
                        </div>
                    </div>

                    {/* Animated Content */}
                    <div className="space-y-4 mb-8" style={{transformStyle: 'preserve-3d'}}>
                        <p 
                            className="text-gray-700 text-lg leading-relaxed floating-4d"
                            style={{animationDelay: '1.5s'}}
                        >
                            Thank you for your purchase! Your order has been successfully processed.
                        </p>
                        <p 
                            className="text-gray-500 text-sm floating-4d"
                            style={{animationDelay: '2s'}}
                        >
                            You will be redirected to the Thank You page shortly.
                        </p>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-2000 ease-linear"
                            style={{
                                width: '100%',
                                animation: 'pulse4D 2s ease-in-out infinite'
                            }}
                        ></div>
                    </div>

                    {/* Floating Celebration Text */}
                    <div className="text-xs text-gray-400 floating-4d" style={{animationDelay: '2.5s'}}>
                        🎉 Celebrating your successful transaction! 🎉
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;