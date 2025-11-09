<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-900 text-white flex flex-col items-center py-10 min-h-screen">
  <h1 class="text-3xl font-bold mb-6">
    Welcome, {{ $user ? $user->name : 'Guest' }} 👋
  </h1>

  @auth
    <form method="POST" action="{{ route('logout') }}" class="mb-6">
      @csrf
      <button type="submit" class="bg-red-600 hover:bg-red-700 py-2 px-4 rounded">
        Logout
      </button>
    </form>

    <!-- Add Listing Button -->
    <button
      onclick="document.getElementById('addListingForm').classList.toggle('hidden')"
      class="bg-green-600 hover:bg-green-700 py-2 px-4 rounded mb-6">
      ➕ Add Listing
    </button>

    <!-- Add Listing Form -->
    <form id="addListingForm" method="POST" action="{{ route('listings.store') }}" class="hidden bg-gray-800 p-6 rounded w-full max-w-lg mb-10">
      @csrf
      <input type="text" name="title" placeholder="Title" class="w-full mb-2 p-2 rounded text-black" required>
      <textarea name="description" placeholder="Description" class="w-full mb-2 p-2 rounded text-black" required></textarea>
      <input type="number" name="price_per_night" placeholder="Price per night" class="w-full mb-2 p-2 rounded text-black" required>
      <input type="number" name="max_guests" placeholder="Max guests" class="w-full mb-2 p-2 rounded text-black" required>
      <input type="number" name="bedrooms" placeholder="Bedrooms" class="w-full mb-2 p-2 rounded text-black" required>
      <input type="number" name="bathrooms" placeholder="Bathrooms" class="w-full mb-2 p-2 rounded text-black" required>
      <input type="text" name="property_type" placeholder="Property type" class="w-full mb-2 p-2 rounded text-black" required>
      <input type="text" name="address" placeholder="Address" class="w-full mb-2 p-2 rounded text-black" required>
      <input type="text" name="city" placeholder="City" class="w-full mb-2 p-2 rounded text-black" required>
      <input type="text" name="country" placeholder="Country" class="w-full mb-2 p-2 rounded text-black" required>

      <button type="submit" class="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded w-full">
        Save Listing
      </button>
    </form>

    <!-- Listings -->
    <div class="grid gap-4 w-full max-w-4xl">
      @forelse($listings as $listing)
        <div class="bg-gray-800 p-4 rounded shadow">
          <h2 class="text-xl font-bold">{{ $listing->title }}</h2>
          <p class="text-gray-400">{{ $listing->description }}</p>
          <p class="mt-2 text-sm">💰 {{ $listing->price_per_night }} DZD / night</p>
          <p class="text-sm">📍 {{ $listing->city }}, {{ $listing->country }}</p>
        </div>
      @empty
        <p>No listings yet.</p>
      @endforelse
    </div>
  @else
    <div class="flex gap-4">
      <a href="{{ route('login') }}" class="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded">Login</a>
      <a href="{{ route('register') }}" class="bg-green-600 hover:bg-green-700 py-2 px-4 rounded">Register</a>
    </div>
  @endauth
</body>
</html>
