<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = ['time_range', 'status']; // time_range example: '11:00-12:00'

    // Relationship: Schedule has many bookings
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
