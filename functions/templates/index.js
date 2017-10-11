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
    subject: '{{ user.firstName }} {{ user.lastName }} invited you to In Good Company, a pop-up dance party in Williamsburg.',
    template: compile('./templates/invite.handlebars')
  },
  rsvp: {
    subject: 'Thanks for RSVPing to In Good Company!',
    template: compile('./templates/rsvp.handlebars')
  },
  details: {
    subject: 'Get Excited! In Good Company’s Lineup is Pretty Dope.',
    template: compile('./templates/event-details.handlebars')
  },
  reminder: {
    subject: 'Reminder: {{ user.firstName }} {{ user.lastName }} was wondering if you can make it to In Good Company!',
    template: compile('./templates/reminder-event-details.handlebars')
  }
}
