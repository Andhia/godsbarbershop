import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import RedirectButton from "@/Components/RedirectButton";

const ServiceIndex = ({ services: initialServices }) => {
    const [services, setServices] = useState(initialServices);
    const { delete: destroy } = useForm();

    const deleteService = (serviceId) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Service ini akan dihapus secara permanen.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("services.destroy", serviceId), {
                    onSuccess: () => {
                        Swal.fire("Berhasil!", "Service berhasil dihapus!", "success");
                        setServices((prev) => prev.filter((s) => s.id !== serviceId));
                    },
                    onError: () => {
                        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus service.", "error");
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Service" />

            <div className="px-8 py-10">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Daftar Service
                </h1>

                <div className="flex justify-end mb-4">
                    <RedirectButton className="bg-brown text-white" href={route("services.create")}>
                        Tambah Service
                    </RedirectButton>
                </div>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="p-3 text-center border">Nama</th>
                                <th className="p-3 text-center border">Harga</th>
                                <th className="p-3 text-center border">Deskripsi</th>
                                <th className="p-3 text-center border">Gambar</th>
                                <th className="p-3 text-center border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id} className="border">
                                    <td className="p-3">{service.name}</td>
                                    <td className="p-3">Rp {service.price.toLocaleString()}</td>
                                    <td className="p-3">{service.description}</td>
                                    <td className="p-3 flex justify-center">
                                        {service.image && (
                                            <img src={`/storage/${service.image}`} alt={service.name} className="h-12" />
                                        )}
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center items-center space-x-2">
                                            <Link href={route("services.edit", service.id)} className="text-yellow-500 hover:text-yellow-700">
                                                <RiEdit2Line size={20} />
                                            </Link>
                                            <RiDeleteBin2Line
                                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                                size={20}
                                                onClick={() => deleteService(service.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ServiceIndex;
