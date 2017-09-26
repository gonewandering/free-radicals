const fs = require('fs');
const Handlebars = require('handlebars');
const inline = require('inline-css');

function template(path) {
  return new Promise(function (res, cat) {
    fs.readFile(path, 'utf-8', function (err, result) {
      if(err) { cat(err); }
      res(result);
    });
  });
}

function compile(path) {
  return template(path)
    .then(str => {
      let rend = inline(str, {
        url: 'https://wearefreeradicals.org'
      });

      return rend;
    })
    .then(Handlebars.compile)
    .catch(function (err) {
      console.log(err);
    })
}

module.exports = {
  invite: {
    subject: {{ user.firstName }} {{ user.lastName }} 'invited you to In Good Company.',
    template: compile('./templates/invite.handlebars')
  },
  rsvp: {
    subject: 'Thanks for RSVPing to In Good Company',
    template: compile('./templates/rsvp.handlebars')
  }
}
