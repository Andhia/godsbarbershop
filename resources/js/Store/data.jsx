import { FaCut, FaPaintBrush, FaRegSmile, FaHeadset } from "react-icons/fa";

const dataStore = {
    services: [
        {
            icon: <FaCut />, // Ikon untuk layanan potong rambut
            title: "Potong Rambut",
            description:
                "Nikmati potongan rambut dengan gaya terbaru dan sesuai keinginan Anda. Layanan cepat dan nyaman yang membuat Anda tampil lebih segar.",
        },
        {
            icon: <FaPaintBrush />,
            title: "Pewarnaan Rambut",
            description:
                "Ubah penampilan Anda dengan warna rambut yang trendi. Kami menyediakan berbagai pilihan warna yang sesuai dengan gaya Anda.",
        },
        {
            icon: <FaRegSmile />, // Ikon untuk layanan perawatan wajah
            title: "Perawatan Wajah",
            description:
                "Layanan perawatan wajah untuk menenangkan kulit dan memberi tampilan yang lebih cerah dan segar.",
        },
        {
            icon: <FaHeadset />, // Ikon untuk layanan konsultasi atau layanan pelanggan
            title: "Konsultasi Gaya",
            description:
                "Konsultasi dengan stylist kami untuk menentukan gaya rambut yang paling cocok dengan penampilan dan kepribadian Anda.",
        },
    ],
};

export default dataStore;
