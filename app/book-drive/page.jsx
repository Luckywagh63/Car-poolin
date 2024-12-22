'use client';
import React, { useState } from 'react';

const BookDrivePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    passengers: 1,
    pickup: '',
    destination: '',
    contact: '',
    carType: '',
  });

  const [bookingDetails, setBookingDetails] = useState(null);

  const fetchDriverDetails = (carType) => {
    const drivers = {
      sedan: { name: 'John Doe', carDetails: 'Sedan - Toyota Camry' },
      suv: { name: 'Jane Smith', carDetails: 'SUV - Honda CR-V' },
      hatchback: { name: 'Mark Lee', carDetails: 'Hatchback - Hyundai i20' },
    };
    return drivers[carType.toLowerCase()] || { name: 'Not Assigned', carDetails: 'Not Assigned' };
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const driver = fetchDriverDetails(formData.carType);
  
    const bookingData = {
      ...formData,
      driver: driver.name,
      car: driver.carDetails,
    };
  
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      const result = await response.json(); // Get the JSON response
  
      if (!response.ok) {
        throw new Error(result.message || 'Failed to save booking');
      }
  
      alert(result.message); // Alert the success message
      setBookingDetails(result.booking); // Set booking details for confirmation
    } catch (error) {
      console.error(error);
      alert('Error booking drive'); // Handle error case
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Book a Drive with Lucky's Org</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
        <input type="number" name="passengers" min="1" max="6" placeholder="Number of Passengers" value={formData.passengers} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
        <input type="text" name="pickup" placeholder="Pickup Spot" value={formData.pickup} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
        <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
        <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
        <input type="text" name="carType" placeholder="Type of Car" value={formData.carType} onChange={handleChange} className="p-2 border border-gray-300 rounded" required />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">Book Drive</button>
      </form>

      {bookingDetails && (
        <div className="mt-8 p-4 bg-white shadow-md rounded">
          <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
          <p><strong>Name:</strong> {bookingDetails.name}</p>
          <p><strong>Passengers:</strong> {bookingDetails.passengers}</p>
          <p><strong>Pickup Spot:</strong> {bookingDetails.pickup}</p>
          <p><strong>Destination:</strong> {bookingDetails.destination}</p>
          <p><strong>Contact:</strong> {bookingDetails.contact}</p>
          <p><strong>Car Type:</strong> {bookingDetails.carType}</p>
          <p><strong>Driver:</strong> {bookingDetails.driver}</p>
          <p><strong>Car:</strong> {bookingDetails.car}</p>
        </div>
      )}
    </main>
  );
};

export default BookDrivePage;