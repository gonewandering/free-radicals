require('styles/components/underlay.scss');

import React from 'react'
import Reflux from 'reflux'

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
      <StripeCheckout token={ this.onToken.bind(this) } name={ 'met·a·noi·a' } image={ 'https://static.pexels.com/photos/164703/pexels-photo-164703.jpeg' } description={ 'One ticket to Metanoia on 10/14' } email={ this.props.user.email } stripeKey="pk_test_PAOzpym0eYI03x7kmJYWTNRr" amount={1000}>
        <button className="btn btn-primary btn-lg btn-block">Buy a ticket!</button>
      </StripeCheckout>
    )
  }
}

export default AppComponent;
