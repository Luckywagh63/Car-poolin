'use client';
import React from 'react';

const Dots = () => {
  return (
    
    <div className="flex justify-center mt-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <span key={index} className="w-3 h-3 bg-gray-900 rounded-full mx-2 animate-blink"></span>
      ))}
    </div>
  );
};
<main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-16"></main>

const JoinedRidePage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-16">
      <h1 className="text-4xl font-bold">Your ride will be joined soon!</h1>
      <p className="mt-4 text-lg">Thank you for choosing us!</p>
      <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
        <img
          src="https://imgd.aeplcdn.com/370x208/n/cw/ec/110503/x3-interior-dashboard.jpeg?isig=0&q=80"
          alt="Ride animation"
          className="w-64 h-64 object-cover"
        />
        <Dots /> {/* Add dots below the image */}
      </div>
    </main>
  );
};

export default JoinedRidePage;
