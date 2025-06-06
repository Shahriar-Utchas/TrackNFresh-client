import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Shield, Users } from 'lucide-react';
const slides = [
    {
        title: "Smart Food Management",
        subtitle: "Never waste food again with intelligent tracking",
        description: "Track expiry dates, get timely reminders, and make the most of every ingredient in your kitchen.",
        cta: "Start Tracking",
        image: "img/slide1.jpeg"
    },
    {
        title: "Reduce Food Waste by 70%",
        subtitle: "AI-powered notifications for optimal freshness",
        description: "Get smart alerts before food expires and discover new recipes to use ingredients at their peak.",
        cta: "Get Started",
        image: "img/slide2.jpeg"
    },
    {
        title: "Organize Your Kitchen",
        subtitle: "Intuitive categorization for easy access",
        description: "Transform your kitchen into a well-organized space with intuitive categorization.",
        cta: "Join Now",
        image: "public/img/slide3.jpg"
    }
];

const features = [
    { icon: Shield, text: "100% Secure" },
    { icon: Zap, text: "Real-time Alerts" },
    { icon: Users, text: "1k+ Users" }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative min-h-[600px] bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
            {slides.map((slide, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === currentSlide
                        ? 'opacity-100 translate-x-0'
                        : idx < currentSlide
                            ? 'opacity-0 -translate-x-full'
                            : 'opacity-0 translate-x-full'
                        }`}
                >
                    <div className="flex flex-col lg:flex-row-reverse h-full w-full">
                        {/* Image  */}
                        <div className="w-full lg:w-1/2 h-64 sm:h-96 lg:h-full relative">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/60 to-transparent lg:bg-gradient-to-r lg:from-base-100 lg:via-emerald-900/20" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex items-center justify-center w-full lg:w-1/2 px-6 py-8 sm:px-10 lg:px-14 bg-base-100">
                            <div className="max-w-3xl text-center lg:text-left animate-fade-in">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-4">
                                    <Zap className="w-4 h-4 mr-2" /> Smart Kitchen Technology
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-emerald-600 mb-4 font-medium">{slide.subtitle}</p>
                                <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">{slide.description}</p>
                                <div className="flex justify-center lg:justify-start">
                                    <button className="group inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-semibold text-base md:text-lg shadow-lg hover:shadow-xl">
                                        {slide.cta}
                                        <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
                                    {features.map(({ icon: Icon, text }, i) => (
                                        <div key={i} className="flex items-center space-x-2 text-gray-600">
                                            <Icon className="w-5 h-5 text-emerald-600" />
                                            <span className="font-medium text-sm">{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white text-gray-700 hover:text-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white text-gray-700 hover:text-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-emerald-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
