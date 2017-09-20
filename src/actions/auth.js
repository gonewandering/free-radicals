import Reflux from 'reflux'

let authConf = {
  register: {
    asyncResult: true
  },
  login: {
    asyncResult: true
  },
  logout: {
    asyncResult: true
  }
}

export default Reflux.createActions(authConf)
