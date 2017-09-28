require('styles/components/underlay.scss');

import React from 'react'
import Reflux from 'reflux'

import config from '../../config'

import StripeCheckout from 'react-stripe-checkout';

class AppComponent extends Reflux.Component {
  constructor(props) {
    super(props)

    this.state = {
      token: props.register || false
    }

    this.props = props || {}
  }

  onToken(token) {
    this.props.onPayment && this.props.onPayment(token)
  }

  render() {
    return (
      <StripeCheckout onToken={ this.onToken } token={ this.onToken.bind(this) } name={ 'Free Radicals' } image={ '../../favicon.png' } description={ 'Ticket to In Good Company' } email={ this.props.user.email } stripeKey={ config.stripe.key } amount={2500} zipCode={ true } panelLabel={ 'Buy Ticket' }>
        <button className="btn btn-primary btn-lg btn-block">Buy a ticket!</button>
      </StripeCheckout>
    )
  }
}

export default AppComponent;
