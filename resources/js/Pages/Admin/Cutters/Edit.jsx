import React, { useState } from "react";

import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import Swal from "sweetalert2";

const EditCutter = ({ cutter }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: cutter.name,
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(
        cutter.image ? `/storage/${cutter.image}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("DATA", data);

        router.post(
            `/cutters/${cutter.id}`,
            {
                _method: "put",
                image: data.image,
                name: data.name,
            },
            {
                onSuccess: () => {
                    Swal.fire(
                        "Berhasil!",
                        "Cutter berhasil diupdate!",
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
            <Head title="Edit Cutter" />
            <div className="max-w-2xl p-6 mx-auto mt-8 bg-white rounded-lg shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Edit Cutter
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">
                            Nama Cutter
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">
                            Gambar Cutter
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

                    <div className="flex justify-end space-x-2">
                        <PrimaryButton
                            className="bg-brown"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditCutter;