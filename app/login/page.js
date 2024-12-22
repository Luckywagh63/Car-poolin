"use client";

import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => signIn('google')}
      >
        Sign in with Google
      </button>
    </div>
  );
}
