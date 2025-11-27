<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Contracts\Auth\Factory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{

public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials.'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        Log::info('User logged in.', ['id' => $user->id,'email'=>$user->email,'ip'=>$request->ip(),'user_agent' => request()->userAgent()]);
        return response()->json([
           'message' => 'Login successful',
           'user' => [
           'id' => $user->id,
           'name' => $user->name,
           'email' => $user->email,
    ],
    'token' => $token,
], 200);
    }

public function logout(Request $request)
{
    $user = $request->user();

    if ($user && $user->currentAccessToken() && !($user->currentAccessToken() instanceof \Laravel\Sanctum\TransientToken)) {
    Log::info('User logged out .', ['id' => $user->id,'email'=>$user->email,'ip'=>$request->ip(),'user_agent' => request()->userAgent()]);
        $user->currentAccessToken()->delete();
        return response()->json(['message' => 'API token revoked successfully']);
    }

    return response()->json(['message' => 'No authenticated user'], 401);
}
}
