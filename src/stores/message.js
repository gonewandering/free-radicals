import Reflux from 'reflux'
import MessageActions from '../actions/message'

class MessageStore extends Reflux.Store {
  constructor() {
    super()

    this.listenables = MessageActions;

    this.state = {
      messages: []
    }
  }

  send(message) {
    const id = Math.random().toString(36).substring(7);
    const self = this;

    this.state.messages.push({
      text: message,
      awk: false,
      timestamp: new Date(),
      id: id
    });

    this.setState({
      messages: this.state.messages
    })

    window.setTimeout(() => {
      self.state.messages = self.state.messages.filter((msg) => {
        return msg.id == id ? false : true
      })

      self.setState({
        messages: this.state.messages
      })
    }, 3000);
  }

  awk(id) {
    this.state.messages[id].awk = true;

    this.setState({
      messages: this.state.messages
    });
  }
}

export default MessageStore
