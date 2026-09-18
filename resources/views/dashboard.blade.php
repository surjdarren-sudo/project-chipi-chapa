<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    @viteReactRefresh
    @vite(['resources/js/dashboardStats.jsx'])

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <p class="text-gray-600 mb-6">{{ __("You're logged in! Berikut ringkasan data toko kamu.") }}</p>

                <div id="dashboard-stats-root"></div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <a href="{{ route('admin.items.list') }}" class="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg">
                        📦 Lihat Daftar Barang
                    </a>
                    <a href="{{ route('admin.items.create') }}" class="block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg">
                        ➕ Tambah Barang
                    </a>
                    <a href="{{ route('admin.categories') }}" class="block text-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-6 rounded-lg">
                        🏷️ Kelola Kategori
                    </a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>