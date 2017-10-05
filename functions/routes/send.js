var Mailgun = require('mailgun-js');
var Handlebars = require('handlebars');

var firebase = require('../firebase');
var templates = require('../templates');
var config = require('../config');

var mailgun = Mailgun(config.mailgun);

const send = (request, response) => {
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
      params: params,
      eventDate: (new Date("2017-10-14 00:00:00")) - Date.now()
    }

    if (context.user.payment.id) {
      context.user.payment.id = context.user.payment.id.replace('tok_', '');
    }

    var content = templates[template];

    content.template.then(function (template) {

      var subTemplate = Handlebars.compile(content.subject);
      var subject = subTemplate(context);
      
      var data = {
        from: 'Free Radicals <info@mail.wearefreeradicals.org>',
        to: email,
        subject: subject,
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
}

module.exports = send;
