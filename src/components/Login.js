require('styles/components/underlay.scss');

import React from 'react';
import firebase from '../actions/firebase'

class AppComponent extends React.Component {
  constructor(props) {
    super()
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    this.auth = firebase.auth().onAuthStateChanged(this.onAuthChange.bind(this));
  }

  componentWillUnount() {
    delete this.auth;
  }

  onAuthChange(user) {
    this.setState({
      user: user
    })

    this.props.onChange && this.props.onChange(user)
  }

  loginUser() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithRedirect(provider);
  }

  logoutUser() {
    firebase.auth().signOut()
  }

  render() {
    if (this.state.user) {
      return (
        <button className="btn btn-lg btn-block btn-danger" onClick={ this.logoutUser }>
          { this.props.logoutLabel || 'Logout' }
        </button>
      )
    } else {
      return (
        <button className="btn btn-lg btn-block btn-primary" onClick={ this.loginUser }>
          { this.props.loginLabel || 'Login with GOOGLE' }
        </button>
      );
    }
  }
}

export default AppComponent;
