const Stripe = require('stripe');
const config = require('../config');

const stripe = Stripe(config.stripe.secret);

function checkout (req, res) {
  var token = req.body.stripeToken;

  stripe.charges.create({
    amount: 25000,
    currency: "usd",
    description: "In Good Company / Free Radicals",
    source: token,
  }, function(err, charge) {
    if (err) { res.status(500).json(err); }
    res.json(charge);
  });
}

module.exports = checkout;
