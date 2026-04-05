<x-app-layout>
    <div class="py-12">
        <div class="max-w-2xl mx-auto bg-white p-10 shadow-lg border-t-8 border-blue-600 rounded">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold uppercase">Faktur Pembelian</h1>
                <p class="text-gray-500">PT ChipiChapa Indonesia</p>
            </div>

            <div class="flex justify-between mb-6">
                <div>
                    <p class="text-sm text-gray-600">Nomor Faktur:</p>
                    <p class="font-bold">{{ $invoice->invoice_number }}</p>
                </div>
                <div class="text-right">
                    <p class="text-sm text-gray-600">Tanggal:</p>
                    <p class="font-bold">{{ $invoice->created_at->format('d M Y') }}</p>
                </div>
            </div>

            <div class="border-b-2 border-gray-100 pb-4 mb-4">
                <p class="text-sm text-gray-600 italic">Alamat Pengiriman:</p>
                <p>{{ $invoice->address }}</p>
                <p>Kode Pos: <strong>{{ $invoice->postal_code }}</strong></p>
            </div>

            <div class="flex justify-between font-bold text-xl mt-6 p-4 bg-blue-50">
                <span>Total Pembayaran:</span>
                <span class="text-blue-700">Rp{{ number_format($invoice->total_price, 0, ',', '.') }}</span>
            </div>

            <div class="mt-10 text-center">
                <a href="{{ route('user.katalog') }}" class="text-blue-500 hover:underline">← Kembali Belanja</a>
            </div>
        </div>
    </div>
</x-app-layout>