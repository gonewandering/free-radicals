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
    response.json(createTree(data));
  }).catch(err => {
    response.status(500).json(err || {err: 'Map tree error.'})
  })
}

module.exports = tree;
