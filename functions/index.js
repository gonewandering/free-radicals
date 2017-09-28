var functions = require('firebase-functions')
var admin = require('firebase-admin')

var send = require('./routes/send');
var checkout = require('./routes/checkout')
var tree = require('./routes/tree')

var cors = require('cors')({origin: true});

const Cors = function (func) {
  return function (req, res) {
    return cors(req, res, func.bind(null, req, res));
  }
}

exports.send = functions.https.onRequest(Cors(send));
exports.checkout = functions.https.onRequest(Cors(checkout));
exports.tree = functions.https.onRequest(Cors(tree));
