var firebase = require('../firebase');
var _ = require('underscore');

var createTree = (list) => {
  let data = _.values(list);
  var tree = [];

  data.forEach(function(node) {
  	var parent = list[node.invitedBy] || undefined;

  	if (parent) {
      parent.children = parent.children || []
  		parent.children.push(node);
  	} else if (node.payment) {
  		tree.push(node);
  	}
  });

  return tree;
}

var createSummary = (list) => {
  var users = _.values(list);

  return users.reduce((e,f) => {
    var invites = _.values(f.invites);

    invites.forEach(g => {
      e.total++;
      e.available += !g.sent ? 1 :0;
      e.sent += g.sent ? 1 : 0;
      e.confirmed += g.confirmed ? 1 : 0;
    });

    return e;
  }, {total: 0, available: 0, sent: 0, confirmed: 0})
}

var tree = (request, response) => {
  let userRef = firebase.database().ref('users');

  let users = userRef.once('value').then(userObj => {
    return userObj.val();
  }).catch(err => {
    return response.status(404).json({
      error: 'Get data error.'
    })
  });

  return users.then(data => {
    response.json({
      tree: createTree(data),
      summary: createSummary(data)
    });
  }).catch(err => {
    response.status(500).json(err || {err: 'Map tree error.'})
  })
}

module.exports = tree;
