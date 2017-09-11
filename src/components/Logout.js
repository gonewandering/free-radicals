require('styles/components/underlay.scss');

import React from 'react';
import firebase from '../actions/firebase'

class AppComponent extends React.Component {
  constructor() {
    super()

    this.state = {
      user: null
    }
  }

  logoutUser() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signOut()
  }

  componentWillMount() {
    this.watchLogout.bind(this)();
  }

  watchLogout() {
    const self = this;

    firebase.auth().onAuthStateChanged(self.props.onChange);
  }

  render() {
    return (
      <button className="btn btn-lg btn-block btn-primary" onClick={ this.logoutUser.bind(this) }>Sign Out</button>
    )
  }
}

export default AppComponent;
