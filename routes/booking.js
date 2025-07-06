const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event');

router.get('/test', (req, res) => {
  res.send('Booking route is working ✅');
});


// POST /api/bookings — Create booking
// POST /api/bookings — Create a new booking
router.post('/', async (req, res) => {
  try {
    const { user, event, seatsBooked, totalAmount } = req.body;

    const eventDoc = await Event.findById(event);
    if (!eventDoc) return res.status(404).json({ message: 'Event not found' });

    if (eventDoc.seatsAvailable < seatsBooked) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    eventDoc.seatsAvailable -= seatsBooked;
    await eventDoc.save();

    const booking = new Booking({
      user,
      event,
      seatsBooked,
      totalAmount
    });

    await booking.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// GET /api/bookings/user/:userId — Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE /api/bookings/:bookingId — Cancel booking
router.delete('/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Restore seats to event
    const event = await Event.findById(booking.event);
    if (event) {
      event.seatsAvailable += booking.seatsBooked;
      await event.save();
    }

    await Booking.findByIdAndDelete(req.params.bookingId);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/test-delete', (req, res) => {
  res.send('Delete route file is working ✅');
});


module.exports = router;

// DELETE /api/bookings/:id — Cancel a booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const event = await Event.findById(booking.event);
    if (event) {
      event.seatsAvailable += booking.seatsBooked;
      await event.save();
    }

    await booking.deleteOne();

    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

