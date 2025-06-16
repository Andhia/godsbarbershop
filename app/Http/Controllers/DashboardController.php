<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Cutter;
use App\Models\Service;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Set locale Carbon ke Indonesia
        Carbon::setLocale('id');

        // Ambil tahun dari request (default tahun sekarang)
        $year = $request->input('year', now()->year);

        // Ambil data jumlah cutter dan layanan
        $cutters = Cutter::count();
        $services = Service::count();

        // Data bookings per bulan dari database
        $rawData = Booking::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->whereYear('created_at', $year)
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->keyBy('month');

        // Buat list 12 bulan default (1 - 12) dengan total default 0
        $bookingsPerMonth = collect(range(1, 12))->map(function ($month) use ($rawData) {
            return [
                'month' => Carbon::create()->month($month)->translatedFormat('F'),
                'total' => $rawData->get($month)?->total ?? 0,
            ];
        });

        return Inertia::render('Dashboard', [
            'cutters' => $cutters,
            'services' => $services,
            'bookings' => $bookingsPerMonth,
            'selectedYear' => (int) $year,
            'years' => range(now()->year, now()->year - 4), // Dropdown tahun, 5 terakhir
        ]);
    }
}
