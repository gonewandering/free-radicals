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
      <StripeCheckout token={ this.onToken.bind(this) } name={ 'In Good Company' } image={ 'https://static.pexels.com/photos/164703/pexels-photo-164703.jpeg' } description={ 'One ticket to In Good Company on 10/14' } email={ this.props.user.email } stripeKey={ config.stripe.key } amount={1000}>
        <button className="btn btn-primary btn-lg btn-block">Buy a ticket!</button>
      </StripeCheckout>
    )
  }
}

export default AppComponent;
