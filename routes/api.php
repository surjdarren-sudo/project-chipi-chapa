<?php

use App\Http\Controllers\Api\ItemApiController;
use App\Http\Controllers\Api\CategoryApiController;
use Illuminate\Support\Facades\Route;

// Items
Route::get('/items', [ItemApiController::class, 'index']);
Route::get('/items/{id}', [ItemApiController::class, 'show']);
Route::post('/items', [ItemApiController::class, 'store']);
Route::put('/items/{id}', [ItemApiController::class, 'update']);
Route::delete('/items/{id}', [ItemApiController::class, 'destroy']);

// Categories
Route::get('/categories', [CategoryApiController::class, 'index']);
Route::post('/categories', [CategoryApiController::class, 'store']);
Route::put('/categories/{id}', [CategoryApiController::class, 'update']);
Route::delete('/categories/{id}', [CategoryApiController::class, 'destroy']);