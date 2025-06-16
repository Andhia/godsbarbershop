import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import RedirectButton from "@/Components/RedirectButton";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cutters.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Cutter" />
            <div className="max-w-2xl p-6 mx-auto mt-8 bg-white rounded-lg shadow-md">
                <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
                    Tambah Cutter
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6 bg-white"
                >
                    <div className="flex justify-start">
                        <RedirectButton
                            className="bg-brown"
                            href={route("cutters.index")}
                        >
                            Kembali
                        </RedirectButton>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Cutter
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="block w-full px-4 py-2 mt-1 border rounded-md"
                        />
                        {errors.name && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gambar
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                            className="block w-full px-4 py-2 mt-1 border rounded-md"
                        />
                        {errors.image && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.image}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton
                            className="bg-brown"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? "Memproses..." : "Tambah Cutter"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
