require('styles/components/underlay.scss');

import React from 'react'
import Reflux from 'reflux'
import $ from 'jquery'

class AppComponent extends React.Component {
  submit(e) {
    e.preventDefault()

    let values = {}

    values.email = $('.form.login-form #email-input').val()
    values.password = $('.form.login-form #password-input').val()
    this.props.onSubmit && this.props.onSubmit(values)

    return;
  }

  render() {
    return (
      <form className="form login-form" onSubmit={ this.submit.bind(this) }>
        <div className="form-group">
          <label>{ 'First Name' }</label>
          <input id="first-name" className="form-control input-md input-block" placeholder="Email" />
        </div>
        <div className="form-group">
          <label>{ 'Last Name' }</label>
          <input id="last-name" className="form-control input-md input-block" placeholder="Email" />
        </div>
        <div className="form-group">
          <label>{ this.props.emailLabel || 'Email' }</label>
          <input id="email-input" className="form-control input-md input-block" placeholder="Email" />
        </div>
        <div className="form-group">
          <label>{ this.props.passwordLabel || 'Password' }</label>
          <input type="password" id="password-input" className="form-control input-md input-block" placeholder="Password" />
        </div>
        <div className="form-group">
          <button className="btn btn-lg btn-primary btn-block">{ this.props.submitLabel || 'Submit'}</button>
        </div>
      </form>
    )
  }
}

export default AppComponent;
