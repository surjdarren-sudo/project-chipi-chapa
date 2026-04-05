<?php

namespace App\Http\Controllers;

// Bagian "use" harus di luar class dan pakai kata 'use', bukan di dalam
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Category;

class AdminController extends Controller
{
    // Fungsi untuk menampilkan form
    public function create() {
        $categories = Category::all(); 
        return view('admin.create_item', compact('categories'));
    }

    // Fungsi untuk memproses simpan barang
    public function store(Request $request){
        // 1. Validasi 
        $request->validate([
            'category_id' => 'required',
            'name' => 'required|min:5|max:80',
            'price' => 'required|integer',
            'quantity' => 'required|integer',
            'image' => 'required|image|mimes:jpeg,png,jpg'
        ]);

        // 2. Proses Foto (Tadi ada salah ketik di simbol -> dan tanda kutip)
        $extension = $request->file('image')->getClientOriginalExtension();
        $fileName = time() . '.' . $extension;
        $request->file('image')->storeAs('public/items', $fileName);
        
        // 3. Simpan ke Database
        Item::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'image' => $fileName,
        ]);

        return redirect()->back()->with('success', 'Barang berhasil ditambahkan');
    }
}