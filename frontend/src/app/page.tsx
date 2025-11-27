"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      if (!data) {
        router.push("/login"); // redirect if not logged in
      } else {
        setUser(data);
      }
    }
    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    router.push("/login");             // redirect to login
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
