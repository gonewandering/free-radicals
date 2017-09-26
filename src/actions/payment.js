import Reflux from 'reflux'

let paymentActions = [
  'register',
  'login',
  'logout',
  'getProfile',
  'setProfile'
]

export default Reflux.createActions(paymentActions)
