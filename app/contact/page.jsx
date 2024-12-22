'use client';
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' }); // Reset form after submission
      } else {
        console.error('Failed to submit message');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
      {submitted && (
        <p className="mt-4 text-green-500">Your message has been submitted successfully!</p>
      )}
    </main>
  );
};

export default ContactPage;
