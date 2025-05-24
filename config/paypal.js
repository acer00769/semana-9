const paypalClient = require('../config/paypal');
const paypal = require('@paypal/checkout-server-sdk');

const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");

function environment() {
  let clientId = "TAdH6XKK0bO11WLYjzMmiUytC8lI7SH72klqHAOMKIN23D1sCqMrScWKg9zJUnMSJ1okayf_6gLaWs9hJ";
  let clientSecret = "EE41ou-RHlHw-_g0x5dMqgpCCsYVcjRHvN7oX8eOCkrkk_1btCxg0nnDJh9eLaIfw0qFXWosG8OZ-KQa";
  return new checkoutNodeJssdk.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new checkoutNodeJssdk.PayPalHttpClient(environment());
}

module.exports = { client };
