<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Booking Barbershop</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }
        .header h1 {
            margin: 0;
            font-size: 18px;
            font-weight: bold;
        }
        .header p {
            margin: 5px 0;
            color: #666;
        }
        .summary {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            gap: 20px;
        }
        .summary-item {
            flex: 1;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 5px;
            text-align: center;
        }
        .summary-item h3 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 14px;
        }
        .summary-item .value {
            font-size: 20px;
            font-weight: bold;
            color: #2563eb;
        }
        .revenue .value {
            color: #16a34a;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            font-size: 10px;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
            text-align: center;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .status {
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
        }
        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
        }
        .status-confirmed {
            background-color: #d1fae5;
            color: #065f46;
        }
        .status-cancelled {
            background-color: #fee2e2;
            color: #991b1b;
        }
        .no-data {
            text-align: center;
            padding: 50px;
            color: #666;
            font-style: italic;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>LAPORAN BOOKING BARBERSHOP</h1>
        @if($startDate && $endDate)
            <p>Periode: {{ \Carbon\Carbon::parse($startDate)->format('d F Y') }} - {{ \Carbon\Carbon::parse($endDate)->format('d F Y') }}</p>
        @else
            <p>Semua Data Booking</p>
        @endif
        <p>Dicetak pada: {{ \Carbon\Carbon::now()->format('d F Y H:i:s') }}</p>
    </div>

    <div class="summary">
        <div class="summary-item">
            <h3>Total Booking</h3>
            <div class="value">{{ $totalBookings }}</div>
        </div>
        <div class="summary-item revenue">
            <h3>Total Pendapatan</h3>
            <div class="value">Rp {{ number_format($totalRevenue, 0, ',', '.') }}</div>
        </div>
    </div>

    @if($bookings->count() > 0)
        <table>
            <thead>
                <tr>
                    <th style="width: 5%;">No</th>
                    <th style="width: 12%;">Tanggal</th>
                    <th style="width: 20%;">Nama Customer</th>
                    <th style="width: 15%;">Layanan</th>
                    <th style="width: 12%;">Cutter</th>
                    <th style="width: 12%;">Jadwal</th>
                    <th style="width: 12%;">Harga</th>
                    <th style="width: 12%;">Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach($bookings as $index => $booking)
                    <tr>
                        <td style="text-align: center;">{{ $index + 1 }}</td>
                        <td>{{ \Carbon\Carbon::parse($booking->date)->format('d/m/Y') }}</td>
                        <td>{{ $booking->customer_name }}</td>
                        <td>{{ $booking->service->name ?? '-' }}</td>
                        <td>{{ $booking->cutter->name ?? '-' }}</td>
                        <td>{{ $booking->schedule->time_range ?? '-' }}</td>
                        <td>Rp {{ number_format($booking->service->price ?? 0, 0, ',', '.') }}</td>
                        <td style="text-align: center;">
                            @switch($booking->status)
                                @case(1)
                                    <span class="status status-pending">Menunggu Pembayaran</span>
                                    @break
                                @case(2)
                                    <span class="status status-confirmed">Lunas</span>
                                    @break
                                @case(3)
                                    <span class="status status-cancelled">Dibatalkan</span>
                                    @break
                                @default
                                    <span class="status">Unknown</span>
                            @endswitch
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <div class="no-data">
            <p>Tidak ada data booking untuk periode yang dipilih.</p>
        </div>
    @endif

    <div class="footer">
        <p>Laporan ini digenerate secara otomatis oleh sistem Barbershop</p>
    </div>
</body>
</html>
