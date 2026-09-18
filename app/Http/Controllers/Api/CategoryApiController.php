<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryApiController extends Controller
{
    // GET /api/categories?search=...
    public function index(Request $request)
    {
        $query = Category::query();

        if ($request->has('search') && $request->search !== '') {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $categories = $query->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ], 200);
    }

    // POST /api/categories
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:80',
        ]);

        $category = Category::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Kategori berhasil ditambahkan',
            'data' => $category,
        ], 201);
    }

    // PUT /api/categories/{id}
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori tidak ditemukan',
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:80',
        ]);

        $category->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Kategori berhasil diupdate',
            'data' => $category,
        ], 200);
    }

    // DELETE /api/categories/{id}
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori tidak ditemukan',
            ], 404);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Kategori berhasil dihapus',
        ], 200);
    }
}