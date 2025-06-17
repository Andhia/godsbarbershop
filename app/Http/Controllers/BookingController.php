<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Cutter;
use Inertia\Inertia;
use App\Models\Schedule;
use App\Models\Service;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['service', 'schedule', 'cutter', 'paymentProof'])->orderBy('date', 'asc')->get();

        return Inertia::render('Admin/Booking/Index', [
            'bookings' => $bookings,
        ]);
    }


    public function create()
    {
        $services = Service::all();
        $schedules = Schedule::all();
        $bookings = Booking::all();
        $cutters = Cutter::all();

        return Inertia::render('Booking', [
            'bookings' => $bookings,
            'services' => $services,
            'schedules' => $schedules,
            'cutters' => $cutters
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'customer_name' => 'required|string|max:255',
                'date' => 'required|date',
                'email' => 'required|email|max:255',
                'service_id' => 'required|exists:services,id',
                'schedule_id' => 'required|exists:schedules,id',
                'cutter_id' => 'required|exists:cutters,id'
            ]);

            $booking = Booking::create([
                'customer_name' => $request->customer_name,
                'date' => $request->date,
                'email' => $request->email,
                'service_id' => $request->service_id,
                'schedule_id' => $request->schedule_id,
                'cutter_id' => $request->cutter_id,
                'status' => 1,
            ]);

            // Update schedule status
            $schedule = Schedule::find($request->schedule_id);
            $service = Service::find($request->service_id);

            if ($schedule && $service) {
                Log::info('Schedule Found:', ['schedule_id' => $schedule->id, 'status' => $schedule->status]);

                $schedule->status = true;
                $schedule->save();
            } else {
                Log::warning('Schedule Not Found:', ['schedule_id' => $request->schedule_id]);
            }

            // Generate payment link
            $paymentLink = env('APP_URL') . "/payment/{$booking->id}";

            // Send email
            $client = new Client();
            $response = $client->post(env('PROVIDER_API') . '/email/send', [
                'json' => [
                    'email' => env('MAIL_USERNAME'),
                    'password' => env('MAIL_PASSWORD'),
                    'to' => $request->email,
                    'subject' => 'BOOKING BARBERSHOP',
                    'text' => "Halo {$request->customer_name},\n\nBooking Anda telah diterima. Terima kasih telah memilih layanan {$service->name}. Pada tanggal {$request->date} jam {$schedule->time_range}.\n\nSilakan lakukan pembayaran melalui tautan berikut:\n{$paymentLink}\n\nMohon lakukan pembayaran dalam waktu 2 jam. Jika pembayaran tidak diterima dalam waktu tersebut, booking Anda akan dibatalkan secara otomatis."
                ]
            ]);

            Log::info('Email API Response:', ['response' => $response->getBody()->getContents()]);

            session()->flash('success', 'Booking berhasil!');
        } catch (\Exception $e) {
            Log::error('Booking Error: ' . $e->getMessage());
            session()->flash('error', 'Terjadi kesalahan saat menyimpan booking.');

            return back();
        }
    }

    public function confirmPayment($bookingId)
    {
        $booking = Booking::with(['service', 'schedule'])->find($bookingId);

        $booking->status = 2;
        $booking->save();

        $customerName = $booking->customer_name;
        $customerEmail = $booking->email;
        $serviceName = $booking->service->name;
        $bookingDate = $booking->date;
        $scheduleTime = $booking->schedule->time_range;
        $bookingId = $booking->id;

        $emailBody = "Halo {$customerName},\n\n" .
            "Pembayaran Anda telah dikonfirmasi! Berikut adalah detail booking Anda:\n\n" .
            "Nomor Antrian: {$bookingId}\n" .
            "Tanggal: {$bookingDate}\n" .
            "Jadwal: {$scheduleTime}\n" .
            "Layanan: {$serviceName}\n\n" .
            "Terima kasih telah memilih layanan kami. Sampai jumpa di barbershop!";

        $client = new Client();
        $response = $client->post(env('PROVIDER_API') . '/email/send', [
            'json' => [
                'email' => env('MAIL_USERNAME'),
                'password' => env('MAIL_PASSWORD'),
                'to' => $customerEmail,
                'subject' => 'Konfirmasi Pembayaran - Booking Barbershop',
                'text' => $emailBody
            ]
        ]);
    }

    public function destroy($bookingId)
    {
        $booking = Booking::findOrFail($bookingId);
        // Hapus data
        $booking->delete();

        return redirect()->route('booking.index');
    }
}