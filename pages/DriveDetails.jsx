import React from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation to receive passed state

const DriveDetails = () => {
  const location = useLocation();
  const { cabs, destination } = location.state || {};  // Retrieve data from navigation state

  return (
    <div className="p-4 md:p-20">
      <h1 className="text-3xl font-bold text-center mb-6">Drive Details</h1>
      
      {cabs && cabs.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold">Available Cabs to {destination}</h2>
          <ul className="mt-4">
            {cabs.map((cab, index) => (
              <li key={index} className="border p-4 mb-4">
                <p><strong>Destination:</strong> {cab.destination}</p>
                <p><strong>Time:</strong> {cab.time}</p>
                <p><strong>Driver:</strong> {cab.driver || 'Not specified'}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No cabs available or no details provided.</p>
      )}
    </div>
  );
};

export default DriveDetails;
