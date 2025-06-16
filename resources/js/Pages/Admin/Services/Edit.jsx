import { Head, Link, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { RiArrowLeftLine } from "react-icons/ri";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Edit({ service }) {
    const { data, setData, put, processing, errors } = useForm({
        name: service.name,
        price: service.price,
        description: service.description || "",
        image: null,
    });

    console.log("DATA", data);

    const [previewImage, setPreviewImage] = useState(
        service.image ? `/storage/${service.image}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            `/services/${service.id}`,
            {
                _method: "put",
                image: data.image,
                name: data.name,
                price: data.price,
                description: data.description,
            },
            {
                onSuccess: () => {
                    Swal.fire(
                        "Berhasil!",
                        "Servuce berhasil diupdate!",
                        "success"
                    );
                },
            }
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Layanan" />

            <div className="max-w-2xl p-6 mx-auto mt-8 bg-white rounded-lg shadow-md">
                {/* Tombol kembali */}
                <Link
                    href={route("services.index")}
                    className="flex items-center mb-4 text-gray-600 hover:text-gray-900"
                >
                    <RiArrowLeftLine size={20} className="mr-2" /> Kembali
                </Link>

                <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
                    Edit Layanan
                </h1>

                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md"
                        />
                        {errors.name && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Harga
                        </label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md"
                        />
                        {errors.price && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.price}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Deskripsi
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="w-full px-4 py-2 mt-1 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">
                            Gambar Layanan
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="object-cover w-32 h-32 mt-2 border rounded-lg"
                            />
                        )}
                        {errors.image && (
                            <p className="text-sm text-red-500">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton
                            className="bg-brown"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? "Memproses..." : "Simpan Perubahan"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
