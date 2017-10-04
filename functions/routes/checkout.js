var Stripe = require('stripe');
var config = require('../config');
var request = require('request-promise');

var stripe = Stripe(config.stripe.secret);

function checkout (req, res) {
  stripe.charges.create({
    amount: 2500,
    currency: "usd",
    description: "In Good Company / Free Radicals",
    source: req.body.stripeToken,
    statement_descriptor: 'Free Radicals NYC'
  }, function(err, charge) {
    if (err) {
      return request.post({
        url: config.slack.hook,
        json: {
          text: 'There\'s been a payment error'
      }}).then(() => {
        return res.status(500).json(err);
      });
    }

    return request.post({
      url: config.slack.hook,
      json: {
        text: 'Someone just registered!'
    }}).then(() => {
      return res.json(charge);
    });
  });
}

module.exports = checkout;
