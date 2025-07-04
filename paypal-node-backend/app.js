const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();



const orderRoutes = require('./routes/orderRoutes');
const { client } = require('./paypal/paypalClient');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/products', require('./routes/productRoutes'));
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Create PayPal Order
app.post('/create-paypal-order', async (req, res) => {

  const amount = req.body.amount;
  if (!amount || isNaN(amount)) {
    console.error("❌ Invalid amount:", amount);
    return res.status(400).json({ error: "Invalid amount" });
  }

  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: req.body.amount
      }
    }]
  });

  try {
    const order = await client().execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
});



app.post('/capture-paypal-order', async (req, res) => {
  const { orderId,cartItems,address } = req.body;
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client().execute(request);
 

    const orderData = {
  orderId: capture.result.id,
  amount: capture.result.purchase_units[0].payments.captures[0].amount.value,
  status: capture.result.status.toLowerCase(), // PayPal status
  orderStatus: 'completed',                    // Internal status
  products: cartItems,
  payer: {
    email: capture.result.payer.email_address,
    name: capture.result.payer.name.given_name + ' ' + capture.result.payer.name.surname,
  },
  address: address,
  create_time: capture.result.create_time,
};

    const Order = require('./models/Order');
    await new Order(orderData).save();
    res.json({ message: 'Payment captured & order saved', data: orderData });
  } catch (err) {
    console.error('PAYPAL CAPTURE ERROR:', err);
    res.status(500).json({ error: 'Failed to capture PayPal order' });
  }
});


app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
