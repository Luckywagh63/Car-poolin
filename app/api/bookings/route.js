import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Get connection string from environment variables
const client = new MongoClient(uri);

async function saveBooking(bookingData) {
  try {
    await client.connect(); // Connect to MongoDB
    const database = client.db('luckypool'); // Your database name
    const bookings = database.collection('bookings'); // Collection name
    const result = await bookings.insertOne(bookingData); // Save booking data
    return { ...bookingData, _id: result.insertedId }; // Return booking data with the new ID
  } catch (error) {
    console.error('Error saving booking:', error);
    throw new Error('Could not save booking');
  } finally {
    await client.close(); // Close connection
  }
}

export async function POST(req) {
  try {
    const bookingData = await req.json(); // Get booking data from request
    const savedBooking = await saveBooking(bookingData); // Save booking

    return new Response(JSON.stringify({
      message: 'Drive booked successfully!',
      booking: savedBooking,
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(error.message, { status: 500 });
  }
}
