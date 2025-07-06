const express = require('express');
const auth = require('../middleware/auth'); // Make sure this file exists

const router = express.Router();

router.get('/profile', auth, (req, res) => {
  res.json({
    message: 'Welcome to your profile!',
    user: {
      id: req.user.id,
      role: req.user.role
    }
  });
});

module.exports = router;
