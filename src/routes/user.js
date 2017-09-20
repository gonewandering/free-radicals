require('styles/routes/home.scss');

import React from 'react';
import Card from '../components/Card'
import Underlay from '../components/Underlay'
import Invites from '../components/Invites'
import Login from '../components/Login/index'
import firebase from '../sources/firebase'

class AppComponent extends React.Component {
  constructor(props) {
    super();

    this.state = {
      user: {},
      loading: true,
      invite: {}
    }
  }

  onLogin(user) {
    this.setState({
      user: user,
      loading: false
    })
  }

  render() {
    return (
      <div className="route invite">
      </div>
    );
  }
}

export default AppComponent;
