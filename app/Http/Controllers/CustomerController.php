<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Models\PaymentProof;

class CustomerController extends Controller
{
    public function getPayment($id)
    {
        // Find the booking with related service, schedule, and cutter
        $booking = Booking::with(['service', 'schedule', 'cutter'])->find($id);

        // Check if a payment proof exists for the booking
        $paymentProof = PaymentProof::where('booking_id', $id)->first();

        // Set isPay flag
        $isPay = $paymentProof ? true : false;

        // If booking doesn't exist, return 404
        if (!$booking) {
            abort(404, 'Booking tidak ditemukan');
        }

        // Return the data for the 'Payment' page
        return inertia('Payment', [
            'booking' => $booking,
            'isPay' => $isPay,
        ]);
    }

    public function submitProof(Request $request, $bookingId)
    {
        try{
            $request->validate([
                'proof_image' => 'required|image', // Ensure it's an image
            ]);

            // Get the image file from the request
            $image = $request->file('proof_image');

            // Store the image in the public directory
            $imagePath = $image->store('payment_proofs', 'public'); // Store the image in "storage/app/public/payment_proofs" folder

            // Store the image path in the database
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
}
