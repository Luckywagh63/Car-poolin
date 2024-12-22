import { connectToDatabase } from '../../lib/mongodb'; // Adjust this path according to your project structure

export default async function handler(req, res) {
  const { carType } = req.query;

  const db = await connectToDatabase(); // Connect to your MongoDB database

  try {
    const driver = await db.collection('drivers').findOne({ carType }); // Adjust the collection name
    if (driver) {
      res.status(200).json(driver);
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  } catch (error) {
    console.error('Failed to fetch driver:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
