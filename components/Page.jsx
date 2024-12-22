'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

const Page = () => {   
  const [destination, setDestination] = useState('');   
  const [isLoading, setIsLoading] = useState(false);    
  const navigate = useNavigate();  // Initialize useNavigate

  const handleBookDrive = async (e) => {     
    e.preventDefault();     
    setIsLoading(true);      

    try {       
      const response = await fetch('http://localhost:5000/api/book-drive', {         
        method: 'POST',         
        headers: { 'Content-Type': 'application/json' },         
        body: JSON.stringify({ destination }),       
      });       

      if (response.ok) {         
        const responseData = await response.json();
        
        // Navigate to the details page with the relevant data
        navigate('/drive-details', { state: { ...responseData, destination } });
      } else {         
        const errorData = await response.json();         
        alert(`Failed to book the drive: ${errorData.error}`);       
      }     
    } catch (error) {       
      alert('An error occurred while booking the drive.');     
    }     
    setIsLoading(false);   
  };    

  const handleJoinDrive = async (e) => {     
    e.preventDefault();     
    setIsLoading(true);      

    try {     
      const response = await fetch(`http://localhost:5000/api/join-drive?destination=${destination}`);
      const data = await response.json();      

      if (response.ok) {
        // If successful, navigate to the details page with the cab details
        navigate('/drive-details', { state: { cabs: data.cabs, destination } });
      } else {       
        alert('No matching cabs found.');     
      }
    } catch (error) {
      alert('An error occurred while joining the drive.');
    }
    
    setIsLoading(false);   
  };    

  return (     
    <main className="p-4 md:p-40 bg-cover bg-center" style={{ backgroundImage: `url('your-image-url')` }}>       
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 md:mb-12 text-white">Apex CarPooling</h1>        

      {/* Book a Drive Section */}
      <section className="mt-8 md:mt-12 bg-white p-4 md:p-6 rounded-lg shadow-md">         
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">Book a Drive</h2>         
        <form onSubmit={handleBookDrive} className="text-center">           
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter your destination"
            className="border border-gray-300 p-2 mb-4 w-full md:w-3/4"
            required
          />           
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={isLoading}
          >             
            {isLoading ? 'Booking...' : 'Book Drive'}
          </button>         
        </form>       
      </section>        

      {/* Join a Drive Section */}
      <section className="mt-8 md:mt-12 bg-white p-4 md:p-6 rounded-lg shadow-md">         
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">Join a Drive</h2>         
        <form onSubmit={handleJoinDrive} className="text-center">           
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter your destination"
            className="border border-gray-300 p-2 mb-4 w-full md:w-3/4"
            required
          />           
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Join Drive'}
          </button>         
        </form>
      </section>     
    </main>   
  );
};

export default Page;
