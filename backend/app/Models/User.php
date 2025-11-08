<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{
    use HasFactory, Notifiable,HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'avatar_url',
        'bio',
    ];

    protected $hidden = ['password', 'remember_token'];

    //  Relationships
    public function listings()
    {
        return $this->hasMany(Listing::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function favorites()
    {
        return $this->belongsToMany(Listing::class, 'favorites');
    }
}
