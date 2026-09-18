<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// 1. Halaman Utama & Dashboard
Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin/items/create', [AdminController::class, 'create'])->middleware('auth')->name('admin.items.create');
Route::post('/admin/items/store', [AdminController::class, 'store'])->middleware('auth')->name('admin.items.store');

Route::get('/checkout/{id}/{qty}', [UserController::class, 'showCheckout'])->name('user.checkout');
Route::post('/checkout', [UserController::class, 'checkout'])->name('user.checkout.post');
Route::get('/katalog', [UserController::class, 'index'])->name('user.katalog');

require __DIR__.'/auth.php';

Route::get('/checkout-preview', [UserController::class, 'showCheckout'])->name('user.checkout.preview');
Route::post('/checkout-store', [UserController::class, 'checkout'])->name('user.checkout.store');

Route::get('/admin/categories', function () {
    return view('admin.manage-categories');
})->middleware('auth')->name('admin.categories');

Route::get('/admin/items', function () {
    return view('admin.items-list');
})->middleware('auth')->name('admin.items.list');