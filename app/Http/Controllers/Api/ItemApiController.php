<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemApiController extends Controller
{
    // GET /api/items
    public function index()
    {
        $items = Item::with('category')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar barang berhasil dimuat',
            'data' => $items,
        ], 200);
    }

    // GET /api/items/{id}
    public function show($id)
    {
        $item = Item::with('category')->find($id);

        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Barang tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $item,
        ], 200);
    }

    // POST /api/items
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:80',
            'price' => 'required|integer',
            'quantity' => 'required|integer',
        ]);

        $item = Item::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Barang baru berhasil disimpan via API',
            'data' => $item,
        ], 201);
    }
}