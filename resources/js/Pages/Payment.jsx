import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import {
    FaCreditCard,
    FaUser,
    FaEnvelope,
    FaCut,
    FaCalendarAlt,
    FaClock,
    FaMoneyBillWave,
    FaCheckCircle,
    FaUpload,
    FaImage,
    FaExclamationTriangle,
    FaSpinner,
    FaUserTie,
    FaReceipt,
    FaTimesCircle,
    FaInfoCircle
} from "react-icons/fa";

const Payment = ({ booking, isPay }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [proofFile, setProofFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [visibleSections, setVisibleSections] = useState({});
    const sectionRefs = useRef({});

    const { data, setData, post, processing, errors } = useForm({
        proof_image: null,
    });

    // Intersection Observer for animations
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

    // Timer functionality
    useEffect(() => {
        if (isOpen) {
            const timer = setInterval(() => {
                const remaining = calculateRemainingTime();
                setTimeRemaining(remaining);

                if (remaining <= 0) {
                    clearInterval(timer);
                    setIsOpen(false);
                    Swal.fire({
                        icon: "error",
                        title: "Waktu Habis",
                        text: "Waktu pembayaran telah berakhir.",
                        confirmButtonColor: "#8B4513",
                    });
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isOpen]);

    // Handle file change and preview image
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                Swal.fire({
                    icon: "error",
                    title: "File Tidak Valid",
                    text: "Harap upload file gambar saja.",
                    confirmButtonColor: "#8B4513",
                });
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire({
                    icon: "error",
                    title: "File Terlalu Besar",
                    text: "Ukuran file maksimal 5MB.",
                    confirmButtonColor: "#8B4513",
                });
                return;
            }

            setProofFile(file);
            setPreviewImage(URL.createObjectURL(file));
            setData("proof_image", file);
        }
    };

    // Submit form to upload proof image
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!proofFile) {
            Swal.fire({
                icon: "warning",
                title: "File Diperlukan",
                text: "Harap upload bukti pembayaran terlebih dahulu.",
                confirmButtonColor: "#8B4513",
            });
            return;
        }

        post(`/payment/submit/${booking.id}`, {
            onSuccess: (response) => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: response.message || "Bukti pembayaran berhasil diupload! Anda akan menerima informasi melalui email.",
                    confirmButtonColor: "#8B4513",
                }).then(() => {
                    window.location.href = "/";
                });
                setIsOpen(false);
            },
            onError: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: error.message || "Terjadi kesalahan saat upload bukti pembayaran.",
                    confirmButtonColor: "#8B4513",
                });
            },
        });
    };

    // Helper function to convert UTC time to local time (WIB)
    const getTime = (date) => {
        const now = new Date(date || Date.now());
        now.setUTCHours(now.getUTCHours() + 7);
        return now;
    };

    // Payment deadline is 2 hours after booking is created
    const bookingTime = getTime(booking.created_at);
    const deadline = new Date(bookingTime.getTime() + 2 * 60 * 60 * 1000);

    const calculateRemainingTime = () => {
        const now = getTime();
        return Math.max(0, deadline - now);
    };

    // Format time remaining
    const formatTimeRemaining = (ms) => {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return { hours, minutes, seconds };
    };

    // Handle payment button click
    const handlePaymentClick = () => {
        const remaining_time = calculateRemainingTime();

        if (remaining_time <= 0) {
            Swal.fire({
                icon: "error",
                title: "Waktu pembayaran telah habis",
                text: "Booking Anda tidak valid.",
                confirmButtonColor: "#8B4513",
            });
        } else {
            setTimeRemaining(remaining_time);
            setIsOpen(true);
        }
    };

    const { hours, minutes, seconds } = formatTimeRemaining(timeRemaining);

    return (
        <GuestLayout header={"Pembayaran"}>
            <Head title="Pembayaran - Selesaikan Transaksi Booking Anda" />

            {!isPay ? (
                <>
                    {/* Hero Section */}
                    <section className="relative py-20 overflow-hidden text-white bg-gradient-to-br from-gray-900 via-gray-800 to-brown lg:py-28">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute w-32 h-32 border border-white rounded-full top-20 left-10"></div>
                            <div className="absolute w-20 h-20 border border-white rounded-full top-40 right-20"></div>
                            <div className="absolute w-24 h-24 border border-white rounded-full bottom-20 left-1/3"></div>
                        </div>

                        <div className="container relative z-10 px-4 mx-auto text-center sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                                <span className="block mb-4 text-sm font-semibold tracking-wider uppercase text-brown">
                                    Pembayaran Booking
                                </span>
                                <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                                    Selesaikan <span className="text-brown">Pembayaran</span> Anda
                                </h1>
                                <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed text-gray-300 sm:text-xl lg:text-2xl">
                                    Tinjau detail booking Anda dan lanjutkan ke proses pembayaran untuk konfirmasi appointment.
                                </p>
                                <div className="flex items-center justify-center space-x-6 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <FaCheckCircle className="text-brown" />
                                        <span>Proses Aman</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaCheckCircle className="text-brown" />
                                        <span>Konfirmasi Cepat</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaCheckCircle className="text-brown" />
                                        <span>Dukungan 24/7</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Payment Details Section */}
                    <section
                        ref={setSectionRef("paymentDetails")}
                        className="relative py-16 -mt-12 lg:py-24 bg-gradient-to-br from-cream to-white"
                    >
                        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                                {/* Header */}
                                <div className={`text-center mb-12 transition-all duration-1000 ${
                                    visibleSections.paymentDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}>
                                    <span className="block mb-2 text-sm font-semibold tracking-wider uppercase text-brown">
                                        Detail Booking
                                    </span>
                                    <h2 className="mb-6 text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
                                        <span className="text-brown">Ringkasan</span> Pembayaran
                                    </h2>
                                    <div className="w-24 h-1 mx-auto mb-6 bg-brown"></div>
                                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                                        Pastikan semua detail booking Anda sudah benar sebelum melanjutkan pembayaran.
                                    </p>
                                </div>

                                {/* Booking Details Card */}
                                <div className={`bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-1000 delay-300 ${
                                    visibleSections.paymentDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}>
                                    {/* Card Header */}
                                    <div className="p-6 text-white bg-gradient-to-r from-brown to-brown-dark lg:p-8">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="mb-2 text-2xl font-bold">Booking #{booking.id}</h3>
                                                <p className="text-brown-100 opacity-90">Detail Data Anda</p>
                                            </div>
                                            <FaReceipt className="text-4xl text-brown-200" />
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 lg:p-8">
                                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                            {/* Personal Information */}
                                            <div>
                                                <h4 className="flex items-center mb-6 text-xl font-bold text-gray-800">
                                                    <FaUser className="mr-3 text-brown" />
                                                    Informasi customers
                                                </h4>
                                                <div className="space-y-4">
                                                    <div className="p-4 bg-gray-50 rounded-xl">
                                                        <div className="flex items-center mb-2">
                                                            <FaUser className="mr-2 text-sm text-brown" />
                                                            <span className="text-sm font-semibold text-gray-600">Nama Lengkap</span>
                                                        </div>
                                                        <p className="font-medium text-gray-800">{booking.customer_name}</p>
                                                    </div>
                                                    <div className="p-4 bg-gray-50 rounded-xl">
                                                        <div className="flex items-center mb-2">
                                                            <FaEnvelope className="mr-2 text-sm text-brown" />
                                                            <span className="text-sm font-semibold text-gray-600">Email</span>
                                                        </div>
                                                        <p className="font-medium text-gray-800">{booking.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Service Information */}
                                            <div>
                                                <h4 className="flex items-center mb-6 text-xl font-bold text-gray-800">
                                                    <FaCut className="mr-3 text-brown" />
                                                    Detail Layanan
                                                </h4>
                                                <div className="space-y-4">
                                                    <div className="p-4 bg-gray-50 rounded-xl">
                                                        <div className="flex items-center mb-2">
                                                            <FaCut className="mr-2 text-sm text-brown" />
                                                            <span className="text-sm font-semibold text-gray-600">Layanan</span>
                                                        </div>
                                                        <p className="font-medium text-gray-800">{booking.service.name}</p>
                                                    </div>
                                                    <div className="p-4 bg-gray-50 rounded-xl">
                                                        <div className="flex items-center mb-2">
                                                            <FaUserTie className="mr-2 text-sm text-brown" />
                                                            <span className="text-sm font-semibold text-gray-600">Cutter</span>
                                                        </div>
                                                        <p className="font-medium text-gray-800">{booking.cutter?.name || 'Belum dipilih'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Schedule Information */}
                                            <div>
                                                <h4 className="flex items-center mb-6 text-xl font-bold text-gray-800">
                                                    <FaCalendarAlt className="mr-3 text-brown" />
                                                    Jadwal Appointment
                                                </h4>
                                                <div className="space-y-4">
                                                    <div className="p-4 bg-gray-50 rounded-xl">
                                                        <div className="flex items-center mb-2">
                                                            <FaCalendarAlt className="mr-2 text-sm text-brown" />
                                                            <span className="text-sm font-semibold text-gray-600">Tanggal</span>
                                                        </div>
                                                        <p className="font-medium text-gray-800">
                                                            {new Date(booking.date).toLocaleDateString('id-ID', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="p-4 bg-gray-50 rounded-xl">
                                                        <div className="flex items-center mb-2">
                                                            <FaClock className="mr-2 text-sm text-brown" />
                                                            <span className="text-sm font-semibold text-gray-600">Waktu</span>
                                                        </div>
                                                        <p className="font-medium text-gray-800">{booking.schedule.time_range} WIB</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price Information */}
                                            <div>
                                                <h4 className="flex items-center mb-6 text-xl font-bold text-gray-800">
                                                    <FaMoneyBillWave className="mr-3 text-brown" />
                                                    Total Pembayaran
                                                </h4>
                                                <div className="p-6 text-white bg-gradient-to-r from-brown to-brown-dark rounded-xl">
                                                    <div className="text-center">
                                                        <p className="mb-2 text-sm text-brown-100">Total Harga</p>
                                                        <p className="text-3xl font-bold">
                                                            Rp {booking.service.price.toLocaleString("id-ID")}
                                                        </p>
                                                        <p className="mt-2 text-sm text-brown-100">Sudah termasuk semua biaya</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Button */}
                                        <div className="pt-8 mt-8 text-center border-t border-gray-200">
                                            <button
                                                onClick={handlePaymentClick}
                                                className="bg-brown hover:bg-brown-dark text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center mx-auto min-w-[250px]"
                                            >
                                                <FaCreditCard className="mr-3 text-lg" />
                                                Lanjutkan ke Pembayaran
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <section className="py-20 lg:py-28 bg-gradient-to-br from-green-50 to-white">
                    <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <div className="p-8 bg-white shadow-xl rounded-3xl lg:p-12">
                                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full">
                                    <FaCheckCircle className="text-3xl text-green-500" />
                                </div>
                                <h2 className="mb-4 text-3xl font-bold text-gray-800">
                                    Pembayaran Berhasil!
                                </h2>
                                <p className="mb-8 text-lg text-gray-600">
                                    Terima kasih! Pembayaran untuk booking Anda telah berhasil diproses.
                                    Kami akan mengirimkan konfirmasi melalui email.
                                </p>
                                <div className="p-4 border border-green-200 bg-green-50 rounded-xl">
                                    <p className="font-medium text-green-800">
                                        Status: <span className="text-green-600">Sudah Dibayar</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Enhanced Payment Modal */}
            <Modal show={isOpen} onClose={() => setIsOpen(false)} maxWidth="4xl">
                <div className="p-8 lg:p-12">
                    {/* Modal Header */}
                    <div className="mb-8 text-center">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-brown-100">
                            <FaCreditCard className="text-2xl text-brown" />
                        </div>
                        <h2 className="mb-2 text-3xl font-bold text-gray-800">
                            Selesaikan Pembayaran
                        </h2>
                        <p className="text-gray-600">
                            Upload bukti pembayaran untuk konfirmasi booking Anda
                        </p>
                    </div>

                    {/* Countdown Timer */}
                    <div className="p-6 mb-8 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <FaExclamationTriangle className="mr-2" />
                                <span className="font-semibold">Sisa Waktu Pembayaran</span>
                            </div>
                            <div className="grid max-w-xs grid-cols-3 gap-4 mx-auto">
                                <div className="p-3 bg-white rounded-lg bg-opacity-20">
                                    <div className="text-2xl font-bold">{hours.toString().padStart(2, '0')}</div>
                                    <div className="text-sm opacity-90">Jam</div>
                                </div>
                                <div className="p-3 bg-white rounded-lg bg-opacity-20">
                                    <div className="text-2xl font-bold">{minutes.toString().padStart(2, '0')}</div>
                                    <div className="text-sm opacity-90">Menit</div>
                                </div>
                                <div className="p-3 bg-white rounded-lg bg-opacity-20">
                                    <div className="text-2xl font-bold">{seconds.toString().padStart(2, '0')}</div>
                                    <div className="text-sm opacity-90">Detik</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="p-6 mb-8 border border-blue-200 bg-blue-50 rounded-xl">
                        <div className="flex items-start">
                            <FaInfoCircle className="flex-shrink-0 mt-1 mr-3 text-blue-500" />
                            <div>
                                <h4 className="mb-2 font-semibold text-blue-800">Informasi Pembayaran</h4>
                                <p className="mb-4 text-blue-700">
                                    Lakukan transfer ke rekening berikut dan upload bukti pembayaran:
                                </p>
                                <div className="p-4 space-y-2 bg-white rounded-lg">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">Bank:</span>
                                        <span className="font-bold text-gray-800">BRI</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">No. Rekening:</span>
                                        <span className="font-bold text-gray-800">683701028272533</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">Atas Nama:</span>
                                        <span className="font-bold text-gray-800">Apriyanto</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">Jumlah:</span>
                                        <span className="text-lg font-bold text-brown">
                                            Rp {booking.service.price.toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upload Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-4 text-sm font-semibold text-gray-700">
                                <FaUpload className="inline mr-2 text-brown" />
                                Upload Bukti Pembayaran
                            </label>

                            {/* File Upload Area */}
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                                    proofFile
                                        ? 'border-green-400 bg-green-50'
                                        : 'border-gray-300 bg-gray-50 hover:border-brown hover:bg-brown-50'
                                }`}>
                                    {proofFile ? (
                                        <div className="space-y-4">
                                            <FaCheckCircle className="mx-auto text-3xl text-green-500" />
                                            <p className="font-medium text-green-700">
                                                File berhasil dipilih: {proofFile.name}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <FaImage className="mx-auto text-3xl text-gray-400" />
                                            <div>
                                                <p className="mb-2 font-medium text-gray-600">
                                                    Klik untuk memilih gambar atau drag & drop
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Format: JPG, PNG, GIF (Maksimal 5MB)
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Image Preview */}
                            {previewImage && (
                                <div className="mt-6">
                                    <p className="flex items-center mb-3 text-sm font-semibold text-gray-700">
                                        <FaImage className="mr-2 text-brown" />
                                        Preview Bukti Pembayaran:
                                    </p>
                                    <div className="relative max-w-sm mx-auto">
                                        <img
                                            src={previewImage}
                                            alt="Preview Bukti Pembayaran"
                                            className="w-full border border-gray-200 shadow-lg rounded-xl"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setProofFile(null);
                                                setPreviewImage(null);
                                                setData("proof_image", null);
                                            }}
                                            className="absolute p-2 text-white transition-colors duration-200 bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                                        >
                                            <FaTimesCircle className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:gap-4 sm:pt-6">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="w-full px-4 py-3 text-sm font-semibold text-gray-800 transition-all duration-300 bg-gray-200 sm:flex-1 hover:bg-gray-300 sm:py-4 sm:px-6 rounded-xl sm:text-base"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing || !proofFile}
                                className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-all duration-300 transform sm:flex-1 bg-brown hover:bg-brown-dark sm:py-4 sm:px-6 rounded-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none sm:text-base"
                            >
                                {processing ? (
                                    <>
                                        <FaSpinner className="mr-2 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <FaUpload className="mr-2" />
                                        Submit Pembayaran
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </GuestLayout>
    );
};

export default Payment;
