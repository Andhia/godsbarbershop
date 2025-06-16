import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import {
    FaUsers,
    FaHeart,
    FaDollarSign,
} from "react-icons/fa";
import RedirectButton from "@/Components/RedirectButton";

const AboutPage = ({ cutters }) => {
    const [visibleSections, setVisibleSections] = useState({});
    const sectionRefs = useRef({});

    useEffect(() => {
        const observers = {};

        Object.keys(sectionRefs.current).forEach((key) => {
            if (sectionRefs.current[key]) {
                observers[key] = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setVisibleSections((prev) => ({
                                ...prev,
                                [key]: true,
                            }));
                        }
                    },
                    { threshold: 0.2 }
                );
                observers[key].observe(sectionRefs.current[key]);
            }
        });

        return () => {
            Object.values(observers).forEach((observer) =>
                observer.disconnect()
            );
        };
    }, []);

    const setSectionRef = (key) => (ref) => {
        sectionRefs.current[key] = ref;
    };

    const features = [
        {
            icon: <FaUsers className="mb-4 text-4xl text-brown" />,
            title: "Tim Profesional",
            description:
                "Kapster berpengalaman dengan keahlian terbaik dan sertifikasi untuk memberikan hasil sempurna.",
        },
        {
            icon: <FaHeart className="mb-4 text-4xl text-brown" />,
            title: "Pengalaman Berkesan",
            description:
                "Setiap kunjungan adalah momen spesial dengan atmosfer nyaman dan pelayanan yang personal.",
        },
        {
            icon: <FaDollarSign className="mb-4 text-4xl text-brown" />,
            title: "Harga Terjangkau",
            description:
                "Layanan premium dengan harga yang terbaik dan paket hemat untuk berbagai kebutuhan layanan.",
        },
    ];

    return (
        <GuestLayout>
            <Head title="Tentang Kami - Barbershop Terbaik dengan Layanan Profesional" />

            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden text-white bg-gradient-to-br from-gray-900 via-gray-800 to-brown lg:py-32">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute w-32 h-32 border border-white rounded-full top-20 left-10"></div>
                    <div className="absolute w-20 h-20 border border-white rounded-full top-40 right-20"></div>
                    <div className="absolute w-24 h-24 border border-white rounded-full bottom-20 left-1/3"></div>
                </div>

                <div className="container relative z-10 px-4 mx-auto text-center sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <span className="block mb-4 text-sm font-semibold tracking-wider uppercase text-brown">
                            Tentang Kami
                        </span>
                        <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            Gods Barbershop{" "}
                            <span className="text-brown">Terpercaya</span>
                        </h1>
                        <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed text-gray-300 sm:text-xl lg:text-2xl">
                            Tempat di mana keahlian bertemu dengan kenyamanan.
                            Nikmati pengalaman layanan terbaik dengan sentuhan
                            profesional yang membuat Anda tampil percaya diri.
                        </p>
                        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                            <RedirectButton
                                href={route("booking.create")}
                                className="px-8 py-4 text-lg font-semibold transition-all duration-300 transform bg-brown hover:bg-brown-dark hover:scale-105"
                            >
                                Booking Sekarang
                            </RedirectButton>
                            <RedirectButton
                                href={route("contact")}
                                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-transparent border-2 border-white hover:bg-white hover:text-brown"
                            >
                                Hubungi Kami
                            </RedirectButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section
                ref={setSectionRef("story")}
                className="py-16 lg:py-24 bg-gradient-to-br from-cream to-white"
            >
                <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="lg:flex lg:items-center lg:gap-16">
                        {/* Text Content */}
                        <div
                            className={`w-full lg:w-1/2 mb-12 lg:mb-0 transition-all duration-1000 ${
                                visibleSections.story
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-10"
                            }`}
                        >
                            <span className="block mb-2 text-sm font-semibold tracking-wider uppercase text-brown">
                                Cerita Kami
                            </span>
                            <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-800 sm:text-4xl lg:text-5xl">
                                Perjalanan Menuju{" "}
                                <span className="text-brown">Kesempurnaan</span>
                    </h2>
                            <div className="space-y-6 leading-relaxed text-gray-600">
                                <p className="text-lg">
                                    Dimulai dari sebuah mimpi sederhana, kami
                                    berkembang menjadi destinasi barbershop
                                    terpercaya di kota. Dengan komitmen untuk
                                    memberikan layanan terbaik, setiap potongan
                                    rambut adalah karya seni.
                                </p>
                                <p className="text-lg">
                                    Tim kami yang berpengalaman
                                    menggabungkan teknik tradisional dengan tren
                                    modern, menciptakan gaya yang unik untuk
                                    setiap customers. Kepuasan Anda adalah
                                    prioritas utama kami.
                                </p>
                                <div className="grid grid-cols-2 gap-6 mt-8">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-brown">
                                            1000+
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Pelanggan Puas
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-brown">
                                            6+
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Tahun Pengalaman
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Gallery */}
                        <div
                            className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${
                                visibleSections.story
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-10"
                            }`}
                        >
                            <div className="grid grid-cols-2 gap-4 lg:gap-6">
                                <div className="space-y-4">
                                    <div className="overflow-hidden transition-all duration-300 shadow-lg group rounded-2xl hover:shadow-xl">
                                        <img
                                            src="/images/slide1.jpg"
                                            alt="Barbershop Interior"
                                            className="object-cover w-full h-48 transition-transform duration-500 sm:h-56 lg:h-64 group-hover:scale-110"
                                        />
                        </div>
                                    <div className="overflow-hidden transition-all duration-300 shadow-lg group rounded-2xl hover:shadow-xl">
                                        <img
                                            src="/images/slide2.jpg"
                                            alt="Professional Service"
                                            className="object-cover w-full h-32 transition-transform duration-500 sm:h-40 lg:h-48 group-hover:scale-110"
                                        />
                                    </div>
                        </div>
                                <div className="mt-8">
                                    <div className="overflow-hidden transition-all duration-300 shadow-lg group rounded-2xl hover:shadow-xl">
                                        <img
                                            src="/images/slide3.jpg"
                                            alt="Expert Service"
                                            className="object-cover w-full h-64 transition-transform duration-500 sm:h-72 lg:h-80 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section
                ref={setSectionRef("team")}
                className="py-16 bg-white lg:py-24"
            >
                <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`text-center mb-16 transition-all duration-1000 ${
                            visibleSections.team
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        <span className="block mb-2 text-sm font-semibold tracking-wider uppercase text-brown">
                            Tim Profesional
                        </span>
                        <h2 className="mb-6 text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
                            <span className="text-brown">Kapster</span>{" "}
                            Kami
                    </h2>
                        <div className="w-24 h-1 mx-auto mb-6 bg-brown"></div>
                        <p className="max-w-3xl mx-auto text-lg text-gray-600">
                            Tim Kapster berpengalaman dengan keahlian tinggi dan
                            dedikasi untuk memberikan hasil terbaik bagi setiap
                            customers.
                        </p>
                    </div>

                    {/* Team Grid */}
                    {cutters && cutters.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {cutters.map((cutter, index) => (
                                <div
                                    key={cutter.id}
                                    className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 ${
                                        visibleSections.team
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-10"
                                    }`}
                                    style={{
                                        transitionDelay: `${index * 150}ms`,
                                    }}
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={`/storage/${cutter.image}`}
                                            alt={cutter.name}
                                            className="object-cover w-full h-64 transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 opacity-0 bg-brown bg-opacity-90 group-hover:opacity-100">
                                            <div className="p-6 text-center text-white transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                                                <h3 className="mb-2 text-xl font-bold">
                                                    {cutter.name}
                                                </h3>
                                                <p className="mb-3 text-sm opacity-90">
                                                    Barber Profesional
                                                </p>
                                                <div className="text-xs opacity-75">
                                                    <p>
                                                        Berpengalaman &
                                                        Terpercaya
                                                    </p>
                                                    <p>
                                                        Spesialis: Hair Cut &
                                                        Styling
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="mb-2 text-xl font-bold text-gray-800">
                                            {cutter.name}
                                        </h3>
                                        <p className="mb-2 text-sm font-semibold text-brown">
                                            Barber Profesional
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Berpengalaman & Terpercaya
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-lg text-gray-600">
                                Belum ada data barber tersedia.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section
                ref={setSectionRef("features")}
                className="py-16 lg:py-24 bg-gradient-to-br from-cream to-white"
            >
                <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        className={`text-center mb-16 transition-all duration-1000 ${
                            visibleSections.features
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        <span className="block mb-2 text-sm font-semibold tracking-wider uppercase text-brown">
                            Keunggulan Kami
                        </span>
                        <h2 className="mb-6 text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
                            Mengapa Memilih{" "}
                            <span className="text-brown">Kami?</span>
                        </h2>
                        <div className="w-24 h-1 mx-auto mb-6 bg-brown"></div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`text-center bg-white p-8 lg:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                                    visibleSections.features
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                                }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className="flex justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-gray-800 lg:text-2xl">
                                    {feature.title}
                                </h3>
                                <p className="leading-relaxed text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
};

export default AboutPage;
