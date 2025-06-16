import { useState, useEffect, useRef } from "react";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import Swal from "sweetalert2";
import {
    FaUser,
    FaEnvelope,
    FaCalendarAlt,
    FaClock,
    FaCut,
    FaUserTie,
    FaCheckCircle,
    FaTimes,
    FaInfoCircle,
    FaCalendarCheck,
} from "react-icons/fa";

export default function CreateBooking({
    services,
    schedules,
    cutters,
    bookings,
}) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: "",
        email: "",
        service_id: "",
        schedule_id: "",
        cutter_id: "",
        date: "",
    });

    const [scheduleAvailability, setScheduleAvailability] = useState([]);
    const [visibleSections, setVisibleSections] = useState({});
    const [selectedService, setSelectedService] = useState(null);
    const [selectedCutter, setSelectedCutter] = useState(null);
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

    // Update jadwal otomatis ketika tanggal dipilih
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setData("date", selectedDate);

        // Filter booking berdasarkan tanggal yang dipilih
        const filteredBookings = bookings.filter((booking) => {
            return booking.date === selectedDate;
        });

        // Update jadwal dengan status tersedia/tidak
        const updatedSchedules = schedules.map((schedule) => ({
            id: schedule.id,
            time_range: schedule.time_range,
            is_available: !filteredBookings.some(
                (booking) => booking.schedule_id === schedule.id
            ),
        }));

        setScheduleAvailability(updatedSchedules);
    };

    const handleServiceChange = (serviceId) => {
        setData("service_id", serviceId);
        const service = services.find((s) => s.id == serviceId);
        setSelectedService(service);
    };

    const handleCutterChange = (cutterId) => {
        setData("cutter_id", cutterId);
        const cutter = cutters.find((c) => c.id == cutterId);
        setSelectedCutter(cutter);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        post(route("booking.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Booking Berhasil!",
                    text: "Silakan cek email Anda untuk detail lebih lanjut.",
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#8B4513",
                }).then(() => {
                    window.location.reload();
                });
            },
            onError: (errors) => {
                Swal.fire({
                    title: "Terjadi Kesalahan!",
                    text: "Silakan periksa input Anda atau coba lagi nanti.",
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#8B4513",
                });
            },
        });
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <GuestLayout>
            <Head title="Booking Layanan - Reservasi Online Barbershop Premium" />

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
                            Reservasi Online
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Booking <span className="text-brown">Layanan</span>{" "}
                            Kami
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-300">
                            Jadwalkan waktu Anda dengan mudah dan dapatkan
                            pengalaman layanan terbaik dari para ahli kami.
                        </p>
                        <div className="flex items-center justify-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2">
                                <FaCheckCircle className="text-brown" />
                                <span>Booking Mudah</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCheckCircle className="text-brown" />
                                <span>Konfirmasi Instan</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCheckCircle className="text-brown" />
                                <span>Layanan Premium</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section
                ref={setSectionRef("bookingForm")}
                className="py-16 lg:py-24 bg-gradient-to-br from-cream to-white relative -mt-12"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div
                            className={`text-center mb-12 transition-all duration-1000 ${
                                visibleSections.bookingForm
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}
                        >
                            <span className="text-brown text-sm font-semibold tracking-wider uppercase mb-2 block">
                                Formulir Booking
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                                Lengkapi{" "}
                                <span className="text-brown">Detail</span>{" "}
                                Booking
                            </h2>
                            <div className="w-24 h-1 bg-brown mx-auto mb-6"></div>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Isi form di bawah ini dengan lengkap untuk
                                melakukan reservasi layanan barbershop kami.
                            </p>
                        </div>

                        {/* Booking Form */}
                        <div
                            className={`bg-white p-8 lg:p-12 rounded-3xl shadow-xl transition-all duration-1000 delay-300 ${
                                visibleSections.bookingForm
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Personal Information */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Customer Name */}
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <FaUser className="inline mr-2 text-brown" />
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            name="customer_name"
                                            value={data.customer_name}
                                            onChange={(e) =>
                                                setData(
                                                    "customer_name",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown focus:border-brown transition-all duration-300"
                                            placeholder="Masukkan nama lengkap Anda"
                                            required
                                        />
                                        {errors.customer_name && (
                                            <div className="text-red-600 text-sm mt-2 flex items-center">
                                                <FaTimes className="mr-1" />
                                                {errors.customer_name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <FaEnvelope className="inline mr-2 text-brown" />
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown focus:border-brown transition-all duration-300"
                                            placeholder="Masukkan email Anda"
                                            required
                                        />
                                        {errors.email && (
                                            <div className="text-red-600 text-sm mt-2 flex items-center">
                                                <FaTimes className="mr-1" />
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Date Selection */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FaCalendarAlt className="inline mr-2 text-brown" />
                                        Tanggal Booking
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        onChange={handleDateChange}
                                        min={today}
                                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brown focus:border-brown transition-all duration-300"
                                        required
                                    />
                                    {errors.date && (
                                        <div className="text-red-600 text-sm mt-2 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.date}
                                        </div>
                                    )}
                                </div>

                                {/* Schedule Selection */}
                                {scheduleAvailability.length > 0 && (
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                                            <FaClock className="inline mr-2 text-brown" />
                                            Pilih Jadwal
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                            {scheduleAvailability.map(
                                                (schedule) => (
                                                    <button
                                                        key={schedule.id}
                                                        type="button"
                                                        onClick={() =>
                                                            schedule.is_available &&
                                                            setData(
                                                                "schedule_id",
                                                                schedule.id
                                                            )
                                                        }
                                                        disabled={
                                                            !schedule.is_available
                                                        }
                                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                                            schedule.is_available
                                                                ? "bg-brown text-white hover:bg-brown-dark shadow-lg"
                                                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                        } ${
                                                            data.schedule_id ===
                                                            schedule.id
                                                                ? "ring-4 ring-brown ring-opacity-50 scale-105"
                                                                : ""
                                                        }`}
                                                    >
                                                        {schedule.time_range}
                                                        {!schedule.is_available && (
                                                            <div className="text-xs mt-1">
                                                                Terbooked
                                                            </div>
                                                        )}
                                                    </button>
                                                )
                                            )}
                                        </div>

                                        {/* Legend */}
                                        <p className="text-left text-sm text-gray-600 mt-8 mb-1">
                                            Notes : Khusus untuk hari Jumat buka pukul 13.00
                                        </p>
                                        <p className="text-left text-sm text-gray-600 mb-2 ml-[49px]">
                                            Pastikan booking minimal 5 jam sebelum memilih jadwal karena menghindari bentrok dengan customers offline.
                                        </p>
                                        <div className="mt-6 flex flex-wrap gap-4 text-sm items-center justify-center bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 bg-brown rounded"></div>
                                                <span>Tersedia</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                                                <span>Sudah Dibooking</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 bg-brown ring-4 ring-brown ring-opacity-50 rounded"></div>
                                                <span>Dipilih</span>
                                            </div>
                                        </div>

                                        {errors.schedule_id && (
                                            <div className="text-red-600 text-sm mt-2 flex items-center">
                                                <FaTimes className="mr-1" />
                                                {errors.schedule_id}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Service Selection */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                                        <FaCut className="inline mr-2 text-brown" />
                                        Pilih Layanan
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {services.map((service) => (
                                            <div
                                                key={service.id}
                                                onClick={() =>
                                                    handleServiceChange(
                                                        service.id
                                                    )
                                                }
                                                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                                                    data.service_id ==
                                                    service.id
                                                        ? "border-brown bg-brown text-white shadow-lg"
                                                        : "border-gray-200 bg-white hover:border-brown"
                                                }`}
                                            >
                                                <h4 className="font-semibold text-lg mb-2">
                                                    {service.name}
                                                </h4>
                                                <p
                                                    className={`text-sm mb-2 ${
                                                        data.service_id ==
                                                        service.id
                                                            ? "text-gray-100"
                                                            : "text-gray-600"
                                                    }`}
                                                >
                                                    {service.description}
                                                </p>
                                                <p className="font-bold text-lg">
                                                    Rp{" "}
                                                    {parseInt(
                                                        service.price
                                                    ).toLocaleString("id-ID")}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.service_id && (
                                        <div className="text-red-600 text-sm mt-2 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.service_id}
                                        </div>
                                    )}
                                </div>

                                {/* Cutter Selection */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                                        <FaUserTie className="inline mr-2 text-brown" />
                                        Pilih Cutter
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {cutters.map((cutter) => (
                                            <div
                                                key={cutter.id}
                                                onClick={() =>
                                                    handleCutterChange(
                                                        cutter.id
                                                    )
                                                }
                                                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 text-center ${
                                                    data.cutter_id == cutter.id
                                                        ? "border-brown bg-brown text-white shadow-lg"
                                                        : "border-gray-200 bg-white hover:border-brown"
                                                }`}
                                            >
                                                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                                                    {cutter.image ? (
                                                        <img
                                                            src={`/storage/${cutter.image}`}
                                                            alt={cutter.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-brown text-white">
                                                            <FaUserTie className="text-2xl" />
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="font-semibold text-lg">
                                                    {cutter.name}
                                                </h4>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.cutter_id && (
                                        <div className="text-red-600 text-sm mt-2 flex items-center">
                                            <FaTimes className="mr-1" />
                                            {errors.cutter_id}
                                        </div>
                                    )}
                                </div>

                                {/* Booking Summary */}
                                {(data.service_id ||
                                    data.cutter_id ||
                                    data.date ||
                                    data.schedule_id) && (
                                    <div className="bg-gradient-to-r from-brown to-brown-dark text-white p-6 rounded-xl">
                                        <h4 className="font-bold text-lg mb-4 flex items-center">
                                            <FaInfoCircle className="mr-2" />
                                            Ringkasan Booking
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                            {selectedService && (
                                                <div>
                                                    <span className="font-medium">
                                                        Layanan:
                                                    </span>
                                                    <p>
                                                        {selectedService.name} -
                                                        Rp{" "}
                                                        {parseInt(
                                                            selectedService.price
                                                        ).toLocaleString(
                                                            "id-ID"
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                            {selectedCutter && (
                                                <div>
                                                    <span className="font-medium">
                                                        Cutter:
                                                    </span>
                                                    <p>{selectedCutter.name}</p>
                                                </div>
                                            )}
                                            {data.date && (
                                                <div>
                                                    <span className="font-medium">
                                                        Tanggal:
                                                    </span>
                                                    <p>
                                                        {new Date(
                                                            data.date
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                weekday: "long",
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                            {data.schedule_id && (
                                                <div>
                                                    <span className="font-medium">
                                                        Waktu:
                                                    </span>
                                                    <p>
                                                        {
                                                            scheduleAvailability.find(
                                                                (s) =>
                                                                    s.id ==
                                                                    data.schedule_id
                                                            )?.time_range
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="text-center pt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-brown hover:bg-brown-dark text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center mx-auto min-w-[200px]"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                <FaCalendarCheck className="mr-2" />
                                                Buat Booking
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
