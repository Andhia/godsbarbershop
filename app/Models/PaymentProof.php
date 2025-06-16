<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentProof extends Model
{
    protected $fillable = ['booking_id', 'proof_image'];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}
