<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-900 text-white flex flex-col justify-center items-center h-screen">
  <h1 class="text-3xl font-bold mb-4">Welcome, {{ Auth::user()->name ?? 'Guest' }} 👋</h1>

  @auth
    <form method="POST" action="{{ route('logout') }}">
      @csrf
      <button type="submit" class="bg-red-600 hover:bg-red-700 py-2 px-4 rounded">
        Logout
      </button>
    </form>
  @else
    <div class="flex gap-4">
      <a href="{{ route('login') }}" class="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded">Login</a>
      <a href="{{ route('register') }}" class="bg-green-600 hover:bg-green-700 py-2 px-4 rounded">Register</a>
    </div>
  @endauth
</body>
</html>
