<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Laravel\Sanctum\HasApiTokens;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests,HasApiTokens,HasFactory;
}
