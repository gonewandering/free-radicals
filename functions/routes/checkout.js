var Stripe = require('stripe');
var config = require('../config');

var stripe = Stripe(config.stripe.secret);

function checkout (req, res) {
  stripe.charges.create({
    amount: 2500,
    currency: "usd",
    description: "In Good Company / Free Radicals",
    source: req.body.stripeToken,
    statement_descriptor: 'Free Radicals NYC'
  }, function(err, charge) {
    if (err) { res.status(500).json(err); }
    res.json(charge);
  });
}

module.exports = checkout;
