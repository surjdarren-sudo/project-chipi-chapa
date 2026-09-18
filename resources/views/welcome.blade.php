<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Project Pertama Darren</title>
    <style>
        * { box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', sans-serif;
            margin: 0;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #06b6d4 0%, #2563eb 60%, #1d4ed8 100%);
            padding: 24px;
        }

        .topbar {
            position: fixed;
            top: 0; left: 0; right: 0;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            padding: 20px 28px;
        }
        .topbar a {
            padding: 8px 20px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            font-size: 14px;
        }
        .btn-login { background: rgba(255,255,255,0.9); color: #1d4ed8; }
        .btn-register { background: #1e293b; color: white; }

        .card {
            background: #f8fbff;
            padding: 48px 40px;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.25);
            text-align: center;
            max-width: 480px;
            width: 100%;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #dbeafe;
            color: #1d4ed8;
            font-size: 13px;
            font-weight: bold;
            padding: 6px 16px;
            border-radius: 999px;
            margin-bottom: 20px;
        }
        .badge .dot {
            width: 6px;
            height: 6px;
            background: #2563eb;
            border-radius: 50%;
            display: inline-block;
        }

        h1 {
            font-size: 28px;
            color: #0f172a;
            margin: 0;
            line-height: 1.3;
        }
        h1 .highlight { color: #2563eb; }

        .desc {
            color: #475569;
            font-size: 15px;
            margin: 16px 0 20px;
            line-height: 1.5;
        }
        .desc strong { color: #1e293b; }

        .quote {
            background: white;
            border: 1px solid #dbeafe;
            color: #2563eb;
            font-size: 14px;
            font-weight: 600;
            padding: 12px 16px;
            border-radius: 10px;
            margin-bottom: 24px;
        }

        .menu {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .menu a {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 14px 20px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: bold;
            font-size: 15px;
            color: white;
            transition: transform 0.1s;
        }
        .menu a:hover { transform: translateY(-2px); }
        .btn-items { background: #2563eb; }
        .btn-add { background: #059669; }
        .btn-categories { background: #1e293b; }

        .guest-note {
            color: #475569;
            font-size: 14px;
            margin-top: 8px;
        }
        .guest-note a { color: #2563eb; font-weight: bold; text-decoration: none; }
    </style>
</head>
<body>
    <div class="topbar">
        @auth
            <a class="btn-login" href="{{ route('dashboard') }}">Dashboard</a>
        @else
            <a class="btn-login" href="{{ route('login') }}">Login</a>
            <a class="btn-register" href="{{ route('register') }}">Register</a>
        @endauth
    </div>

    <div class="card">
        <span class="badge"><span class="dot"></span> Perusahaan Chipi Chapa</span>

        <h1>Halo, Selamat datang ke<br><span class="highlight">website chipi chapa</span></h1>

        <p class="desc">
            Ini adalah sebuah website untuk update stok penjualan <strong>dari perusahaan-chipi-chapa</strong> 🚀
        </p>

        <div class="quote">Semoga bisa tercapai target stock tepat waktu</div>

        @auth
            <div class="menu">
                <a class="btn-items" href="{{ route('admin.items.list') }}">📦 Lihat Daftar Barang</a>
                <a class="btn-add" href="{{ route('admin.items.create') }}">➕ Tambah Barang</a>
                <a class="btn-categories" href="{{ route('admin.categories') }}">🏷️ Kelola Kategori</a>
            </div>
        @else
            <p class="guest-note">Silakan <a href="{{ route('login') }}">login</a> untuk mengakses fitur.</p>
        @endauth
    </div>
</body>
</html>