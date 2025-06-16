const express = require('express');
const router = express.Router();
const { saveOrder, getOrders } = require('../controllers/orderController');
const Order = require('../models/Order');


router.post('/save-order', saveOrder);
router.get('/orders', getOrders);

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
