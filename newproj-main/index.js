// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Notification Route
const notificationRoute = require('./routes/notificationRoute');
app.use('/notifications', notificationRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// notificationRoute.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create a new notification
router.post('/notifications', async (req, res) => {
  try {
    const { user, category, message } = req.body;
    const newNotification = new Notification({ user, category, message });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all notifications
router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: String,
  category: String,
  message: String
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
