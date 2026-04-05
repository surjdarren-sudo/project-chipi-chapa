<<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Katalog Produk PT ChipiChapa') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                @foreach($items as $item)
                <div class="bg-white p-6 shadow-sm sm:rounded-lg border">
                    <img src="{{ asset('storage/items/' . $item->image) }}" class="w-full h-48 object-cover rounded mb-4">
                    
                    <span class="text-xs font-bold text-blue-500 uppercase">{{ $item->category->name }}</span>
                    <h3 class="text-lg font-bold">{{ $item->name }}</h3>
                    
                    <p class="text-red-600 font-bold">Rp{{ number_format($item->price, 0, ',', '.') }}</p>
                    <p class="text-sm text-gray-500">Tersisa: {{ $item->quantity }} pcs</p>

                    @if($item->quantity <= 0)
                        <p class="text-red-500 text-xs mt-2 italic font-bold">Barang sudah habis, silakan tunggu hingga barang di-restock ulang</p>
                    @else
                        <button class="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                            Tambah ke Faktur
                        </button>
                    @endif
                </div>
                @endforeach
            </div>
        </div>
    </div>
</x-app-layout>
<form action="{{ route('user.checkout.preview') }}" method="GET">
    <input type="hidden" name="item_id" value="{{ $item->id }}">
    <div class="mb-2">
        <label class="text-xs">Jumlah Beli:</label>
        <input type="number" name="qty" value="1" min="1" max="{{ $item->quantity }}" class="w-full border-gray-300 rounded text-sm">
    </div>
    <button type="submit" class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Beli & Cetak Faktur
    </button>
</form>
<form action="{{ route('user.checkout.preview') }}" method="GET" class="mt-4">
    <input type="hidden" name="item_id" value="{{ $item->id }}">
    
    <div class="mb-2">
        <label class="text-xs text-gray-600 font-bold">Jumlah Beli:</label>
        <input type="number" name="qty" value="1" min="1" max="{{ $item->quantity }}" 
               class="w-full border-gray-300 rounded text-sm shadow-sm focus:border-blue-500" required>
    </div>

    @if($item->quantity <= 0)
        <p class="text-red-500 text-xs italic font-bold">Barang sudah habis, silakan tunggu hingga barang di-restock ulang</p>
    @else
        <button type="submit" class="w-full bg-green-500 text-white py-2 rounded font-bold hover:bg-green-600 transition shadow-md">
            Beli & Cetak Faktur
        </button>
    @endif
</form>