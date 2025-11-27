<?php

use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FavoriteController;

Route::middleware('auth:sanctum')->group(function () {
    //get user info
    Route::get('/user', [UserController::class, 'index']);
    //can only change 5 times in 60 minutes
    Route::patch('/user', [UserController::class, 'update'])
     ->middleware('throttle:5,60');
    Route::post('/logout', [LoginController::class, 'logout']);
    // Protected routes (require token)
    Route::post('/listings', [ListingController::class, 'store']); // create a listing
    Route::get('/listings/mine', [ListingController::class, 'myListings']); // show the user own listings
    Route::delete('/listings/{listing_id}', [ListingController::class, 'destroy']); // delete a listing
    Route::get('/listings/favorites', [FavoriteController::class,'index']); // show the user own favorite listings
    Route::post('/listings/favorites/{listing_id}', [FavoriteController::class,'store']);
    Route::delete('/listings/favorites/{listing_id}', [FavoriteController::class,'destroy']);
});
#public routes
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::get('/listings', [ListingController::class, 'index']); //fetch all listings
