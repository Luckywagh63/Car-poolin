import { useRouter } from 'next/router';
import React from 'react';

const BookingConfirmation = () => {
  const router = useRouter();
  const { user, destination, date } = router.query;

  return (
    <div>
      <h1>Booking Confirmation</h1>
      <p>User: {user}</p>
      <p>Destination: {destination}</p>
      <p>Date: {date}</p>
    </div>
  );
};

export default BookingConfirmation;
