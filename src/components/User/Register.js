require('styles/components/underlay.scss');

import React from 'react'
import Reflux from 'reflux'
import $ from 'jquery'

import AuthActions from '../../actions/auth'

class AppComponent extends React.Component {
  submit(e) {
    e.preventDefault()

    let values = {}
    const getVal = (key) => { return $('.form.login-form #' + key).val(); }

    $('.register-form input').serializeArray().map(kv => {
      values[kv['name']] = kv['value']
    })

    AuthActions.register(values)

    return;
  }

  render() {
    return (
      <form className="form register-form" onSubmit={ this.submit.bind(this) }>
        <div className="form-group">
          <label>{ 'First Name' }</label>
          <input id="firstName" name="firstName" className="form-control input-md input-block" placeholder="First Name" />
        </div>
        <div className="form-group">
          <label>{ 'Last Name' }</label>
          <input id="lastName" name="lastName" className="form-control input-md input-block" placeholder="Last Name" />
        </div>
        <div className="form-group">
          <label>If you were an animal, what would you be?</label>
          <input id="animal" name="animal" className="form-control input-md input-block" placeholder="Cheetah, Aardvark, Narwal" />
        </div>
        <div className="form-group">
          <label>{ this.props.emailLabel || 'Email' }</label>
          <input id="email" name="email" className="form-control input-md input-block" placeholder="Email" />
        </div>
        <div className="form-group">
          <label>{ this.props.passwordLabel || 'Password' }</label>
          <input type="password" name="password" id="password" className="form-control input-md input-block" placeholder="Password" />
        </div>
        <div className="form-group">
          <button className="btn btn-lg btn-primary btn-block">{ this.props.submitLabel || 'Register!'}</button>
        </div>
      </form>
    )
  }
}

export default AppComponent;
