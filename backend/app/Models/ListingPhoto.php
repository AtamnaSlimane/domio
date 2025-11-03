<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ListingPhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'url',
        'is_cover',
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
}
