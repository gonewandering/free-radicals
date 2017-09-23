import Reflux from 'reflux'

let authConf = [
  'register',
  'login',
  'logout',
  'getProfile',
  'setProfile'
]

export default Reflux.createActions(authConf)
