import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/luckypool'; 
const dbName = 'luckypool';

export async function POST(request) {
  try {
    const { name, passengers, pickup, destination } = await request.json();

    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db(dbName);
    const bookingsCollection = db.collection('bookings');

    // Query the database for cabs matching the pickup or destination
    const matchingCabs = await bookingsCollection.find({
      $or: [{ pickup }, { destination }]
    }).toArray();

    // If matching cabs are found, return them with driver and car details
    if (matchingCabs.length > 0) {
      return NextResponse.json({ cabs: matchingCabs });
    }

    // If no matching cabs are found
    return NextResponse.json({ message: 'No cabs available for the selected pickup or destination.' });
  } catch (error) {
    console.error('Error fetching cabs:', error);
    return NextResponse.json({ message: 'Error fetching cabs', error }, { status: 500 });
  }
}
