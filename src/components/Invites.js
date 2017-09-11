require('styles/routes/home.scss');

import React from 'react';
import Card from '../components/Card'
import Underlay from '../components/Underlay'
import firebase from '../actions/firebase'

import Invite from './Invite'

class AppComponent extends React.Component {
  constructor() {
    super();

    this.db = firebase.database().ref("invites");

    this.state = {
      user: null,
      loading: true
    }
  }

  render() {
    var invites = [(
      <div>
        <p>We welcome you to invite a few people to Colour. Try to find people who inspire you to live well and do well in life.</p>
      </div>
    )]

    for (var n in this.props.data) {
      invites.push(<Invite uid={ this.props.user.uid } inviteID={ n } data={ this.props.data[n] } />)
    }

    if (invites.length == 0) {
      invites = (
        <p>Hm. It doesn't look like you're currently a member. We've added your name to the waiting list and we'll let you know when there's space.</p>
      )
    }

    return (
      <div className="component invites">
        { invites }
      </div>
    );
  }
}

export default AppComponent;
