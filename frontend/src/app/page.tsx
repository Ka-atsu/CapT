// frontend/src/app/page.tsx
"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch directly from our new Node.js endpoint
    fetch("http://localhost:5000/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Could not connect to the backend server.");
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="max-w-md w-full flex flex-col gap-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Full-Stack Connection Test
        </h1>

        <div className="p-6 rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Users from Local Postgres:
          </h2>

          {loading && (
            <p className="text-yellow-400 animate-pulse">Loading data...</p>
          )}

          {error && <p className="text-red-400 font-medium">{error}</p>}

          {!loading && !error && users.length === 0 && (
            <p className="text-gray-400">
              Connected, but the 'users' table is empty!
            </p>
          )}

          {!loading && !error && users.length > 0 && (
            <ul className="text-left space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="p-3 bg-gray-700/50 rounded-lg border border-gray-600 flex justify-between"
                >
                  <span className="font-semibold text-green-400">
                    {user.name}
                  </span>
                  <span className="text-gray-400 text-sm">{user.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
