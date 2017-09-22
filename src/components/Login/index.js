require('styles/components/underlay.scss');

import React from 'react'
import Reflux from 'reflux'

import AuthActions from '../../actions/auth'
import AuthStore from '../../stores/auth'

import Loading from '../Loading'
import Form from './Form'

class AppComponent extends Reflux.Component {
  constructor(props) {
    super(props)
    this.store = AuthStore
    this.state = {
      register: props.register || false,
      loading: true
    }
  }

  logout(e) {
    e.preventDefault()
    AuthActions.logout()
  }

  toggleReg(e) {
    e.preventDefault()

    this.setState({
      register: !this.state.register
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading></Loading>
      )
    }

    let settings = {
      onSubmit: AuthActions.login,
      submitLabel: 'Login to Free Radicals'
    }

    let swapText = (
      <div>
        Need to register, <a href="" onClick={ this.toggleReg.bind(this) }>click here</a>.
      </div>
    )

    if (this.state.register === true) {
      settings = {
        onSubmit: AuthActions.register,
        passwordLabel: 'Create a Password',
        submitLabel: 'Register for Free Radicals'
      }

      let swapText = (
        <div>
          Already have an account, <a href="" onClick={ this.toggleReg.bind(this) }>click here</a>.
        </div>
      )
    }

    if (this.state.loading == true) {
      return (
        <Loading label="Loading Authentication..." />
      )
    }

    if (this.state.status == 'logged-in') {
      return null
    }

    return (
      <div className="loginForm">
        <Form onSubmit={ settings.onSubmit } passwordLabel={ settings.passwordLabel || null } submitLabel={ settings.submitLabel }  />
        { swapText }
      </div>
    )
  }
}

export default AppComponent;
