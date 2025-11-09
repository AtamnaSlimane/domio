<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UserController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => $request->user());

    Route::post('/logout', [LoginController::class, 'logout']);

    // Protected routes (require token)
    Route::get('/home', [UserController::class, 'index']); //fetch all listings
    Route::post('/create-list', [UserController::class, 'store']); // create a listing
});
#public routes
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
