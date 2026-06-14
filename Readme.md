Here is the exact layout of the codebase, ready to copy and paste.

Save each code block into its respective file inside your project directory.

---

## 🟢 1. The Backend Files (`/backend`)

### `backend/.gitignore`

Create this file in your `/backend` folder so your database password never leaks to GitHub.

```text
node_modules/
.env
.env.local
npm-debug.log*

```

### `backend/.env`

Create this file to store your local connection string. **Replace `YOUR_PASSWORD_HERE` with your actual local Postgres password.**

```env
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD_HERE@localhost:5432/my_db

```

### `backend/server.js`

This handles your express server routing, cross-origin communication (CORS), and database fetching.

```javascript
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection Setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 1. Health Check Endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbTest = await pool.query('SELECT NOW()');
    res.json({ status: 'Connected!', time: dbTest.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'Database Connection Error', details: err.message });
  }
});

// 2. Fetch Users Endpoint
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

```

---

## 🔵 2. The Frontend File (`/frontend`)

### `frontend/src/app/page.tsx`

Replace everything inside your main Next.js page with this client-side dashboard component.

```tsx
'use client';

import { useState, useEffect } from 'react';

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
    fetch('http://localhost:5000/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('Could not fetch data from server.');
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.details || data.error);
        }
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="max-w-md w-full flex flex-col gap-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">System Connection Status</h1>
        
        <div className="p-6 rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Database User Profiles:</h2>
          
          {loading && <p className="text-yellow-400 animate-pulse">Querying local server...</p>}
          
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-500 rounded-lg text-left">
              <p className="text-red-400 font-bold">Error Encountered:</p>
              <p className="text-red-300 text-sm mt-1">{error}</p>
            </div>
          )}
          
          {!loading && !error && users.length === 0 && (
            <p className="text-gray-400">Connected to Postgres, but the table is empty!</p>
          )}

          {!loading && !error && users.length > 0 && (
            <ul className="text-left space-y-2">
              {users.map((user) => (
                <li key={user.id} className="p-3 bg-gray-700/50 rounded-lg border border-gray-600 flex justify-between">
                  <span className="font-semibold text-green-400">{user.name}</span>
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

```

---

## 💾 3. The Database Script (SQL)

Run this script inside your database manager (like pgAdmin or DBeaver) to generate your sample layout architecture:

```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users (name, email) 
VALUES ('John Doe', 'john@example.com')
ON CONFLICT DO NOTHING;

```