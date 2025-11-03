<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'price_per_night',
        'max_guests',
        'bedrooms',
        'bathrooms',
        'property_type',
        'address',
        'city',
        'country',
        'latitude',
        'longitude',
        'status',
    ];

    // 🧩 Relationships
    public function host()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function photos()
    {
        return $this->hasMany(ListingPhoto::class);
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'listing_amenities');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }
}
