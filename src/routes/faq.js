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
        <Box background={ require("../images/bg/pexels-photo-234059.jpeg") } />
        <Box classes={ ["box-white"] } color="#f9efe8">
          <div className="full-width">
            <h1>FAQ</h1>
          </div>
        </Box>
        <Box background={ require("../images/bg/pexels-photo-120271.jpeg") } />
        <Box background={ require("../images/bg/pexels-photo-247292.jpeg") } />
        <Box background={ require("../images/bg/pexels-photo-251287.jpeg") } />
        <Box background={ require("../images/bg/nuclear-weapons-test-nuclear-weapon-weapons-test-explosion-73909.jpeg") } />
      </div>
    )
  }
}

export default AppComponent;
