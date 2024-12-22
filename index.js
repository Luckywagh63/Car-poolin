// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import models
const User = require('./models/User');
const Ride = require('./models/Ride');
const Booking = require('./models/Booking');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/carpooling', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Failed to connect to MongoDB:", err));

// Routes

// Register a new user
app.post('/register', async (req, res) => {
  const { name, email, password, phoneNumber, isDriver, carDetails } = req.body;

  const newUser = new User({
    name,
    email,
    password,
    phoneNumber,
    isDriver,
    carDetails: isDriver ? carDetails : {}
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get available rides
app.get('/rides', async (req, res) => {
  try {
    const rides = await Ride.find().populate('driver');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching rides' });
  }
});

// Create a new ride (for drivers)
app.post('/createRide', async (req, res) => {
  const { driverId, origin, destination, date, availableSeats, price } = req.body;

  try {
    const newRide = new Ride({
      driver: driverId,
      origin,
      destination,
      date,
      availableSeats,
      price
    });

    const savedRide = await newRide.save();
    res.status(201).json(savedRide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book a ride (for passengers)
app.post('/bookRide', async (req, res) => {
  const { rideId, passengerId, seatsBooked } = req.body;

  try {
    const newBooking = new Booking({
      ride: rideId,
      passenger: passengerId,
      seatsBooked
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
