<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;

Route::get('/home', function () {
    return view('home');
})->name('home');

Route::get('/register', function () {
    return view('Auth.register');
})->name('register');

Route::post('/register', [RegisterController::class, 'register'])->name('register.post');
Route::get('/login', fn() => view('Auth.login'))->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
