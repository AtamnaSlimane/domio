<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UserController;

Route::get('/register', function () {
    return view('Auth.register');
})->name('register');
Route::get('/', [UserController::class, 'index'])->name('home');

Route::middleware('auth')->group(function () {
    Route::post('/listings', [UserController::class, 'store'])->name('listings.store');
});
Route::post('/register', [RegisterController::class, 'register'])->name('register.post');
Route::get('/login', fn() => view('Auth.login'))->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout'])->name('logout');
