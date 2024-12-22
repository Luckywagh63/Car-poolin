'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const JoinCabPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    passengers: '',
    pickup: '',
    destination: '',
  });

  const [availableCabs, setAvailableCabs] = useState([]);
  const [message, setMessage] = useState('');
  const router = useRouter(); // Initialize the router

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

  const handleJoinRide = (cab) => {
    // Redirect to the confirmation page with cab details using query parameters
    const query = new URLSearchParams({
      driverName: cab.driverName,
      carType: cab.carType,
      pickup: cab.pickup,
      destination: cab.destination,
      name: formData.name,
      passengers: formData.passengers,
    }).toString();

    // Navigate to the joined ride page with the query string
    router.push(`/joined-ride?${query}`);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Join a Cab</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-lg p-6 bg-gray-700 rounded-3xl shadow-lg border border-black">
        <h2 className="text-2xl font-semibold mb-4 text-center text-purple-600">Book Your Ride</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="number"
          name="passengers"
          placeholder="Number of Passengers"
          value={formData.passengers}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          name="pickup"
          placeholder="Pickup Spot"
          value={formData.pickup}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button type="submit" className="bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Find Cabs
        </button>
      </form>

      {message && <p className="mt-4 text-purple-600">{message}</p>}

      {availableCabs.length > 0 && (
        <div className="mt-8 w-full max-w-2xl p-6 bg-white shadow-md rounded-lg overflow-auto max-h-96">
          <h2 className="text-3xl font-bold mb-4">Available Cabs</h2>
          <div className="space-y-4">
            {availableCabs.map((cab, index) => (
              <div key={index} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
                <p className="text-lg"><strong>Driver:</strong> {cab.driverName}</p>
                <p className="text-lg"><strong>Car:</strong> {cab.carType}</p>
                <p className="text-lg"><strong>Pickup Spot:</strong> {cab.pickup}</p>
                <p className="text-lg"><strong>Destination:</strong> {cab.destination}</p>
                <button 
                  className="mt-2 bg-purple-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  onClick={() => handleJoinRide(cab)}
                >
                  Join Ride
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default JoinCabPage;
