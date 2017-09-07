var express = require('express'),
  router = express.Router(),
  db = require('../models'),
  crypto = require('crypto');

module.exports = function (app) {
  app.use('/', router)
};

router.get('/', (req, res, next) => {
  db.Invite.findAll().then(invites => {
    res.json(invites)
  })
});

router.post('/', (req, res, next) => {
  let invitee = req.body
  invitee.id = crypto.randomBytes(20).toString('hex')

  let invite = db.Invite.create(invitee).then(invite => {
    res.json(invite)
  }).catch(err => {
    res.json(err)
  })
});

router.get('/:id', (req, res, next) => {
  db.Invite.findById(req.params.id).then((invite) => {
    res.json('index', invite);
  });
});
