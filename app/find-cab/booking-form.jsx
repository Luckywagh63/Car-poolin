// app/find-cab/booking-form.jsx
'use client';
import React, { useState } from 'react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    numPassengers: 1,
    pickupSpot: '',
    destination: '',
    contactNumber: '',
    carType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Booking successful! Booking ID: ' + data.insertedId);
      // Optionally reset the form or redirect
    } else {
      const error = await response.json();
      alert('Error: ' + error.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="numPassengers"
        placeholder="Number of Passengers"
        value={formData.numPassengers}
        onChange={handleChange}
        min="1"
        required
      />
      <input
        type="text"
        name="pickupSpot"
        placeholder="Pickup Spot"
        value={formData.pickupSpot}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="contactNumber"
        placeholder="Contact Number"
        value={formData.contactNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="carType"
        placeholder="Type of Car"
        value={formData.carType}
        onChange={handleChange}
        required
      />
      <button type="submit">Book Drive</button>
    </form>
  );
};

export default BookingForm;
