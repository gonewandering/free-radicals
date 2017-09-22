require('styles/routes/invite.scss');

import React from 'react';
import Reflux from 'reflux';

import config from '../config';

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
    let invites = Object.values((this.state.user && this.state.user.invites) || {});

    let renderInvites = (invite) => {
      let url = config.baseUrl + '/' + this.state.user.uid + '/' + invite.id;
      if (invite.confirmed) {
        return (
          <div className="btn btn-success btn-block">Invite Used!</div>
        )
      } else {
        return (<div><a href={ url } target="_blank" className="btn btn-info btn-block">{ url }</a></div>);
      }
    }

    return (
      <div className="grid home">
        <Box background="/images/bg/pexels-photo-234059.jpeg" />
        <Box classes={ ["box-white"] } color="#f6e8f9">
          <div className="full-width">
            <h1>Profile</h1>
            <Login></Login>
            { invites.map(renderInvites) }
          </div>
        </Box>
        <Box background="/images/bg/pexels-photo-120271.jpeg" />
        <Box background="/images/bg/pexels-photo-548375.jpeg"></Box>
        <Box background="/images/bg/pexels-photo-251287.jpeg" />
        <Box background="/images/bg/nuclear-weapons-test-nuclear-weapon-weapons-test-explosion-73909.jpeg" />
      </div>
    )
  }
}

export default AppComponent;
