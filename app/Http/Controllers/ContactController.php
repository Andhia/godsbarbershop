<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        // Validasi request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        try {
            // Format isi pesan
            $text = "Ada pesan masuk dari halaman contact:\n\n"
                . "Nama: {$validatedData['name']}\n"
                . "Email: {$validatedData['email']}\n"
                . "Pesan:\n{$validatedData['message']}";

            // Kirim via API eksternal
            $response = Http::post(env('PROVIDER_API') . '/email/send', [
                'email' => env('MAIL_USERNAME'),
                'password' => env('MAIL_PASSWORD'),
                'to' => env('MAIL_FROM_ADDRESS'),
                'subject' => 'Pesan dari Formulir Kontak Website',
                'text' => $text,
            ]);

            if ($response->successful()) {
                return response()->json(['message' => 'Pesan berhasil dikirim!']);
            } else {
                Log::error('Gagal mengirim email:', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return response()->json(['message' => 'Gagal mengirim pesan.'], 500);
            }
        } catch (\Exception $e) {
            Log::error('Exception saat mengirim email:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Terjadi kesalahan saat mengirim pesan.'], 500);
        }
    }
}