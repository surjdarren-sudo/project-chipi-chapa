<?php

use App\Http\Controllers\Api\ItemApiController;
use Illuminate\Support\Facades\Route;

Route::get('/items', [ItemApiController::class, 'index']);
Route::get('/items/{id}', [ItemApiController::class, 'show']);
Route::post('/items', [ItemApiController::class, 'store']);