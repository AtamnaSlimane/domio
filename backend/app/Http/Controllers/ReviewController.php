<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReviewController extends Controller
{
    public function index($listing_id){
        $listing=Listing::find($listing_id);
        if (!$listing) {
         return response()->json(['message' => 'Listing doesnt exist'], 404);
        }
        $reviews=Review::where('listing_id',$listing_id)->get();

        if ($reviews->isEmpty()) {
         return response()->json(['message' => 'NO Reviews yet'], 404);
        }
     return response()->json(['reviews'=>$reviews],200);
    }

    public function store(Request $request,$listing_id){
    $listing=Listing::find($listing_id);
    if (!$listing) {
         return response()->json(['message' => 'Listing doesnt exist'], 404);
        }
        $validated=$request->validate([
            'rating'=>'required|integer|min:1|max:5',
            'comment'=>'nullable|string|max:200',
        ]);
        $exists = Review::where('listing_id', $listing_id)->where('user_id',auth()->id())->exists();
        if ($exists) {
        return response()->json(['message'=>"You have already reviewed this listing "],409);
        }

        Review::create([
            'listing_id' => $listing_id,
            'user_id' => auth()->id(),
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
        ]);
        Log::info('User reviewed .', ['id' => auth()->id(),'listing_id' => $listing->id,'rating'=>$validated['rating'],'ip'=>$request->ip(),'user_agent' => request()->userAgent()]);
     return response()->json(['message'=>"Review added succefully"],201);
    }
public function edit(Request $request,$listing_id){
    $listing=Listing::find($listing_id);
       if (!$listing) {
         return response()->json(['message' => 'Listing doesnt exist'], 404);
        }

       $review = Review::where('listing_id', $listing_id)
                        ->where('user_id', auth()->id())
                        ->first();
       if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }
       $validated=$request->validate([
            'rating'=>'required|integer|min:1|max:5',
            'comment'=>'nullable|string|max:200',
        ]);

        $review->update([
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
        ]);
        Log::info('User edited a review .', ['id' => auth()->id(),'listing_id' => $listing->id,'rating'=>$validated['rating'],'ip'=>$request->ip(),'user_agent' => request()->userAgent()]);
     return response()->json(['message'=>"Review edited succefully"],200);
    }
    public function destroy(Request $request,$listing_id){
        $review=Review::where('listing_id',$listing_id)->where('user_id',auth()->id())->first();
        $listing=Listing::find($listing_id);
        if (!$review) {
         return response()->json(['message' => 'Review not found'], 404);
        }
        $review->delete();
        Log::info('User deleted a review .', ['id' => auth()->id(),'listing_id' => $listing->id,'ip'=>$request->ip(),'user_agent' => request()->userAgent()]);
     return response()->json(['message'=>"Review deleted succefully"],201);
    }
}
