const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.error('MongoDB error ❌', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Server Running ✅');
});

// API routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user'); // ✅ ADD THIS
app.use('/api/user', userRoutes);           // ✅ AND THIS

const eventRoutes = require('./routes/event');
app.use('/api/events', eventRoutes);

const bookingRoutes = require('./routes/booking');
app.use('/api/bookings', bookingRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});



