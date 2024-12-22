import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  passengers: { type: Number, required: true },
  pickup: { type: String, required: true },
  destination: { type: String, required: true },
  contact: { type: String, required: true },
  carType: { type: String, required: true },
  driverName: { type: String, required: true }, // New field for driver's name
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;