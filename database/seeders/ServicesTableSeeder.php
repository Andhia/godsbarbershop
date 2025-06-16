<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{
    public function run()
    {
        // Menambahkan beberapa layanan ke dalam tabel services
        Service::create([
            'name' => 'Haircut',
            'price' => 50000,  // Harga dalam IDR
            'description' => 'Potong rambut sesuai dengan model dan keinginan Anda.',
        ]);

        Service::create([
            'name' => 'Shave',
            'price' => 30000,
            'description' => 'Pencukuran jenggot dan kumis menggunakan pisau cukur berkualitas.',
        ]);

        Service::create([
            'name' => 'Hair Coloring',
            'price' => 150000,
            'description' => 'Pewarnaan rambut dengan warna terbaru dan bahan berkualitas.',
        ]);

        Service::create([
            'name' => 'Beard Grooming',
            'price' => 60000,
            'description' => 'Perawatan jenggot dan kumis untuk penampilan yang lebih rapi.',
        ]);
    }
}
