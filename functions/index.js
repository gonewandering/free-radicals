var Firebase = require('firebase');
var Mailgun = require('mailgun-js');
var cors = require('cors')({origin: true});

var templates = require('./templates');
var config = require('./config');

var mailgun = Mailgun(config.mailgun);

var firebase = Firebase.initializeApp(config.firebase);
var functions = require('firebase-functions');

const send = (request, response) => {
  cors(request, response, () => {
    let uid = request.query.uid;
    let email = request.query.email;
    let template = request.query.template;
    let params = request.query;

    let user = {};

    if (!uid || !email) {
      return response.status(404).json({
        error: 'No user id or email specified.'
      })
    }

    let userRef = firebase.database().ref('users/' + uid);

    let profile = userRef.once('value').then(userObj => {
      return userObj.val();
    }).catch(err => {
      return response.status(404).json({
        error: 'No user found with that id.'
      })
    });

    profile.then(userProfile => {
      var context = {
        user: userProfile,
        params: params
      }

      var content = templates[template];

      content.template.then(function (template) {
        var data = {
          from: 'Free Radicals <info@mail.wearefreeradicals.org>',
          to: email,
          subject: content.subject,
          html: template(context)
        };

        mailgun.messages().send(data, function (error, body) {
          if (error) {
            return response.status(500).json(error);
          }

          return response.json(data);
        });
      })
    })
  })
}

exports.send = functions.https.onRequest(send);
