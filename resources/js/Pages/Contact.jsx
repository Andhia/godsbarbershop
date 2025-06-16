import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaInstagram,
    FaWhatsapp,
    FaPaperPlane,
    FaUser,
    FaRegCommentDots,
} from "react-icons/fa";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [visibleSections, setVisibleSections] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        axios
            .post("/contact", formData)
            .then((response) => {
                console.log("Form submitted successfully!", response.data);
                Swal.fire({
                    icon: "success",
                    title: "Pesan Terkirim!",
                    text:
                        response.data.message || "Pesan Anda berhasil dikirim.",
                    confirmButtonColor: "#8B4513",
                });
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            })
            .catch((error) => {
                console.error("There was an error submitting the form!", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text:
                        error.response?.data?.message ||
                        "Terjadi kesalahan saat mengirim pesan.",
                    confirmButtonColor: "#8B4513",
                });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt className="text-2xl" />,
            title: "Alamat",
            content: "Jalan Masjid No.65A, Purwokerto, Indonesia",
            subContent: "Mudah dijangkau transportasi umum",
        },
        {
            icon: <FaPhone className="text-2xl" />,
            title: "Telepon",
            content: "+62 813 1811 5382",
            subContent: "Siap melayani Anda",
        },
        {
            icon: <FaEnvelope className="text-2xl" />,
            title: "Email",
            content: "barbershopku2025@gmail.com",
            subContent: "Respon dalam 24 jam",
        },
        {
            icon: <FaClock className="text-2xl" />,
            title: "Jam Operasional",
            content: "11:00 - 21:00 WIB",
            subContent: "Senin - Minggu",
        },
    ];

    return (
        <GuestLayout>
            <Head title="Hubungi Kami - Barbershop Premium dengan Layanan Terbaik" />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-brown text-white py-24 lg:py-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
                    <div className="absolute top-40 right-20 w-20 h-20 border border-white rounded-full"></div>
                    <div className="absolute bottom-20 left-1/3 w-24 h-24 border border-white rounded-full"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-brown text-sm font-semibold tracking-wider uppercase mb-4 block">
                            Hubungi Kami
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Mari <span className="text-brown">Terhubung</span>{" "}
                            dengan Kami
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-300">
                            Kami siap membantu Anda! Kirimkan pesan atau hubungi
                            kami untuk konsultasi gratis.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section
                ref={setSectionRef("contactInfo")}
                className="py-16 lg:py-24 bg-gradient-to-br from-cream to-white relative -mt-12"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className={`bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center ${
                                    visibleSections.contactInfo
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                                }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="text-brown mb-4 flex justify-center">
                                    {info.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    {info.title}
                                </h3>
                                <p className="text-gray-700 font-medium mb-1">
                                    {info.content}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {info.subContent}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section
                ref={setSectionRef("contactForm")}
                className="py-16 lg:py-24 bg-white"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div
                            className={`text-center mb-12 transition-all duration-1000 ${
                                visibleSections.contactForm
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}
                        >
                            <span className="text-brown text-sm font-semibold tracking-wider uppercase mb-2 block">
                                Kirim Pesan
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                                <span className="text-brown">Formulir</span>{" "}
                                Kontak
                            </h2>
                            <div className="w-24 h-1 bg-brown mx-auto mb-6"></div>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Isi formulir di bawah ini untuk kritik dan saran.
                            </p>
                        </div>

                        {/* Contact Form */}
                        <div
                            className={`bg-gradient-to-br from-cream to-white p-8 lg:p-12 rounded-3xl shadow-xl transition-all duration-1000 delay-300 ${
                                visibleSections.contactForm
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Name Field */}
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <FaUser className="inline mr-2 text-brown" />
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brown focus:border-brown transition-all duration-300 text-gray-700"
                                            placeholder="Masukkan nama lengkap Anda"
                                            required
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <FaEnvelope className="inline mr-2 text-brown" />
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brown focus:border-brown transition-all duration-300 text-gray-700"
                                            placeholder="Masukkan email Anda"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FaRegCommentDots className="inline mr-2 text-brown" />
                                        Pesan
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6"
                                        className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brown focus:border-brown transition-all duration-300 resize-none text-gray-700"
                                        placeholder="Tuliskan pesan atau pertanyaan Anda..."
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-brown hover:bg-brown-dark text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center mx-auto"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Mengirim...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane className="mr-2" />
                                                Kirim Pesan
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Media & Map Section */}
            <section
                ref={setSectionRef("mapSocial")}
                className="py-16 lg:py-24 bg-gray-50"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Social Media */}
                        <div
                            className={`transition-all duration-1000 ${
                                visibleSections.mapSocial
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-10"
                            }`}
                        >
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                                Ikuti{" "}
                                <span className="text-brown">Media Sosial</span>{" "}
                                Kami
                            </h3>
                            <p className="text-gray-600 mb-8 text-lg">
                                Dapatkan update terbaru tentang promo, tips
                                grooming, dan inspirasi gaya terkini.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    {
                                        icon: <FaInstagram />,
                                        name: "Instagram",
                                        color: "bg-pink-600 hover:bg-pink-700",
                                        url: "https://www.instagram.com/gods__barbershop?igsh=MWtlbXVrOTB4dWltNQ=="
                                    },
                                    {
                                        icon: <FaWhatsapp />,
                                        name: "WhatsApp",
                                        color: "bg-green-600 hover:bg-green-700",
                                        url: "https://wa.me/6281318115382",
                                    },
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"

                                        className={`${social.color} text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-3`}
                                    >
                                        <span className="text-xl">
                                            {social.icon}
                                        </span>
                                        <span className="font-medium hidden sm:block">
                                            {social.name}
                                        </span>
                                    </a>
                                ))}
                            </div>

                            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
                                <h4 className="font-bold text-gray-800 mb-2">
                                    Jam Operasional
                                </h4>
                                <div className="space-y-2 text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Open Daily</span>
                                        <span className="font-medium">
                                            11:00 - 21:00
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Jumat Only</span>
                                        <span className="font-medium">
                                            13:00 - 21:00
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div
                            className={`transition-all duration-1000 delay-300 ${
                                visibleSections.mapSocial
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-10"
                            }`}
                        >
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                                <span className="text-brown">Temukan</span>{" "}
                                Lokasi Kami
                            </h3>
                            <p className="text-gray-600 mb-6 text-lg">
                                Kunjungi barbershop kami yang mudah dijangkau di
                                pusat kota Purwokerto.
                            </p>

                           <div className="bg-white p-4 rounded-xl shadow-lg">
    <div className="w-full h-80 lg:h-96 rounded-lg overflow-hidden">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.4057221166545!2d109.22710857463925!3d-7.420270592590206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655f000f2c3f85%3A0xdeb5f5024fadcd0d!2sGods%20Barbershop!5e0!3m2!1sid!2sid!4v1749968678700!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
        ></iframe>
    </div>
</div>

                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
};

export default ContactPage;
