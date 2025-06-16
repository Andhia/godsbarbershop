// components/OurBarbers.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const OurBarbers = ({ cutters }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const goToNextSlide = () => {
        if (sliderRef.current) {
            const cardWidth = sliderRef.current.children[0]?.offsetWidth || 0;
            const gap = 24; // gap-6 = 24px
            sliderRef.current.scrollLeft += cardWidth + gap;
        }
    };

    const goToPreviousSlide = () => {
        if (sliderRef.current) {
            const cardWidth = sliderRef.current.children[0]?.offsetWidth || 0;
            const gap = 24;
            sliderRef.current.scrollLeft -= cardWidth + gap;
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-16 lg:py-24 bg-gradient-to-br from-white to-cream relative overflow-hidden"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}
                >
                    <span className="text-brown text-sm font-semibold tracking-wider uppercase mb-2 block">
                        Tim Profesional
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                        <span className="text-brown">Kapster</span> Kami
                    </h2>
                    <div className="w-24 h-1 bg-brown mx-auto mb-6"></div>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Temui para kapster kami yang berpengalaman dan
                        berdedikasi untuk memberikan layanan terbaik dengan
                        teknik modern dan sentuhan personal.
                    </p>
                </div>

                {/* Barbers Slider */}
                <div className="relative">
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth pb-4"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        {cutters.map((barber, index) => (
                            <div
                                key={index}
                                className={`min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] flex-shrink-0 transition-all duration-1000 ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                                }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={`/storage/${barber.image}`}
                                            alt={barber.name}
                                            className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-brown bg-opacity-90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                            <div className="text-center text-white p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <h3 className="text-2xl font-bold mb-3">
                                                    {barber.name}
                                                </h3>
                                                <p className="text-sm opacity-90 mb-4">
                                                    Kapster Profesional
                                                </p>
                                                <div className="flex justify-center space-x-2">
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {barber.name}
                                        </h3>
                                        <p className="text-brown font-semibold text-sm">
                                            Kapster Profesional
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 w-32 h-32 bg-brown opacity-5 rounded-full"></div>
                <div className="absolute bottom-20 left-10 w-24 h-24 bg-brown opacity-5 rounded-full"></div>
            </div>
        </section>
    );
};

export default OurBarbers;
