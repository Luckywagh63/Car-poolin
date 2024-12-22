"use client";

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {session ? (
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p><strong>Name:</strong> {session.user.name}</p>
          <p><strong>Email:</strong> {session.user.email}</p>
        </div>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
}