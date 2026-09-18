// PUT /api/items/{id}
public function update(Request $request, $id)
{
    $item = Item::find($id);

    if (!$item) {
        return response()->json([
            'success' => false,
            'message' => 'Barang tidak ditemukan',
        ], 404);
    }

    $validated = $request->validate([
        'category_id' => 'required|exists:categories,id',
        'name' => 'required|string|min:5|max:80',
        'price' => 'required|integer',
        'quantity' => 'required|integer',
        'image' => 'nullable|image|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('items', 'public');
        $validated['image'] = $path;
    }

    $item->update($validated);

    return response()->json([
        'success' => true,
        'message' => 'Barang berhasil diupdate',
        'data' => $item,
    ], 200);
}

// DELETE /api/items/{id}
public function destroy($id)
{
    $item = Item::find($id);

    if (!$item) {
        return response()->json([
            'success' => false,
            'message' => 'Barang tidak ditemukan',
        ], 404);
    }

    $item->delete();

    return response()->json([
        'success' => true,
        'message' => 'Barang berhasil dihapus',
    ], 200);
}