// components/Footer.jsx
import React from "react";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-brown text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
                <div className="absolute top-20 right-20 w-20 h-20 border border-white rounded-full"></div>
                <div className="absolute bottom-10 left-1/3 w-24 h-24 border border-white rounded-full"></div>
            </div>

            <div className="relative z-10 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Company Info */}
                        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                            <div className="mb-6">
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 relative">
                                    Gods Barbershop
                                    <div className="absolute -bottom-2 left-0 w-16 h-1 bg-brown"></div>
                                </h2>
                                <p className="text-gray-300 leading-relaxed">
                                    Kami menyediakan layanan potong rambut terbaik untuk Anda, dengan
                                    pengalaman dan pelayanan yang memuaskan.
                                </p>
                            </div>

                            {/* Social Media */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4">
                                    Ikuti Kami
                                </h4>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://www.instagram.com/gods__barbershop?igsh=MWtlbXVrOTB4dWltNQ=="
                                        className="w-10 h-10 bg-gray-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    >
                                        <FaInstagram className="text-lg" />
                                    </a>
                                    
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-semibold mb-6 relative">
                                Quick Links
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-brown"></div>
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="/"
                                        className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/service"
                                        className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                                    >
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/about"
                                        className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/contact"
                                        className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                                    >
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/booking/create"
                                        className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                                    >
                                        Booking
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-xl font-semibold mb-6 relative">
                                Layanan Kami
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-brown"></div>
                            </h3>
                            <ul className="space-y-3">
                                <li className="text-gray-300">
                                    • Hair Cut Premium
                                </li>
                                <li className="text-gray-300">
                                    • Shaving
                                </li>
                                <li className="text-gray-300">• Hair Blecing</li>
                                <li className="text-gray-300">
                                    • Hair Coloring
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-xl font-semibold mb-6 relative">
                                Hubungi Kami
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-brown"></div>
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-center text-gray-300">
                                    <FaEnvelope className="mr-3 text-brown flex-shrink-0" />
                                    <span>barbershopku2025@gmail.com</span>
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <FaPhone className="mr-3 text-brown flex-shrink-0" />
                                    <span>+62 813 1811 5382</span>
                                </li>
                                <li className="flex items-start text-gray-300">
                                    <FaMapMarkerAlt className="mr-3 text-brown flex-shrink-0 mt-1" />
                                    <span>
                                        Jl. Masjid No. 65A, Purwokerto, Jawa Tengah
                                        Indonesia
                                    </span>
                                </li>
                            </ul>

                            {/* Business Hours */}
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold mb-3 text-brown">
                                    Jam Operasional
                                </h4>
                                <div className="text-gray-300 text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span>Open Daily:</span>
                                        <span>11:00 - 21:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Jumat:</span>
                                        <span>13:00 - 21:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-12 pt-8 border-t border-gray-700">
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <p className="text-sm text-gray-400 mb-4 sm:mb-0">
                                &copy; {new Date().getFullYear()} Gods Barbershop.
                                All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
