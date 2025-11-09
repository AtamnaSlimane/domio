<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Listing;

class UserListingSeeder extends Seeder
{
    public function run()
    {
        #change this value for users and listings count
        $x=10;
        User::factory($x)->create()->each(function ($user) {
            #create one listing per user
            Listing::factory()->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
