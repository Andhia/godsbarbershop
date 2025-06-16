<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CutterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ServiceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ContentController::class, 'home'])->name('home');

Route::get('/about', [ContentController::class, 'about'])->name('about');

Route::get('/service', [ContentController::class, 'service'])->name('service');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');


Route::post('/contact', [ContactController::class, 'sendEmail'])->name('contact.send');


Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/booking/create', [BookingController::class, 'create'])->name('booking.create');
Route::post('/booking/store', [BookingController::class, 'store'])->name('booking.store');

Route::get('/payment/{id}', [CustomerController::class, 'getPayment'])->name('payment.get');
Route::post('/payment/submit/{id}', [CustomerController::class, 'submitProof'])->name('payment.submit');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/booking', [BookingController::class, 'index'])->name('booking.index');
    Route::patch('/payment/confirm/{id}', [BookingController::class, 'confirmPayment'])->name('payment.confirm');
    Route::delete('/booking/{id}', [BookingController::class, 'destroy'])->name('booking.destroy');

    Route::get('/cutters', [CutterController::class, 'index'])->name('cutters.index');
    Route::get('/cutters/create', [CutterController::class, 'create'])->name('cutters.create');
    Route::post('/cutters', [CutterController::class, 'store'])->name('cutters.store');
    Route::get('/cutters/{cutter}/edit', [CutterController::class, 'edit'])->name('cutters.edit');
    Route::put('/cutters/{cutter}', [CutterController::class, 'update'])->name('cutters.update');
    Route::delete('/cutters/{cutter}', [CutterController::class, 'destroy'])->name('cutters.destroy');
    Route::patch('/cutters/{id}/restore', [CutterController::class, 'restore'])->name('cutters.restore');
    Route::delete('/cutters/{id}/force-delete', [CutterController::class, 'forceDelete'])->name('cutters.force-delete');

    Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
    Route::get('/services/create', [ServiceController::class, 'create'])->name('services.create');
    Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
    Route::get('/services/{service}/edit', [ServiceController::class, 'edit'])->name('services.edit');
    Route::put('/services/{service}', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');
});

require __DIR__ . '/auth.php';
