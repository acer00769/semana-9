const express = require('express');
const router = express.Router();
const { getHorarios, reservar } = require('../controllers/reservaController');

router.get('/horarios', getHorarios);
router.post('/confirmar', reservar);

router.post('/pagar', async (req, res) => {
  const { amount } = req.body;
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: "USD",
        value: amount
      }
    }]
  });

  try {
    const order = await paypalClient.client().execute(request);
    res.json(order.result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear orden de pago");
  }
});
module.exports = router;

const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = new paypal.core.PayPalHttpClient(
  new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);