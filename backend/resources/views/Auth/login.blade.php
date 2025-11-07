<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-900 text-white flex justify-center items-center h-screen">
  <div class="w-full max-w-sm bg-gray-800 p-6 rounded-xl shadow-md">
    <h1 class="text-2xl font-bold text-center mb-6">Login</h1>

    @if ($errors->any())
      <div class="bg-red-600 text-white p-2 rounded mb-4">
        <ul>
          @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
          @endforeach
        </ul>
      </div>
    @endif

    <form method="POST" action="{{ route('login') }}">
      @csrf

      <div class="mb-4">
        <label class="block mb-1">Email</label>
        <input type="email" name="email" class="w-full p-2 rounded bg-gray-700 text-white" required>
      </div>

      <div class="mb-4">
        <label class="block mb-1">Password</label>
        <input type="password" name="password" class="w-full p-2 rounded bg-gray-700 text-white" required>
      </div>

      <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold">
        Login
      </button>
    </form>

    <p class="text-center mt-4 text-sm">
      Don’t have an account? <a href="{{ route('register') }}" class="text-blue-400">Register</a>
    </p>
  </div>
</body>
</html>
