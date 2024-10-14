// index.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', todoRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do API');
});

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint Not Found' });
});

// Global Error Handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
