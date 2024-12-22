'use client';
import React, { useState } from 'react';

const BookDrivePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    passengers: '',
    pickup: '',
    destination: '',
    contact: '',
    carType: '',
  });

  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Save booking data to MongoDB
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (!response.ok) throw new Error('Error booking drive');

      const bookingData = await response.json(); // Get booking confirmation
      setBookingDetails(bookingData);

      // Reset form fields
      setFormData({
        name: '',
        passengers: '',
        pickup: '',
        destination: '',
        contact: '',
        carType: '',
      });

      alert('Drive booked successfully!');
    } catch (err) {
      setError(err.message);
      alert('Failed to book the drive. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Book a Drive</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="number" name="passengers" placeholder="Number of Passengers" value={formData.passengers} onChange={handleChange} required />
        <input type="text" name="pickup" placeholder="Pickup Spot" value={formData.pickup} onChange={handleChange} required />
        <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
        <input type="text" name="carType" placeholder="Type of Car" value={formData.carType} onChange={handleChange} required />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded" disabled={loading}>
          {loading ? 'Booking...' : 'Book Drive'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {bookingDetails && (
        <div className="mt-8 p-4 bg-white shadow-md rounded">
          <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
          <p><strong>Name:</strong> {bookingDetails.name}</p>
          <p><strong>Passengers:</strong> {bookingDetails.passengers}</p>
          <p><strong>Pickup Spot:</strong> {bookingDetails.pickup}</p>
          <p><strong>Destination:</strong> {bookingDetails.destination}</p>
          <p><strong>Contact:</strong> {bookingDetails.contact}</p>
          <p><strong>Car Type:</strong> {bookingDetails.carType}</p>
        </div>
      )}
    </main>
  );
};

export default BookDrivePage;
