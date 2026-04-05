<x-app-layout>
    <div class="py-12">
        <div class="max-w-2xl mx-auto bg-white p-8 shadow rounded border-t-4 border-blue-500">
            <h2 class="text-2xl font-bold mb-6">Konfirmasi Pesanan & Alamat</h2>
            
            <form action="{{ route('user.checkout.post') }}" method="POST">
                @csrf
                <input type="hidden" name="item_id" value="{{ $item->id }}">
                <input type="hidden" name="quantity" value="{{ $quantity }}">

                <div class="mb-4">
                    <label class="block font-bold">Alamat Pengiriman (10-100 Karakter)</label>
                    <textarea name="address" class="w-full border-gray-300 rounded shadow-sm" placeholder="Contoh: Jalan Citra 3 No. 12, Cengkareng, Jakarta Barat" required></textarea>
                    @error('address') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
                </div>

                <div class="mb-4">
                    <label class="block font-bold">Kode Pos (5 Digit)</label>
                    <input type="text" name="postal_code" class="w-full border-gray-300 rounded shadow-sm" placeholder="11830" required>
                    @error('postal_code') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
                </div>

                <div class="p-4 bg-blue-50 rounded mb-6 border border-blue-100">
                    <p class="text-sm">Anda membeli: <strong>{{ $item->name }}</strong></p>
                    <p class="text-sm">Jumlah: <strong>{{ $quantity }} Pcs</strong></p>
                    <p class="text-lg font-bold text-blue-700">Total: Rp{{ number_format($item->price * $quantity, 0, ',', '.') }}</p>
                </div>

                <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg transition">
                    Konfirmasi & Simpan Faktur
                </button>
            </form>
        </div>
    </div>
</x-app-layout>