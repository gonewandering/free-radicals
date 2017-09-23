import Reflux from 'reflux'

let messageConf = [
  'send',
  'awk'
];

let MessageActions = Reflux.createActions(messageConf)

export default MessageActions
