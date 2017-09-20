require('styles/routes/home.scss');

import React from 'react';
import Reflux from 'reflux';
import Login from '../components/Login/index'

import AuthStore from '../stores/auth'
import AuthActions from '../actions/auth'

import Box from '../components/Box'

class AppComponent extends Reflux.Component {

  constructor(props) {
    super(props);

    this.store = AuthStore

    this.state = {
      user: {},
      invites: []
    }
  }

  render() {
    return (
      <div>
        <div className="grid home">
          <Box classes={ ['box-black'] } color="#000000">
            <div>
              <p>
                Free Radicals is a community created by a few friends who had a fierce desire to connect creative, inspirational individuals from all ends of the earth. With true passion in immersive data, technology, art, + music—the team’s also invested in creating a transparent environment for social issues, openness + awareness.
              </p>
              <p>
                Already a member, <a className="btn btn-white" href="/profile">login</a>. Or, check out our <a className="btn btn-white" href="/faq">FAQ</a> if you're interested in joining.
              </p>
            </div>
          </Box>
          <Box background="https://static.pexels.com/photos/270859/pexels-photo-270859.jpeg">
            <h1 className="logo-text">Free<br />Radicals</h1>
          </Box>
          <Box background="https://static.pexels.com/photos/47424/pexels-photo-47424.jpeg" />
          <Box background="https://static.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg" />
          <Box background="https://static.pexels.com/photos/47080/boy-african-africa-child-47080.jpeg"/>
          <Box background="https://static.pexels.com/photos/64210/hibiscus-blossom-bloom-flower-64210.jpeg" />
        </div>
      </div>
    )
  }
}

export default AppComponent;
