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

    this.stores = [AuthStore, InviteStore];

    this.state = {
      user: {},
      invites: [],
      payment: null
    }
  }

  render() {
    return (
      <div className="grid home">
        <Box background={ require("../images/bg/pexels-photo-397219.jpeg") } />
        <Box color="#630015">
          <div>
            <h1 className="logo">RSVP</h1>
            <p>10/14: Ready for take off? “In Good Company” kicks off in autumn-- because as the seasons begin to change, we are gifted with a moment to reflect on the people who have changed our lives and to open ourselves up to unexpected new connections that will shape us for years to come.</p>
          </div>
        </Box>
        <Box classes={ ["box-white"] } >
          <div className="invite-box">
            <Invite invite={ this.props.match.params } user={ this.state.user } />
          </div>
        </Box>
        <Box background={ require("../images/bg/business-time-clock-clocks-48770.jpeg") } />
        <Box background={ require("../images/bg/nuclear-weapons-test-nuclear-weapon-weapons-test-explosion-73909.jpeg") } />
        <Box background={ require("../images/bg/soap-bubble-colorful-ball-soapy-water.jpeg") } />
      </div>
    )
  }
}

export default AppComponent;
