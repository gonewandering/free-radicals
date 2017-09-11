require('styles/routes/home.scss');

import React from 'react';
import Card from '../components/Card'
import Underlay from '../components/Underlay'
import Invites from '../components/Invites'
import Login from '../components/Login'
import firebase from '../actions/firebase'

class AppComponent extends React.Component {
  constructor(props) {
    super();
    this.invite = firebase.database().ref('invites/' + props.match.params.uID + '/' + props.match.params.inviteID)
    this.uid = props.match.params.uID

    this.state = {
      user: {},
      loading: true,
      invite: {},
      owner: false
    }
  }

  checkInvite() {
    return this.invite.once('value').then(invite => {
      return invite.val() || {};
    })
  }

  componentWillMount() {
    this.auth = firebase.auth().onAuthStateChanged(this.onAuthChange.bind(this));
  }

  componentWillUnmount() {
    delete this.auth
  }

  rsvp() {
    const self = this;

    var invites = this.state.invite.invites;
    var myInvites = firebase.database().ref('invites/' + this.state.user.uid);
    var invitesLength = myInvites.once('value');

    invitesLength.then(value => {
      var val = value.val()

      var len = val ? Object.keys(val).length : 0;

      while ((invites - len) > 0) {
        let key = Math.random().toString(36).substr(2, 5);

        myInvites.child(key).set({
          from: self.state.user.displayName,
          invites: self.state.invite.invites - 1,
          confirmed: false
        });

        invites--
      }

      if (len == 0) {
        self.invite.child('confirmed').set(self.state.user.uid);
      }

      self.state.invite.confirmed = self.state.user.uid;

      self.setState({
        owner: true,
        invite: self.state.invite
      })
    });
  }

  onAuthChange(user) {
    let owner = false;
    const self = this;
    user = user || {}

    this.checkInvite().then(invite => {

      self.setState({
        user: user,
        invite: invite,
        owner: invite.confirmed && user.uid && user.uid == invite.confirmed,
        loading: false
      })
    })
  }

  dummy() { }

  render() {
    var content = null;

    console.log('rerendered');

    let styles = {
      backgroundImage: 'url(https://static.pexels.com/photos/220836/pexels-photo-220836.jpeg)'
    }

    if (this.state.loading) {
      return (
        <div className="route invite">
          <Underlay styles={ styles }>
            <Card>
              <h1>Loading</h1>
            </Card>
          </Underlay>
        </div>
      );
    }

    if (this.state.invite && this.state.invite.confirmed == false) {
      if (this.state.user.uid) {
        content = (
          <Card>
            <h1>RSVP</h1>
            <p>Congratulations, you have received an invite to the next Free Radicals event from <strong>{ this.state.invite.from }</strong>. There are just a few left. RSVP with Google below.</p>
            <button className="btn btn-lg btn-success btn-block" onClick={ this.rsvp.bind(this) }>RSVP to Colour</button>
          </Card>
        )
      } else {
        content = (
          <Card>
            <h1>RSVP</h1>
            <p>Congratulations, you have received an invite to the next Free Radicals event from <strong>{ this.state.invite.from }</strong>. There are just a few left. RSVP with Google below.</p>
            <Login label="Login with Google to RSVP" onChange={ this.dummy }></Login>
          </Card>
        )
      }
    } else if (this.state.owner == true) {
      content = (
        <Card>
          <h1>RSVP</h1>
          <p>You are set. Now head over to your profile to send your invites.</p>
          <a href="/" className="btn btn-lg btn-warning btn-block">Invite Friends</a>
        </Card>
      )
    } else if (this.state.invite.confirmed && this.state.owner == false) {
      content = (
        <Card>
          <h1>RSVP</h1>
          <p>Oops. Looks like this invite is already used. Check with the person who invited you.</p>
        </Card>
      );
    } else {
      content = (
        <Card>
          <h1>RSVP</h1>
          <p>Oops. Doesn't look like this invite exists. </p>
        </Card>
      )
    }

    return (
      <div className="route invite">
        <Underlay styles={ styles }>
          { content }
        </Underlay>
      </div>
    );
  }
}

export default AppComponent;
