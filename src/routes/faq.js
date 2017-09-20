require('styles/routes/invite.scss');

import React from 'react';
import Reflux from 'reflux';

import Login from '../components/Login/index'
import Box from '../components/Box'
import Invite from '../components/Invite/index'

import InviteActions from '../actions/invite'
import InviteStore from '../stores/invite'

import AuthStore from '../stores/auth'
import Checkout from '../components/Checkout/index'

class AppComponent extends Reflux.Component {
  constructor(props) {
    super(props);

    this.store = AuthStore;

    this.state = {
      loading: false,
      user: {}
    }
  }

  render() {

    return (
      <div className="grid home">
        <Box background="https://static.pexels.com/photos/234059/pexels-photo-234059.jpeg" />
        <Box classes={ ["box-white"] } color="#f9efe8">
          <div className="full-width">
            <h1>FAQ</h1>
          </div>
        </Box>
        <Box background="https://static.pexels.com/photos/120271/pexels-photo-120271.jpeg" />
        <Box background="https://static.pexels.com/photos/247292/pexels-photo-247292.jpeg"></Box>
        <Box background="https://static.pexels.com/photos/251287/pexels-photo-251287.png" />
        <Box background="https://static.pexels.com/photos/73909/nuclear-weapons-test-nuclear-weapon-weapons-test-explosion-73909.jpeg" />
      </div>
    )
  }
}

export default AppComponent;
