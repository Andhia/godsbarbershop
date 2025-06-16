import React, { useEffect, useRef, useState } from "react";
import RedirectButton from "../RedirectButton";

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen bg-gradient-to-br from-cream to-white py-16 lg:py-24"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:gap-16">
                    {/* Text Content */}
                    <article
                        className={`w-full lg:w-1/2 mb-12 lg:mb-0 transition-all duration-1000 ${
                            isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                        }`}
                    >
                        <div className="text-center lg:text-left">
                            <div className="inline-block">
                                <span className="text-brown text-sm font-semibold tracking-wider uppercase mb-2 block">
                                    Tentang Kami
                                </span>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
                                    <span className="text-brown">
                                        Gods
                                    </span>{" "}
                                    Barbershop
                                </h1>
                            </div>

                            <div className="mb-8 flex justify-center lg:justify-start">
                                <div className="relative">
                                    <img
                                        src="/images/logo.jpg"
                                        alt="Barbershop Logo"
                                        className="w-24 h-24 sm:w-32 sm:h-32 object-contain hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-brown rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
                                Nikmati pengalaman potong rambut dan perawatan
                                terbaik dengan kapster kami yang
                                berpengalaman. Kami
                                memfokuskan pada layanan yang terbaik dan kenyamanan untuk memberikan hasil yang sempurna.
                            </p>

                            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center lg:justify-start">
                                <RedirectButton
                                    href={route("about")}
                                    className="bg-brown hover:bg-brown-dark transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg text-white font-semibold"
                                >
                                    Tentang Kami
                                </RedirectButton>
                                <RedirectButton
                                    href={route("booking.create")}
                                    className="bg-transparent border-2 border-brown text-brown hover:bg-brown hover:text-white transition-all duration-300 px-8 py-4 text-lg font-semibold"
                                >
                                    Booking Sekarang
                                </RedirectButton>
                            </div>
                        </div>
                    </article>

                    {/* Image Gallery */}
                    <article
                        className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${
                            isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-10"
                        }`}
                    >
                        <div className="grid grid-cols-2 gap-4 lg:gap-6">
                            <div className="space-y-4">
                                <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <img
                                        src="/images/slide1.jpg"
                                        alt="Barbershop Interior"
                                        className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <img
                                        src="/images/slide2.jpg"
                                        alt="Professional Service"
                                        className="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <img
                                        src="/images/slide3.jpg"
                                        alt="Expert Barbers"
                                        className="w-full h-64 sm:h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>

                    </article>
                </div>
            </div>
        </section>
    );
};

export default About;
