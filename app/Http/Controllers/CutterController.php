<?php

namespace App\Http\Controllers;

use App\Models\Cutter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CutterController extends Controller
{
    /**
     * Tampilkan daftar cutter.
     */
    public function index()
    {
        $cutters = Cutter::withTrashed()->get();
        return Inertia::render('Admin/Cutters/Index', [
            'cutters' => $cutters
        ]);
    }

    /**
     * Tampilkan form tambah cutter.
     */
    public function create()
    {
        return Inertia::render('Admin/Cutters/Create');
    }

    /**
     * Simpan cutter baru ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
        ]);

        $data = $request->only('name');

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('cutters', 'public');
        }

        Cutter::create($data);

        return redirect()->route('cutters.index');
    }

    /**
     * Tampilkan form edit cutter.
     */
    public function edit(Cutter $cutter)
    {
        return Inertia::render('Admin/Cutters/Edit', [
            'cutter' => $cutter
        ]);
    }

    /**
     * Perbarui cutter di database.
     */
    public function update(Request $request, Cutter $cutter)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
        ]);

        $data = $request->only('name');

        if ($request->hasFile('image')) {
            if ($cutter->image) {
                Storage::disk('public')->delete($cutter->image);
            }

            $data['image'] = $request->file('image')->store('cutters', 'public');
        }


        $cutter->update($data);

        return redirect()->route('cutters.index');
    }

    /**
     * Soft delete cutter dari database.
     */
    public function destroy(Cutter $cutter)
    {
        $cutter->delete();

        return redirect()->route('cutters.index')->with('success', 'Cutter berhasil dihapus.');
    }

    /**
     * Restore cutter yang sudah dihapus.
     */
    public function restore($id)
    {
        $cutter = Cutter::withTrashed()->findOrFail($id);
        $cutter->restore();

        return redirect()->route('cutters.index');
    }

    /**
     * Hapus permanen cutter.
     */
    public function forceDelete($id)
    {
        $cutter = Cutter::withTrashed()->findOrFail($id);

        if ($cutter->image) {
            Storage::disk('public')->delete($cutter->image);
        }

        $cutter->forceDelete();

        return redirect()->route('cutters.index')->with('success', 'Cutter berhasil dihapus permanen.');
    }
}