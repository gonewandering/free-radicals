var functions = require('./index');

var stub = {
  query: {
    uid: 'JmxIOpKEhKPcYjqx3abyO2NTCLH2',
    template: 'invite',
    email: 'lgsilver@gmail.com'
  },
  headers: {
    origin: 'http://google.com'
  }
}

var res = {
  json: function (data) {
    console.log(data);
    return false;
  },
  setHeader: (head) => {
    return;
  }
}

functions.send(stub, res);
