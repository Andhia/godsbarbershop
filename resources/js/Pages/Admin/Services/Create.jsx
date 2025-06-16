import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { RiArrowLeftLine } from "react-icons/ri";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        price: "",
        description: "",
        image: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("services.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Layanan" />

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
                <Link href={route("services.index")} className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
                    <RiArrowLeftLine size={20} className="mr-2" /> Kembali
                </Link>

                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Tambah Layanan</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama</label>
                        <input type="text" value={data.name} onChange={(e) => setData("name", e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md" />
                        {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Harga</label>
                        <input type="number" value={data.price} onChange={(e) => setData("price", e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md" />
                        {errors.price && <div className="text-red-600 text-sm mt-1">{errors.price}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                        <textarea value={data.description} onChange={(e) => setData("description", e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gambar</label>
                        <input
                            type="file"
                            onChange={(e) => setData("image", e.target.files[0])}
                            className="mt-1 block w-full px-4 py-2 border rounded-md"
                        />
                        {errors.image && <div className="text-red-600 text-sm mt-1">{errors.image}</div>}
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton className="bg-brown" type="submit" disabled={processing}>{processing ? "Memproses..." : "Tambah Layanan"}</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
