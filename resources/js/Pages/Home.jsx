import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import Slider from "@/Components/Home/Slider";
import About from "@/Components/Home/About";
import OurService from "@/Components/Home/Service";
import OurBarbers from "@/Components/Home/Barbers";
import Footer from "@/Components/Home/Footer";

export default function Welcome({ cutters, services }) {
    return (
        <GuestLayout>
            <Head title="Barbershop - Layanan Terbaik untuk Penampilan Sempurna" />

            <Slider />

            <About />

            <OurService services={services} />

            <OurBarbers cutters={cutters} />

            <Footer />
        </GuestLayout>
    );
}
