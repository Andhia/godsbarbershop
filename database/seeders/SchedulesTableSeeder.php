<?php

namespace Database\Seeders;

use App\Models\Schedule;
use Illuminate\Database\Seeder;

class SchedulesTableSeeder extends Seeder
{
    public function run()
    {
        // Menambahkan beberapa jadwal ke dalam tabel schedules
        Schedule::create([
            'time_range' => '11:00 - 14:00',
            'status' => false, // Belum terisi
        ]);

        Schedule::create([
            'time_range' => '14:30 - 18:00',
            'status' => false,
        ]);

        Schedule::create([
            'time_range' => '18:30 - 21:00',
            'status' => false,
        ]);
    }
}
