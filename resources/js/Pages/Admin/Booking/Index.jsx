import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { RiDeleteBin2Line} from "react-icons/ri";
import { MdPreview } from "react-icons/md";
import Modal from "@/Components/Modal";
import Swal from "sweetalert2";
import PrimaryButton from "@/Components/PrimaryButton";

const BookingIndex = ({ bookings: initialBookings }) => {
    const [bookings, setBookings] = useState(initialBookings);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    console.log(bookings);

    const { patch, delete: destroy } = useForm();

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    };

    const confirmPayment = (bookingId) => {
        patch(route("payment.confirm", bookingId), {
            onSuccess: () => {
                Swal.fire(
                    "Berhasil!",
                    "Pembayaran telah dikonfirmasi.",
                    "success"
                );
                setBookings((prevBookings) =>
                    prevBookings.map((b) =>
                        b.id === bookingId ? { ...b, status: 2 } : b
                    )
                );
            },
            onError: () => {
                Swal.fire(
                    "Gagal!",
                    "Terjadi kesalahan saat konfirmasi pembayaran.",
                    "error"
                );
            },
        });
    };

    const deleteBooking = (bookingId) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Booking ini akan dihapus secara permanen.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("booking.destroy", bookingId), {
                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            "Booking berhasil dihapus!",
                            "success"
                        );
                        setBookings((prevBookings) =>
                            prevBookings.filter((b) => b.id !== bookingId)
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat menghapus booking.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Booking" />

            <div className="px-8 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Daftar Booking
                    </h1>
                </div>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-6 py-3 text-center text-gray-700">
                                    ID Booking
                                </th>
                                <th className="border px-6 py-3 text-center text-gray-700">
                                    Nama Pelanggan
                                </th>
                                <th className="border px-6 py-3 text-center text-gray-700">
                                    Layanan
                                </th>
                                <th className="border px-6 py-3 text-center text-gray-700">
                                    Cutter
                                </th>
                                <th className="border px-6 py-3 text-center text-gray-700">
                                    Jadwal
                                </th>
                                <th className="border px-6 py-3 text-center text-gray-700">
                                    Status Booking
                                </th>
                                <th className="border px-6 py-3 text-center text-gray-700">
                                    Status Pembayaran
                                </th>
                                <th className="border px-6 py-3 text-center text-gray-700">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr
                                    key={booking.id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-50 hover:bg-gray-100"
                                            : "bg-white hover:bg-gray-100"
                                    }
                                >
                                    <td className="border px-6 py-4 text-gray-700">
                                        {booking.id}
                                    </td>
                                    <td className="border px-6 py-4 text-gray-700">
                                        {booking.customer_name}
                                    </td>
                                    <td className="border px-6 py-4 text-gray-700">
                                        {booking.service.name}
                                    </td>
                                    <td className="border px-6 py-4 text-gray-700">
                                        {booking.cutter.name}
                                    </td>
                                    <td className="border px-6 py-4 text-gray-700">
                                        {new Date(
                                            booking.date
                                        ).toLocaleDateString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}{" "}
                                        - {booking.schedule.time_range}
                                    </td>
                                    <td className="border px-6 py-4 text-gray-700 text-center">
                                        {booking.status === 1 && (
                                            <span className="text-yellow-500 font-semibold">
                                                Pending
                                            </span>
                                        )}
                                        {booking.status === 2 && (
                                            <span className="text-blue-500 font-semibold">
                                                Dikonfirmasi
                                            </span>
                                        )}
                                        {booking.status === 3 && (
                                            <span className="text-green-500 font-semibold">
                                                Selesai
                                            </span>
                                        )}
                                    </td>
                                    <td className="border text-center px-6 py-4">
                                        {booking.payment_proof ? (
                                            <div className="flex space-x-2 items-center">
                                                <span className="text-green-500 font-semibold bg-green-200 border border-green-500 p-1 text-xs rounded">
                                                    Sudah Dibayar
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        openModal(
                                                            booking
                                                                .payment_proof
                                                                .proof_image
                                                        )
                                                    }
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    <MdPreview size={20} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-red-500 font-semibold bg-red-200 border-red-500 p-1 text-xs rounded">
                                                Belum Dibayar
                                            </span>
                                        )}
                                    </td>
                                    <td className="border px-6 py-4 text-center">
                                        <div className="flex items-center justify-center space-x-4">
                                            {booking.payment_proof &&
                                                booking.status !== 2 && (
                                                    <PrimaryButton
                                                        className="bg-green-500 hover:bg-green-700"
                                                        onClick={() =>
                                                            confirmPayment(
                                                                booking.id
                                                            )
                                                        }
                                                    >
                                                        Konfirmasi
                                                    </PrimaryButton>
                                                )}
                                            <RiDeleteBin2Line
                                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                                size={20}
                                                onClick={() =>
                                                    deleteBooking(booking.id)
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Modal show={modalOpen} onClose={closeModal}>
                    {selectedImage ? (
                        <div className="flex justify-center items-center p-4 bg-black/20">
                            <img
                                src={`/storage/${selectedImage}`}
                                alt="Bukti Pembayaran"
                                className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
                            />
                        </div>
                    ) : (
                        <p className="text-center">Gambar tidak ditemukan</p>
                    )}
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
};

export default BookingIndex;
