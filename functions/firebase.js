var Firebase = require('firebase')
var config = require('./config');

module.exports = Firebase.initializeApp(config.firebase);
