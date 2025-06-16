# Dokumentasi Detail Controller Barbershop

## 🔵 BookingController

### Namespace dan Import
```php
namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Cutter;
use Inertia\Inertia;
use App\Models\Schedule;
use App\Models\Service;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
```
Penjelasan:
- Menggunakan namespace `App\Http\Controllers`
- Import model-model yang diperlukan (Booking, Cutter, Schedule, Service)
- Import Inertia untuk rendering
- Import GuzzleHttp untuk kirim email
- Import Log untuk logging system

### Method Index
```php
public function index()
{
    $bookings = Booking::with(['service', 'schedule', 'cutter', 'paymentProof'])
                      ->orderBy('date', 'asc')
                      ->get(); 

    return Inertia::render('Admin/Booking/Index', [
        'bookings' => $bookings,
    ]);
}
```
Penjelasan:
- Menggunakan eager loading dengan `with()` untuk mengambil relasi
- Mengurutkan booking berdasarkan tanggal (ascending)
- Render view dengan Inertia ke halaman admin

### Method Create
```php
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
```
Penjelasan:
- Mengambil semua data yang diperlukan untuk form booking
- Menyiapkan data services, schedules, bookings, dan cutters
- Render ke halaman Booking dengan data lengkap

### Method Store
```php
public function store(Request $request)
{
    try {
        // Validasi input
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'date' => 'required|date',
            'email' => 'required|email|max:255',
            'service_id' => 'required|exists:services,id',
            'schedule_id' => 'required|exists:schedules,id',
            'cutter_id' => 'required|exists:cutters,id'
        ]);

        // Buat booking baru
        $booking = Booking::create([
            'customer_name' => $request->customer_name,
            'date' => $request->date,
            'email' => $request->email,
            'service_id' => $request->service_id,
            'schedule_id' => $request->schedule_id,
            'cutter_id' => $request->cutter_id,
            'status' => 1,
        ]);
    
        // Update status jadwal
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
        $paymentLink = "https://barbershopku.online/payment/{$booking->id}";
    
        // Kirim email
        $client = new Client();
        $response = $client->post('http://103.87.67.71:7001/email/send', [
            'json' => [
                'email' => 'devsoulcode0@gmail.com',
                'password' => 'ulxe usvm imlw ijfm',
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
```
Penjelasan:
- Validasi input dengan rules yang ketat
- Membuat booking baru dengan status awal 1
- Update status jadwal menjadi tidak tersedia
- Generate link pembayaran
- Kirim email konfirmasi dengan detail booking
- Implementasi try-catch untuk error handling
- Logging untuk tracking error dan success

### Method Confirm Payment
```php
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
    $response = $client->post('http://103.87.67.71:7001/email/send', [
        'json' => [
            'email' => 'devsoulcode0@gmail.com',
            'password' => 'ulxe usvm imlw ijfm',
            'to' => $customerEmail,
            'subject' => 'Konfirmasi Pembayaran - Booking Barbershop',
            'text' => $emailBody
        ]
    ]);
}
```
Penjelasan:
- Mengambil data booking dengan relasi service dan schedule
- Update status booking menjadi 2 (confirmed)
- Menyiapkan data untuk email konfirmasi
- Kirim email konfirmasi dengan detail lengkap

### Method Destroy
```php
public function destroy($bookingId)
{
    $booking = Booking::findOrFail($bookingId);
    $booking->delete();

    return redirect()->route('booking.index');
}
```
Penjelasan:
- Mencari booking berdasarkan ID
- Hapus booking jika ditemukan
- Redirect ke halaman index

## 🟢 ContentController

### Namespace dan Import
```php
namespace App\Http\Controllers;

use App\Models\Cutter;
use App\Models\Service;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;
```
Penjelasan:
- Import model Cutter dan Service
- Import Application untuk versi Laravel
- Import Inertia untuk rendering

### Method Home
```php
public function home()
{
    $cutters = Cutter::all();
    $services = Service::all();

    return Inertia::render('Home', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'cutters' => $cutters,
        'services' => $services
    ]);
}
```
Penjelasan:
- Mengambil semua data cutter dan service
- Menyertakan versi Laravel dan PHP
- Render ke halaman Home

## 🟡 CustomerController

### Namespace dan Import
```php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Models\PaymentProof;
```

### Method Get Payment
```php
public function getPayment($id)
{
    $booking = Booking::with(['service', 'schedule'])->find($id);
    $paymentProof = PaymentProof::where('booking_id', $id)->first();
    $isPay = $paymentProof ? true : false;
    
    if (!$booking) {
        abort(404, 'Booking tidak ditemukan');
    }

    return inertia('Payment', [
        'booking' => $booking,
        'isPay' => $isPay,
    ]);
}
```
Penjelasan:
- Mengambil data booking dengan relasi
- Cek status pembayaran
- Handle 404 jika booking tidak ditemukan
- Render halaman Payment

### Method Submit Proof
```php
public function submitProof(Request $request, $bookingId)
{
    try{
        $request->validate([
            'proof_image' => 'required|image',
        ]);

        $image = $request->file('proof_image');
        $imagePath = $image->store('payment_proofs', 'public');

        $paymentProof = PaymentProof::create([
            'booking_id' => $bookingId,
            'proof_image' => $imagePath,
        ]);

        session()->flash('success', 'Payment proof uploaded successfully');

    }catch(\Exception $e){
        session()->flash('error', 'Terjadi kesalahan saat menyimpan booking.');
    
        return back();
    }
}
```
Penjelasan:
- Validasi file gambar
- Upload dan simpan gambar
- Buat record payment proof
- Handle error dengan try-catch

## 🟣 CutterController

### Namespace dan Import
```php
namespace App\Http\Controllers;

use App\Models\Cutter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
```
Penjelasan:
- Import model Cutter
- Import Storage untuk handle file
- Import Inertia untuk rendering

### Method Index
```php
public function index()
{
    $cutters = Cutter::all();
    return Inertia::render('Admin/Cutters/Index', [
        'cutters' => $cutters
    ]);
}
```
Penjelasan:
- Mengambil semua data tukang cukur
- Render ke halaman admin

### Method Create & Store
```php
public function create()
{
    return Inertia::render('Admin/Cutters/Create');
}

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $data = $request->only('name');

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('cutters', 'public');
    }

    Cutter::create($data);

    return redirect()->route('cutters.index')->with('success', 'Cutter berhasil ditambahkan.');
}
```
Penjelasan:
- Validasi nama dan gambar
- Handle upload gambar ke folder public
- Simpan data tukang cukur
- Redirect dengan pesan sukses

### Method Edit & Update
```php
public function edit(Cutter $cutter)
{
    return Inertia::render('Admin/Cutters/Edit', [
        'cutter' => $cutter
    ]);
}

public function update(Request $request, Cutter $cutter)
{
    $request->validate([
        'name' => 'nullable|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $data = $request->only('name');

    if ($request->hasFile('image')) {
        if ($cutter->image) {
            Storage::disk('public')->delete($cutter->image);
        }
        $data['image'] = $request->file('image')->store('cutters', 'public');
    }

    $cutter->update($data);

    return redirect()->route('cutters.index')->with('success', 'Cutter berhasil diperbarui.');
}
```
Penjelasan:
- Validasi input update
- Handle update gambar dengan menghapus gambar lama
- Update data tukang cukur
- Redirect dengan pesan sukses

### Method Destroy
```php
public function destroy(Cutter $cutter)
{
    if ($cutter->image) {
        Storage::disk('public')->delete($cutter->image);
    }
    $cutter->delete();

    return redirect()->route('cutters.index')->with('success', 'Cutter berhasil dihapus.');
}
```
Penjelasan:
- Hapus gambar dari storage jika ada
- Hapus data tukang cukur
- Redirect dengan pesan sukses

## 🟤 DashboardController

### Namespace dan Import
```php
namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Cutter;
use App\Models\Service;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;
```
Penjelasan:
- Import model-model yang diperlukan
- Import Carbon untuk handle tanggal
- Import Inertia untuk rendering

### Method Index
```php
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
```
Penjelasan:
- Set locale ke Indonesia untuk format tanggal
- Ambil data statistik (jumlah cutter dan layanan)
- Generate data booking per bulan
- Format nama bulan dalam bahasa Indonesia
- Menyiapkan data untuk dropdown tahun
- Render dashboard dengan data lengkap

## ⚫ ProfileController

### Namespace dan Import
```php
namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
```

### Method Edit
```php
public function edit(Request $request): Response
{
    return Inertia::render('Profile/Edit', [
        'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
        'status' => session('status'),
    ]);
}
```
Penjelasan:
- Render form edit profil
- Cek apakah email perlu verifikasi
- Tampilkan status dari session

### Method Update
```php
public function update(ProfileUpdateRequest $request): RedirectResponse
{
    $request->user()->fill($request->validated());

    if ($request->user()->isDirty('email')) {
        $request->user()->email_verified_at = null;
    }

    $request->user()->save();

    return Redirect::route('profile.edit');
}
```
Penjelasan:
- Validasi request dengan ProfileUpdateRequest
- Update data user
- Reset email verification jika email berubah
- Redirect ke halaman edit

### Method Destroy
```php
public function destroy(Request $request): RedirectResponse
{
    $request->validate([
        'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
}
```
Penjelasan:
- Validasi password sebelum hapus akun
- Logout user
- Hapus akun
- Invalidate session dan regenerate token
- Redirect ke homepage

## 🔴 ServiceController

### Namespace dan Import
```php
namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
```

### Method Index & Create
```php
public function index()
{
    return Inertia::render('Admin/Services/Index', [
        'services' => Service::latest()->get(),
    ]);
}

public function create()
{
    return Inertia::render('Admin/Services/Create');
}
```
Penjelasan:
- Index menampilkan daftar layanan terbaru
- Create menampilkan form tambah layanan

### Method Store
```php
public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $data = $request->all();

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('services', 'public');
    }

    Service::create($data);

    return redirect()->route('services.index')->with('success', 'Layanan berhasil ditambahkan!');
}
```
Penjelasan:
- Validasi input layanan
- Handle upload gambar
- Simpan data layanan
- Redirect dengan pesan sukses

### Method Edit & Update
```php
public function edit(Service $service)
{
    return Inertia::render('Admin/Services/Edit', compact('service'));
}

public function update(Request $request, Service $service)
{
    Log::info('Service Update Request:', $request->all());

    $request->validate([
        'name' => 'nullable|string|max:255',
        'price' => 'nullable|numeric|min:0',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $data = $request->all();

    if ($request->hasFile('image')) {
        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }
        $data['image'] = $request->file('image')->store('services', 'public');
    }

    $service->update($data);

    return redirect()->route('services.index')->with('success', 'Layanan berhasil diperbarui!');
}
```
Penjelasan:
- Logging untuk track request update
- Validasi input update
- Handle update gambar
- Update data layanan
- Redirect dengan pesan sukses

### Method Destroy
```php
public function destroy(Service $service)
{
    $service->delete();

    return redirect()->route('services.index')->with('success', 'Layanan berhasil dihapus!');
}
```
Penjelasan:
- Hapus data layanan
- Redirect dengan pesan sukses

## Catatan Penting Implementasi:

1. **Security Best Practices**:
   - Validasi semua input
   - Sanitasi data sebelum disimpan
   - Proteksi terhadap CSRF
   - Proper file handling

2. **Performance Optimization**:
   - Eager loading untuk relasi
   - Proper indexing di database
   - Caching untuk data statis
   - Optimized queries

3. **Error Handling**:
   - Try-catch blocks
   - Proper logging
   - User friendly messages
   - Graceful error recovery

4. **File Management**:
   - Secure file uploads
   - Proper file deletion
   - Type validation
   - Size restrictions

5. **User Experience**:
   - Flash messages
   - Proper redirects
   - Form validation
   - Responsive feedback

6. **Code Organization**:
   - Proper namespacing
   - Clean code principles
   - DRY (Don't Repeat Yourself)
   - SOLID principles
