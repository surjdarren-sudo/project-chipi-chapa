<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Pertama Darren - Perusahaan Chipi Chapa</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts (Inter) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-cyan-500 via-sky-600 to-blue-700 min-h-screen flex items-center justify-center p-4">

    <!-- Container Utama / Card -->
    <div class="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl text-center space-y-6 border border-white/20 relative overflow-hidden">
        
        <!-- Hiasan Ornamen Background -->
        <div class="absolute -top-12 -right-12 w-32 h-32 bg-sky-200/50 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-300/40 rounded-full blur-2xl pointer-events-none"></div>

        <!-- Header Status Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide">
            <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Perusahaan Chipi Chapa
        </div>

        <!-- Konten Ucapan & Teks -->
        <div class="space-y-3">
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-snug">
                Halo, Selamat datang ke <br>
                <span class="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    website chipi chapa
                </span>
            </h1>
            
            <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
                Ini adalah sebuah website untuk update stok penjualan <strong>dari perusahaan-chipi-chapa</strong> 🚀
            </p>

            <p class="text-xs sm:text-sm font-medium text-sky-700 bg-sky-50 py-2 px-3 rounded-xl border border-sky-100 inline-block">
                Semoga bisa tercapai target stock tepat waktu
            </p>
        </div>

        <!-- Menu Tombol Navigasi (Sesuai Route Bawaan) -->
        <div class="flex flex-col gap-3 pt-2">
            <!-- Link 1: Lihat Daftar Barang -->
            <a href="{{ route('admin.items.list') }}" 
               class="flex items-center justify-center gap-2.5 px-5 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/25 transition-all duration-200 transform hover:-translate-y-0.5">
                <span class="text-lg">📦</span>
                <span>Lihat Daftar Barang</span>
            </a>

            <!-- Link 2: Tambah Barang -->
            <a href="{{ route('admin.items.create') }}" 
               class="flex items-center justify-center gap-2.5 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/25 transition-all duration-200 transform hover:-translate-y-0.5">
                <span class="text-lg">➕</span>
                <span>Tambah Barang</span>
            </a>

            <!-- Link 3: Kelola Kategori -->
            <a href="{{ route('admin.categories') }}" 
               class="flex items-center justify-center gap-2.5 px-5 py-3 bg-slate-800 hover:bg-slate-900 active:bg-black text-white font-semibold rounded-2xl shadow-lg shadow-slate-800/20 transition-all duration-200 transform hover:-translate-y-0.5">
                <span class="text-lg">🏷️</span>
                <span>Kelola Kategori</span>
            </a>
        </div>

    </div>

</body>
</html>