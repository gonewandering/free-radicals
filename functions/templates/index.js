const fs = require('fs');
const Handlebars = require('handlebars');

function template(path) {
  return new Promise(function (res, cat) {
    fs.readFile(path, 'utf-8', function (err, result) {
      if(err) { cat(err); }
      res(result);
    });
  });
}

function compile(path) {
  return template(path).then(function (str) {
    return Handlebars.compile(str);
  }).catch(function (err) {
    console.log(err);
  })
}

module.exports = {
  invite: {
    subject: 'Congratulations, You\'ve received an invite to Fall',
    template: compile('./templates/invite.handlebars')
  },
  rsvp: {
    subject: 'Thanks for RSVPing to Fall',
    template: compile('./templates/rsvp.handlebars')
  }
}
