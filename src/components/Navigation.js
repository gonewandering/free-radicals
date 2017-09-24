require('styles/components/messages.scss');

import React from 'react';
import Reflux from 'reflux';

import MessageActions from '../actions/message'
import MessageStore from '../stores/message'

class AppComponent extends Reflux.Component {
  constructor() {
    super()
    this.store = MessageStore;

    this.state = {
      nav: false
    }
  }

  awk(id, e) {
    e.preventDefault();
    MessageActions.awk(id);
  }

  toggleNav(e) {
    e.preventDefault();

    this.setState({
      nav: !this.state.nav
    })
  }

  render() {
    return (
      <nav className="navigation navbar navbar-light">
        <a className="navbar-brand" href="/">FREE RADICALS <span className="gray">NYC</span></a>

        <button onClick={ this.toggleNav.bind(this) }>
          <i className={ 'fa' + (this.state.nav ? ' fa-angle-left' : ' fa-angle-right') }></i>
        </button>

        <div className={ 'navbar-collapse' + (!this.state.nav ? ' collapse' : '') } id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/profile">Members</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/next">Our Next Event</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/faq">FAQ</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default AppComponent;
