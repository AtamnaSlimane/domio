<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Listing;


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

       # return redirect()->route('home')->with('success', 'Listing added successfully!');
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
}
