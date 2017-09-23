require('styles/routes/invite.scss');

import React from 'react';
import Reflux from 'reflux';

import config from '../config';

import Login from '../components/User/Login'
import Box from '../components/Box'

import AuthStore from '../stores/auth'
import AuthActions from '../actions/auth'

class AppComponent extends Reflux.Component {
  constructor(props) {
    super(props);

    this.store = AuthStore;

    this.state = {
      loading: false,
      user: {}
    }
  }

  logout(e) {
    e.preventDefault();

    AuthActions.logout();
  }

  copyUrl(url, e) {
    e.preventDefault();
  }

  render() {
    let invites = Object.values((this.state.user && this.state.user.invites) || {});

    let renderInvites = (invite, i) => {
      let url = config.baseUrl + '/' + this.state.user.uid + '/' + invite.id;
      let invited = null
      if (invite.confirmed) {
        invited = ' ' + invite.confirmed.firstName + ' ' + invite.confirmed.lastName
      }

      return (
          <table className="table">
            <tbody>
              <tr className="invite-tr">
                <td width="60%">
                  <div className="invite-name">
                    <span className="invite-number">{ i + 1 }.)</span><em>{ invited }</em></div>
                </td>
                <td className="align-right">
                  <a href={ url } target="_blank">View</a>
                </td>
                <td className="align-right">
                  <a href={ url } onClick={ this.copyUrl.bind(this, url) }>Copy</a>
                </td>
              </tr>
            </tbody>
          </table>
      )
    }

    return (
      <div className="grid home">
        <Box background={ require('../images/bg/pexels-photo-234059.jpeg') } />
        <Box classes={ ['box-white'] } color="#CCEEFF">
          <div className="full-width block-black">
            <Login title="Invitee Login">
              <h2>Hi, { this.state.user.firstName }!</h2>
              <p>You've RSVPed to the next Free Radicals event. Below are your invites. You'll be able to see when they're used and by who.</p>
              { invites.map(renderInvites.bind(this)) }
              <a href="" onClick={ this.logout }>Logout!</a>
            </Login>
          </div>
        </Box>
        <Box background={ require('../images/bg/pexels-photo-120271.jpeg') } />
        <Box background={ require('../images/bg/pexels-photo-247292.jpeg') }></Box>
        <Box background={ require('../images/bg/pexels-photo-251287.jpeg') } />
        <Box background={ require('../images/bg/nuclear-weapons-test-nuclear-weapon-weapons-test-explosion-73909.jpeg') } />
      </div>
    )
  }
}

export default AppComponent;
