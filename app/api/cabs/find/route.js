// app/api/cabs/find/route.js
import { NextResponse } from 'next/server';
import Booking from '../../../../models/Booking'; // Adjusted import path
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return; // Already connected
  }
  await mongoose.connect(uri); // Connect to MongoDB
}

export async function POST(req) {
  await connectDB(); // Ensure DB connection

  const { pickup, destination } = await req.json(); // Get the request body

  try {
    // Fetch cabs from the Booking collection where pickup or destination matches
    const availableCabs = await Booking.find({
      $or: [
        { pickup: pickup },
        { destination: destination },
      ],
    }).exec(); // Use exec() to execute the query

    return NextResponse.json(availableCabs, { status: 200 });
  } catch (error) {
    console.error('Error fetching available cabs:', error);
    return NextResponse.json('Error fetching available cabs', { status: 500 });
  }
}
