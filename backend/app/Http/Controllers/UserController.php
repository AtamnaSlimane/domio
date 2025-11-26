<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Listing;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
public function index(Request $request){
$user=Auth::user();
return response()->json($user);
}
public function update(Request $request){
$user=Auth::user();
$validated = $request->validate([
    'name' => ['sometimes', 'string', 'max:255'],
    'email' => ['sometimes', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
    'password' => ['nullable', 'string', 'min:8', 'confirmed'],
    'phone' => ['sometimes', 'string', 'max:20', 'unique:users,phone,' . $user->id],
]);
// Fill only provided fields
        $user->fill(
            collect($validated)
                ->except('password') // handle password separately
                ->toArray()
        );

        // Hash password if provided
        if (filled($validated['password'] ?? null)) {
            $user->password = Hash::make($validated['password']);
        }
$user->save();
return response()->json([
        'message' => 'User updated successfully',
        'user' => $user,
    ], 200);

}
}
