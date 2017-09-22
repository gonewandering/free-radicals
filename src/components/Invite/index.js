require('styles/components/underlay.scss');

import React from 'react'
import Reflux from 'reflux'

import Loading from '../Loading'
import Checkout from '../Checkout'
import Login from '../Login'

import InviteActions from '../../actions/invite'
import InviteStore from '../../stores/invite'

class AppComponent extends Reflux.Component {
  constructor(props) {
    super(props)
    this.store = InviteStore

    this.state = {
      user: props.user,
      loading: true
    }
  }

  componentDidMount() {
    InviteActions.lookup(this.props.invite)
  }

  onPayment(payment) {
    InviteActions.rsvp({
      invitee: this.props.user,
      invite: this.state.invite,
      payment: payment
    });
  }

  render() {
    let content = null;

    if (this.state.loading === true) {
      return (
        <Loading></Loading>
      )
    }

    if (this.state.invite == null) {
      content = (
        <div>
          <h2>Uh oh</h2>
          <p className="subhead">That invite was not found.</p>
        </div>
      )
    }

    if (this.state.invite && this.state.invite.confirmed) {
      content = (
        <div>
          <h2>Uh oh</h2>
          <p className="subhead">That invite was already used.</p>
        </div>
      )
    }

    var steps = {
      1: (
        <div>
          <h2>Step 1</h2>
          <p>Register for the event.</p>
          <Login register={ true } />
        </div>
      ),
      2: (
        <div>
          <h2>Step 2</h2>
          <p className="subhead">Tickets for the party are $10 and all profits go to Miss Amazing!</p>
          <Checkout user={ this.props.user } onPayment={ this.onPayment.bind(this) }></Checkout>
        </div>
      )
    }

    if (!content) {
      content = steps[1]

      if (this.props.user && this.props.user.uid) {
        content = steps[2]
      }

      if ((this.state.invitee && this.state.invitee.payment) || (this.props.user && this.props.user.invites)) {
        content = (
          <div>
            <h2>Step 3</h2>
            <p className="subhead">Surround yourself with inspiration + celebrate new changes. If you're receiving this invite, you have inspired someone. Invite someone that also inspires you.</p>
            <a href="/profile" className="btn btn-primary btn-lg btn-block">Invite Friends</a>
          </div>
        )
      }
    }

    return (
      <div>
        { content }
      </div>
    )
  }
}

export default AppComponent;
