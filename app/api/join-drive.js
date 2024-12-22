// app/join-drive/page.jsx
'use client';
import React, { useState } from 'react';

const JoinCabPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    passengers: '',
    pickup: '',
    destination: '',
  });

  const [availableCabs, setAvailableCabs] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch available cabs based on pickup or destination
    const response = await fetch('/api/cabs/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      setAvailableCabs(data);
      setMessage('Available cabs fetched successfully!');
    } else {
      setMessage('Error fetching cabs. Please try again.');
    }

    // Reset form
    setFormData({
      name: '',
      passengers: '',
      pickup: '',
      destination: '',
    });
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Join a Cab</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="number" name="passengers" placeholder="Number of Passengers" value={formData.passengers} onChange={handleChange} required />
        <input type="text" name="pickup" placeholder="Pickup Spot" value={formData.pickup} onChange={handleChange} required />
        <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">Find Cabs</button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}

      {availableCabs.length > 0 && (
        <div className="mt-8 p-4 bg-white shadow-md rounded">
          <h2 className="text-2xl font-bold mb-4">Available Cabs</h2>
          {availableCabs.map((cab, index) => (
            <div key={index} className="border-b py-2">
              <p><strong>Driver:</strong> {cab.driverName}</p>
              <p><strong>Car:</strong> {cab.carType}</p>
              <p><strong>Pickup Spot:</strong> {cab.pickup}</p>
              <p><strong>Destination:</strong> {cab.destination}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default JoinCabPage;
