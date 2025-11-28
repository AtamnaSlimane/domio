<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Listing;
use Illuminate\Support\Facades\Log;


class ListingController extends Controller
{
    //
public function index(Request $request){
$listings=Listing::paginate(9);
return response()->json($listings);
#return view('home', compact('user', 'listings'));
}
 public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price_per_night' => 'required|numeric',
            'max_guests' => 'required|integer',
            'bedrooms' => 'required|integer',
            'bathrooms' => 'required|integer',
            'property_type' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'country' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'status' => 'nullable|string',
        ]);

        $validated['user_id'] = Auth::id();

        $listing=Listing::create($validated);
        $user=Auth::user();
        Log::info('User made listing .', ['id' => $user->id,'listing_id' => $listing->id,'email'=>$user->email,'ip'=>$request->ip(),'user_agent' => request()->userAgent()]);
        return response()->json([
           'message' => 'Listing added successfully!',
          'listing' => $listing,
        ], 201);
    }
    public function myListings(Request $request){
     return response()->json([
          'mylistings' =>$myListings = auth()->user()->listings,
        ], 200);

    }
public function show(Request $request,$listing_id){
        $listing=Listing::find($listing_id);
        if (!$listing) {
         return response()->json(['message' => 'Listing not found'], 403);
        }
     return response()->json($listing);

    }
 public function destroy(Request $request,$listing_id){
$user=Auth::user();
        $listing=Listing::find($listing_id);
        if (!$listing) {
         return response()->json(['message' => 'Listing not found'], 404);
        }
        if($listing->user_id!=auth()->id()){
         return response()->json(['message' => 'Unauthorized'], 403);
        }
        $listing->delete();
        Log::info('User deleted listing .', ['id' => $user->id,'listing_id' => $listing->id,'email'=>$user->email,'ip'=>$request->ip(),'user_agent' => request()->userAgent()]);
     return response()->json([
        'message' => 'Listing is deleted successfully.'
    ], 200);

    }
}
