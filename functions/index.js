const functions = require('firebase-functions');
const admin = require('firebase-admin');

let send = require('./routes/send');
let checkout = require('./routes/checkout')

exports.send = functions.https.onRequest(send);
exports.checkout = functions.https.onRequest(checkout);
