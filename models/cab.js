// models/cab.js
import mongoose from 'mongoose';

const bookedSeatSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  carDetails: { type: String, required: true },
});

const cabSchema = new mongoose.Schema({
  carType: { type: String, required: true },
  pickup: { type: String, required: true },
  destination: { type: String, required: true },
  bookedSeats: [bookedSeatSchema],
  driver: driverSchema,
});

export const Cab = mongoose.model('Cab', cabSchema);
