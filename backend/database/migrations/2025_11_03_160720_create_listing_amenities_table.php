<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('listing_amenities', function (Blueprint $table) {
            $table->foreignId('listing_id')->constrained()->onDelete('cascade');
            $table->foreignId('amenity_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->primary(['listing_id', 'amenity_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('listing_amenities');
    }
};
