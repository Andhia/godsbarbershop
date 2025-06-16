<?php

namespace App\Http\Controllers;

use App\Models\Cutter;
use App\Models\Service;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentController extends Controller
{
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

    public function about()
    {
        $cutters = Cutter::all();

        return Inertia::render('About', [
            'cutters' => $cutters
        ]);
    }

    public function service()
    {
        $services = Service::all();

        return Inertia::render('Service', [
            'services' => $services
        ]);
    }
}
