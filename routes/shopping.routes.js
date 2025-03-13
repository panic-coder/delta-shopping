const express = require('express');
const router = express.Router()
const ShoppingController = require('../controllers/shopping.controllers');
const rateLimitMiddleware = require('../middleware/rate-limiter.middleware');

router.post('/calculate-price', rateLimitMiddleware, ShoppingController.calculateTotalPrice);

module.exports = router;