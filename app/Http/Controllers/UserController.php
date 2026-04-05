<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Invoice; 
use Illuminate\Http\Request;
use Illuminate\Support\Str; 

class UserController extends Controller
{
    public function index()
    {
        // Mengambil semua barang + kategorinya (Eager Loading)
        $items = Item::with('category')->get();
        
        // Mengirim data ke view menggunakan compact
        return view('user.katalog', compact('items'));
    }

    // Fungsi checkout harus ada DI DALAM kurung kurawal Class
    public function checkout(Request $request)
    {
       
        $request->validate([
            'address' => 'required|min:10|max:100',
            'postal_code' => 'required|digits:5',
        ]);

       
        $item = Item::find($request->item_id);
        
 
        $total = $item->price * $request->quantity;

        
        $invoice = Invoice::create([
            'user_id' => auth()->id(),
            'invoice_number' => 'INV-' . strtoupper(Str::random(8)),
            'address' => $request->address,
            'postal_code' => $request->postal_code,
            'total_price' => $total,
        ]);

       
        $item->decrement('quantity', $request->quantity);

        return redirect()->route('user.katalog')->with('success', 'Pesanan Berhasil! Nomor Faktur: ' . $invoice->invoice_number);
    }
    public function showCheckout(Request $request)
{
  
    $item = Item::findOrFail($request->item_id);
    $quantity = $request->qty;

   
    return view('user.checkout', compact('item', 'quantity'));
}
}