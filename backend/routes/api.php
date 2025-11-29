<?php

use App\Models\Listing;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ReviewController;

Route::middleware('auth:sanctum')->group(function () {
    //get user info
    Route::get('/user', [UserController::class, 'index']);
    //can only change 5 times in 60 minutes
    Route::patch('/user', [UserController::class, 'update'])
     ->middleware('throttle:5,60');
    Route::post('/logout', [LoginController::class, 'logout']);
    // Protected routes (require token)
    Route::post('/listings', [ListingController::class, 'store']) // create a listing
     ->middleware('throttle:5,60');
    Route::get('/listings/mine', [ListingController::class, 'myListings']); // show the user own listings
    Route::get('/listings/{listing_id}', [ListingController::class, 'show']);//show single listing
    Route::delete('/listings/{listing_id}', [ListingController::class, 'destroy']); // delete a listing
    Route::get('/listings/favorites', [FavoriteController::class,'index']); // show the user own favorite listings
    Route::post('/listings/favorites/{listing_id}', [FavoriteController::class,'store'])//add favorite listing
     ->middleware('throttle:20,1');
    Route::delete('/listings/favorites/{listing_id}', [FavoriteController::class,'destroy'])//remove favorite listing
     ->middleware('throttle:20,1');

    //reviews routes
    Route::get('/listings/reviews/{listing_id}', [ReviewController::class,'index']); // listing reviews
    Route::post('/listings/reviews/{listing_id}', [ReviewController::class,'store']); // create a Review
    Route::patch('/listings/reviews/{listing_id}', [ReviewController::class,'edit']); // edit a Review
    Route::delete('/listings/reviews/{listing_id}', [ReviewController::class,'destroy']); // delete a review
});
#public routes
Route::post('/login', [LoginController::class, 'login'])
     ->middleware('throttle:5,60');
Route::post('/register', [RegisterController::class, 'register'])
     ->middleware('throttle:5,60');
Route::get('/listings', [ListingController::class, 'index']) //fetch all listings
     ->middleware('throttle:120,1');

