require('styles/components/underlay.scss');

import React from 'react'
import Reflux from 'reflux'
import $ from 'jquery'

import AuthActions from '../../actions/auth'
import AuthStore from '../../stores/auth'

class AppComponent extends Reflux.Component {
  constructor() {
    super()
    this.store = AuthStore

    this.state = {
      user: {}
    }
  }

  login(e) {
    e.preventDefault()

    let values = {}

    values.email = $('.form.login-form #email-input').val()
    values.password = $('.form.login-form #password-input').val()

    AuthActions.login(values)

    return;
  }

  render() {
    if (this.state.user.uid) {
      if (this.props.children) {
        return (
          <div className="login logged-in">
            { this.props.children }
          </div>
        )
      }

      return null
    }

    return (
      <form className="form login-form" onSubmit={ this.login.bind(this) }>
        <div className="form-group">
          <label>{ this.props.emailLabel || 'Your Email' }</label>
          <input id="email-input" className="form-control input-lg input-block" placeholder="Email" />
        </div>
        <div className="form-group">
          <label>{ this.props.passwordLabel || 'Your Password' }</label>
          <input type="password" id="password-input" className="form-control input-lg input-block" placeholder="Password" />
        </div>
        <button className="btn btn-lg btn-primary btn-block">{ this.props.submitLabel || 'Sign In!'}</button>
      </form>
    )
  }
}

export default AppComponent;
