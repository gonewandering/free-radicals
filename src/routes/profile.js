require('styles/routes/invite.scss');

import React from 'react';
import Reflux from 'reflux';
import $ from 'jquery';

import config from '../config';

import Login from '../components/User/Login'
import Box from '../components/Box'

import AuthStore from '../stores/auth'
import AuthActions from '../actions/auth'
import InviteActions from '../actions/invite'
import InviteStore from '../stores/invite'

import MessageActions from '../actions/message'

class AppComponent extends Reflux.Component {
  constructor(props) {
    super(props);

    this.stores = [AuthStore, InviteStore];

    this.state = {
      loading: false,
      user: {}
    }
  }

  logout(e) {
    e.preventDefault();

    AuthActions.logout();
    MessageActions.send('Logged out of Free Radicals. Come back soon!');
  }

  sendInvite(sel, e) {
    e.preventDefault();

    sel.email = $('input[name=' + sel.uID + '-' + sel.inviteID + ']').val();

    InviteActions.sendInvite(sel);
    MessageActions.send('Invite sent to ' + sel.email +'.');

    this.state.user.invites[sel.inviteID].sent = sel.email;
    this.setState(this.state);
  }

  resend(sel, e) {
    e.preventDefault();
    this.state.user.invites[sel.id].sent = undefined;
    this.setState(this.state);
  }

  render() {
    let headline = null
    let invites = Object.values((this.state.user && this.state.user.invites) || {});
    let invitesTable = null

    let renderInvites = (invite, i) => {
      let url = config.baseUrl + '/' + this.state.user.uid + '/' + invite.id;
      let sel = {uID: this.state.user.uid, inviteID: invite.id};
      let invited = null;

      if (invite.confirmed) {
        invited = ' ' + invite.confirmed.firstName + ' ' + invite.confirmed.lastName

        return (
          <tr className="invite-tr">
            <td>
              <div className="invite-name">
                <span className="invite-number">{ i + 1 }.)</span><em> { invite.confirmed.email }</em>
              </div>
            </td>
            <td width="70px">
              <span className="label label-green">Confirmed!</span>
            </td>
          </tr>
        )
      }

      if (invite.sent) {
        return (
          <tr className="invite-tr">
            <td>
              <div className="invite-name">
                <span className="invite-number">{ i + 1 }.)</span>
                <a href="" onClick={ this.resend.bind(this, invite) }><em> { invite.sent }</em></a>
              </div>
            </td>
            <td className="align-right">
              <div className="invite-url">
                <span className="label label-blue">Sent!</span> <a href={ url } target="_blank" className="label label-green">Invite URL</a>
              </div>
            </td>
          </tr>
        )
      }

      return (
        <tr className="invite-tr">
          <td>
            <div className="invite-url">
              <span className="invite-number">{ i + 1 }.)</span>
              <input className="invite-input form-control input-sm" name={ sel.uID + '-' + sel.inviteID } />
            </div>
          </td>
          <td width="70px" className="align-right">
            <div className="invite-url">
              <a className="label" href={ url } onClick={ this.sendInvite.bind(this, sel) }>Send</a>
            </div>
          </td>
        </tr>
      )
    }

    invitesTable = (
      <table className="table">
        <tbody>
          { invites.map(renderInvites.bind(this)) }
        </tbody>
      </table>
    )

    if (!this.state.user.firstName && !this.state.loading) {
      headline = (
        <div>
          <h2>Invitee Login</h2>
          <p>If you're already registered for the next Free Radicals event, login here. You'll be able to manage your invites and see details about the event.</p>
        </div>
      )
    }

    return (
      <div className="grid home">
        <Box background={ require('../images/bg/pexels-photo-234059.jpeg') } />
        <Box classes={ ['box-white'] }>
          <div className="full-width block-black">
            { headline }
            <Login>
              <h2>Hi, { this.state.user.firstName }!</h2>
              <p>You've RSVPed to the next Free Radicals event. Below are your invites. You'll be able to see when they're used and by who.</p>
              { invitesTable }
              <a className="btn btn-sm btn-primary" href="" onClick={ this.logout }>Sign Out!</a>
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
