<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request){
    return response()->json([
          'favoritelistings' =>$favoritelistings=auth()->user()->favorites,
        ], 200);
    }
    public function store(Request $request,$listing_id){
    auth()->user()->favorites()->syncWithoutDetaching($listing_id);
     return response()->json([
        'message' => 'Listing added to favorites.'
    ], 201);
    }
    public function destroy(Request $request,$listing_id){
    auth()->user()->favorites()->detach($listing_id);
     return response()->json([
        'message' => 'Listing removed from favorites.'
    ], 201);
    }
}
