<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
public function run(): void
    {
        // Create the test user if it doesn't exist
        User::firstOrCreate(
            ['email' => 'test@example.com'], // search criteria
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'phone' => '0000000000',
            ]
        );

        // Call your other seeders
        $this->call([
            UserListingSeeder::class,
        ]);
    }
}
