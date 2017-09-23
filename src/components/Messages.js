require('styles/components/messages.scss');

import React from 'react';
import Reflux from 'reflux';

import MessageActions from '../actions/message'
import MessageStore from '../stores/message'

class AppComponent extends Reflux.Component {
  constructor() {
    super()
    this.store = MessageStore;

    this.state = {
      messages: []
    }
  }

  awk(id, e) {
    e.preventDefault();
    MessageActions.awk(id);
  }

  render() {
    let renderMessage = (msg, id) => {
      if (msg.awk) { return null; }

      return (
        <div className="message">
          <a href="" onClick={ this.awk.bind(this, id) }><i className="fa fa-close"></i></a> { msg.text }
        </div>
      )
    }

    return (
      <div className="messages">
        { this.state.messages.map(renderMessage) }
      </div>
    );
  }
}

export default AppComponent;
