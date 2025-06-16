<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'description', 'image'];

    // Relationship: A service can have many bookings
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
