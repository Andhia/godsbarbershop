import React, { useEffect, useRef, useState } from "react";
import { FaCut, FaPaintBrush, FaRegSmile, FaHeadset } from "react-icons/fa";
import ServiceCard from "./Card/ServiceCard";
import RedirectButton from "../RedirectButton";
import dataStore from "@/Store/data";

const LayananKami = ({ services }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

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

    return (
        <section
            ref={sectionRef}
            className="min-h-screen bg-gradient-to-br from-cream via-white to-cream py-16 lg:py-24"
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
                        Layanan Terbaik
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                        <span className="text-brown">Layanan</span> Kami
                    </h2>
                    <div className="w-24 h-1 bg-brown mx-auto mb-6"></div>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Kami menawarkan berbagai layanan premium untuk menjaga
                        penampilan dan kenyamanan Anda. Dari potong rambut
                        hingga perawatan jenggot, semuanya dikerjakan oleh tim yang berpengalaman.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`transition-all duration-1000 ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            <ServiceCard
                                image={service.image}
                                name={service.name}
                                description={service.description}
                                price={service.price}
                            />
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div
                    className={`text-center transition-all duration-1000 delay-700 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 max-w-4xl mx-auto">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                            Siap untuk Tampil{" "}
                            <span className="text-brown">Lebih Keren?</span>
                        </h3>
                        <p className="text-gray-600 mb-8 text-lg">
                            Booking sekarang dan rasakan
                            pengalaman di Gods Barbershop.
                        </p>
                        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                            <RedirectButton
                                href={route("booking.create")}
                                className="bg-brown hover:bg-brown-dark transform hover:scale-105 transition-all duration-300 px-8 py-4 text-white text-lg font-semibold"
                            >
                                BOOKING SEKARANG
                            </RedirectButton>
                            <RedirectButton
                                href={route("contact")}
                                className="bg-transparent border-2 border-brown text-brown hover:bg-brown hover:text-white transition-all duration-300 px-8 py-4 text-lg font-semibold"
                            >
                                HUBUNGI KAMI
                            </RedirectButton>
                        </div>
                    </div>
                </div>

                {/* Background Decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-20 h-20 bg-brown opacity-5 rounded-full"></div>
                    <div className="absolute top-40 right-20 w-32 h-32 bg-brown opacity-5 rounded-full"></div>
                    <div className="absolute bottom-20 left-20 w-16 h-16 bg-brown opacity-5 rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default LayananKami;
