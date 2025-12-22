import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { XCircle } from 'lucide-react';

const PaymentFailure = () => {
    const cardRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!cardRef.current) return;
            
            const card = cardRef.current;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale3d(1.02, 1.02, 1.02)
            `;
            
            // Parallax effect for shadow
            const shadowX = (rotateY / 2) - 10;
            const shadowY = (rotateX / 2) - 10;
            card.style.boxShadow = `
                ${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.1),
                ${-shadowX}px ${-shadowY}px 25px rgba(239, 68, 68, 0.05)
            `;
        };

        const handleMouseLeave = () => {
            if (!cardRef.current) return;
            
            cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            cardRef.current.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
            
            // Reset icon animation
            const icon = cardRef.current.querySelector('.animated-icon');
            if (icon) {
                icon.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    icon.style.animation = 'float 3s ease-in-out infinite';
                }, 500);
            }
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
        <div className="flex items-center  justify-center bg-gradient-to-tr from-red-50 to-pink-50 px-4 overflow-hidden">
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
                    25% { transform: translateY(-10px) rotate(-2deg) scale(1.05); }
                    50% { transform: translateY(-5px) rotate(0deg) scale(1.03); }
                    75% { transform: translateY(-8px) rotate(2deg) scale(1.05); }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0) rotate(0deg); }
                    25% { transform: translateX(-5px) rotate(-5deg); }
                    50% { transform: translateX(5px) rotate(5deg); }
                    75% { transform: translateX(-3px) rotate(-3deg); }
                }
                
                @keyframes pulseGlow {
                    0%, 100% { 
                        box-shadow: 0 0 20px rgba(239, 68, 68, 0.3),
                                   0 0 40px rgba(239, 68, 68, 0.2),
                                   0 0 60px rgba(239, 68, 68, 0.1);
                    }
                    50% { 
                        box-shadow: 0 0 30px rgba(239, 68, 68, 0.4),
                                   0 0 60px rgba(239, 68, 68, 0.3),
                                   0 0 90px rgba(239, 68, 68, 0.2);
                    }
                }
                
                .animated-icon {
                    animation: float 3s ease-in-out infinite;
                    filter: drop-shadow(0 5px 15px rgba(239, 68, 68, 0.3));
                }
                
                .pulse-glow {
                    animation: pulseGlow 2s ease-in-out infinite;
                }
            `}</style>
            
            <div 
                ref={cardRef}
                className="bg-white rounded-2xl my-[8vh] w-[80vw] p-8 text-center transform transition-all duration-300 ease-out relative overflow-hidden"
                style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
            >
                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent pulse-glow"></div>
                
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-200 rounded-full opacity-20 transform rotate-45"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-200 rounded-full opacity-20 transform -rotate-45"></div>
                
                {/* 3D Animated Icon */}
                <div className="relative z-10 mx-auto w-24 h-24 mb-6 transform transition-transform duration-500">
                    <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 blur-md transform scale-150"></div>
                    <XCircle className="w-full h-full text-red-600 animated-icon relative z-10" />
                </div>
                
                {/* Heading with 3D text effect */}
                <div className="relative z-10 mb-4">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-2 transform transition-all duration-300 hover:scale-105" 
                        style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                            transform: 'translateZ(20px)'
                        }}>
                        Payment Failed
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full mt-2"></div>
                </div>
                
                {/* Description */}
                <div className="relative z-10 space-y-3 mb-6">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed transform transition-all duration-300 hover:translateZ(10px)">
                        Unfortunately, your payment could not be processed. This might be due to a network issue or a problem with your payment method.
                    </p>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                        Please try again or use a different payment method. Your items are still saved in your cart.
                    </p>
                </div>

                {/* 3D Buttons */}
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-300">
                    <Link
                        to='/payment-choice'
                        className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold 
                                 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                                 active:scale-95 relative overflow-hidden group"
                        style={{
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <span className="relative z-10">Try Again</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    
                    <Link
                        to='/'
                        className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold 
                                 transform transition-all duration-300 hover:scale-105 hover:shadow-lg 
                                 active:scale-95 hover:bg-gray-50 relative overflow-hidden group"
                        style={{
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <span className="relative z-10">Back To Home</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                </div>

                {/* Footer */}
                <div className="relative z-10 mt-8 text-gray-400 text-xs md:text-sm transform transition-all duration-300">
                    If the issue persists, please contact{' '}
                    <a 
                        href="mailto:support@example.com" 
                        className="underline hover:text-red-500 transition-colors duration-300 font-medium"
                    >
                        support
                    </a>
                    .
                </div>
            </div>
        </div>
    )
}

export default PaymentFailure;