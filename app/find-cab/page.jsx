// app/find-cab/page.jsx
'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const FindCabPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Use NextAuth.js session

  // Check if the user is authenticated
  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin'); // Redirect to sign-in page
    }
  }, [status, router]);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Find a Cab</h1>
      <div className="space-y-4">
        <button
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xl py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
          onClick={() => router.push('/join-drive')}
        >
          Join a Drive
        </button>
        <button
          className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xl py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
          onClick={() => router.push('/book-drive')}
        >
          Book a Drive
        </button>
      </div>
    </main>
  );
};

export default FindCabPage;
