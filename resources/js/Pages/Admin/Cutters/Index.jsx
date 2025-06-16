import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { RiDeleteBin2Line, RiEdit2Line, RiRefreshLine } from "react-icons/ri";
import Swal from "sweetalert2";
import RedirectButton from "@/Components/RedirectButton";

const CutterIndex = ({ cutters: initialCutters }) => {
    const [cutters, setCutters] = useState(initialCutters);
    const { delete: destroy, patch } = useForm();

    console.log("CUTTERS", cutters);
    const deleteCutter = (cutterId) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Cutter ini akan dihapus (soft delete).",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("cutters.destroy", cutterId), {
                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            "Cutter berhasil dihapus!",
                            "success"
                        );
                        setCutters((prev) =>
                            prev.map((c) =>
                                c.id === cutterId
                                    ? {
                                          ...c,
                                          deleted_at: new Date().toISOString(),
                                      }
                                    : c
                            )
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat menghapus cutter.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    const restoreCutter = (cutterId) => {
        Swal.fire({
            title: "Pulihkan Cutter?",
            text: "Cutter ini akan dipulihkan kembali.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Pulihkan!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                patch(route("cutters.restore", cutterId), {
                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            "Cutter berhasil dipulihkan!",
                            "success"
                        );
                        setCutters((prev) =>
                            prev.map((c) =>
                                c.id === cutterId
                                    ? { ...c, deleted_at: null }
                                    : c
                            )
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat memulihkan cutter.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    const forceDeleteCutter = (cutterId) => {
        Swal.fire({
            title: "Hapus Permanen?",
            text: "Cutter ini akan dihapus secara permanen dan tidak dapat dipulihkan!",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus Permanen!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("cutters.force-delete", cutterId), {
                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            "Cutter berhasil dihapus permanen!",
                            "success"
                        );
                        setCutters((prev) =>
                            prev.filter((c) => c.id !== cutterId)
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat menghapus cutter.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Cutter" />

            <div className="px-8 py-10">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Daftar Cutter
                </h1>

                <div className="flex justify-end mb-4">
                    <RedirectButton
                        className="bg-brown text-white"
                        href={route("cutters.create")}
                    >
                        Tambah Cutter
                    </RedirectButton>
                </div>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="p-3 text-left border">Nama</th>
                                <th className="p-3 text-left border">Gambar</th>
                                <th className="p-3 text-left border">Status</th>
                                <th className="p-3 text-center border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cutters.map((cutter) => (
                                <tr
                                    key={cutter.id}
                                    className={`border ${
                                        cutter.deleted_at ? "bg-red-50" : ""
                                    }`}
                                >
                                    <td className="p-3">{cutter.name}</td>
                                    <td className="p-3">
                                        {cutter.image && (
                                            <img
                                                src={`/storage/${cutter.image}`}
                                                alt={cutter.name}
                                                className="h-12"
                                            />
                                        )}
                                    </td>
                                    <td className="p-3">
                                        {cutter.deleted_at ? (
                                            <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                                                Dihapus
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                                Aktif
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center items-center space-x-2">
                                            {!cutter.deleted_at ? (
                                                <>
                                                    <Link
                                                        href={route(
                                                            "cutters.edit",
                                                            cutter.id
                                                        )}
                                                        className="text-yellow-500 hover:text-yellow-700"
                                                    >
                                                        <RiEdit2Line
                                                            size={20}
                                                        />
                                                    </Link>
                                                    <RiDeleteBin2Line
                                                        className="text-red-500 hover:text-red-700 cursor-pointer"
                                                        size={20}
                                                        onClick={() =>
                                                            deleteCutter(
                                                                cutter.id
                                                            )
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <RiRefreshLine
                                                        className="text-green-500 hover:text-green-700 cursor-pointer"
                                                        size={20}
                                                        onClick={() =>
                                                            restoreCutter(
                                                                cutter.id
                                                            )
                                                        }
                                                        title="Pulihkan"
                                                    />
                                                    <RiDeleteBin2Line
                                                        className="text-red-800 hover:text-red-900 cursor-pointer"
                                                        size={20}
                                                        onClick={() =>
                                                            forceDeleteCutter(
                                                                cutter.id
                                                            )
                                                        }
                                                        title="Hapus Permanen"
                                                    />
                                                </>
                                            )}
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

export default CutterIndex;
