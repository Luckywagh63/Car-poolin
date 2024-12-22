import dbConnect from '../../../../lib/mongodb'; 
import Booking from '../../../../models/Booking';

export async function POST(request) {
  try {
    const { name, passengers, pickup, destination, contact, carType } = await request.json();
    
    // Log incoming data for debugging
    console.log('Received request:', { name, passengers, pickup, destination, contact, carType });
    
    // Connect to the database
    await dbConnect();
    console.log('Database connected');

    // Define driver details based on car type
    const driverDetails = {
      sedan: { driverName: 'John Doe', carType: 'Sedan' },
      suv: { driverName: 'Jane Smith', carType: 'SUV' },
      hatchback: { driverName: 'Mark Lee', carType: 'Hatchback' },
    };

    const driver = driverDetails[carType.toLowerCase()] || { driverName: 'Unknown', carType: 'Unknown' };

    // Log driver assignment
    console.log('Driver assigned:', driver);

    // Create new booking
    const newBooking = new Booking({
      name,
      passengers,
      pickup,
      destination,
      contact,
      carType: driver.carType,
      driverName: driver.driverName,
    });

    // Save booking to MongoDB and log result
    const savedBooking = await newBooking.save();
    console.log('Booking saved:', savedBooking);

    // Return success response
    return new Response(JSON.stringify({ message: 'Booking successful', booking: newBooking }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error booking drive:', error);
    return new Response(JSON.stringify({ message: 'Error booking drive', error }), {
      status: 500,
    });
  }
}
