const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const adminRoutes = require('./admin.route');
const newsRoutes = require('./news.route');
const reviewRoutes = require('./reviews.route');
const anaisRoutes = require('./anais.route');
const conferencistaRoutes = require('./conferencista.route');
const scheduleRoutes = require('./schedule.route');
const liveRoutes = require('./virtual/live.route');
const chatAdminRoutes = require('./virtual/chat-admin.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes); //passar o middleware
router.use('/news', newsRoutes);
router.use('/reviews', reviewRoutes);
router.use('/conferencista', conferencistaRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/anais', anaisRoutes);
router.use('/live', liveRoutes);
router.use('/chat-admin', chatAdminRoutes);


module.exports = router;
