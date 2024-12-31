'use client';

import { useState,FormEvent } from 'react';
import { signInWithGoogle } from './actions/signInGoogle'; // Adjust path as needed

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Logging in with:', email, password);

  };

  return (
    <>
      <div>
        <h1>Home</h1>
      </div>

      {/* Email/Password Login Form */}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2"
          />
        </div>
        <button type="submit" className="bg-green-600 p-3 text-white mt-2">
          Login with Email
        </button>
      </form>

      {/* Google Login Button */}
      <form
        action={signInWithGoogle} // Use the server action here
      >
        <button type="submit" className="bg-blue-600 p-3 text-white mt-4">
          Sign in with Google
        </button>
      </form>
    </>
  );
}
