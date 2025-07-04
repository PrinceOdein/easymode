// src/pages/Login.tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    setMessage(error ? error.message : 'Check your email for the magic link!');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">EasyMode Login</h1>
      <input
        className="border px-4 py-2 rounded mb-2"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Magic Link
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
