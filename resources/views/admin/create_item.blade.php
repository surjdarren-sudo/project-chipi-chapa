<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Tambah Barang Baru - Admin') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                
                <form action="{{ route('admin.items.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="mb-4">
                        <label class="block font-bold">Nama Barang</label>
                        <input type="text" name="name" minlength="5" maxlength="80" class="w-full border-gray-300 rounded shadow-sm" placeholder="Contoh: Bakmi Ayam Spesial" required>
                    </div>

                    <div class="mb-4">
                        <label class="block font-bold">Harga Barang</label>
                        <div class="flex items-center">
                            <span class="mr-2 py-2 px-3 bg-gray-100 border border-r-0 rounded-l">Rp.</span>
                            <input type="number" name="price" class="w-full border-gray-300 rounded-r shadow-sm" placeholder="Contoh: 25000" required>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="block font-bold">Jumlah Barang</label>
                        <input type="number" name="quantity" class="w-full border-gray-300 rounded shadow-sm" placeholder="Jumlah stok" required>
                    </div>

                    <div class="mb-4">
                        <label class="block font-bold">Foto Barang</label>
                        <input type="file" name="image" class="w-full border-gray-300 rounded shadow-sm" required>
                    </div>

                    <div class="flex items-center justify-end mt-4">
                        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                            Simpan ke Database
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>
