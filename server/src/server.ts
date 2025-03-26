import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/api/user-routes';  // Importing the user routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use user routes for the '/api/users' path
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDB');

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
