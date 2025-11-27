export async function getUser() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) return null;

  const res = await fetch("http://localhost:8000/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;

  return res.json();
}
