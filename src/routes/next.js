require('styles/routes/invite.scss');

import React from 'react';
import Reflux from 'reflux';

import Box from '../components/Box'

class AppComponent extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: {}
    }
  }

  render() {

    return (
      <div className="grid home">
        <Box background={ require('../images/bg/pexels-photo-234059.jpeg') } />
        <Box classes={ ['box-white'] } color="#f9efe8">
          <div className="full-width">
            <h1>Our Next Event</h1>
            <p></p>
          </div>
        </Box>
        <Box background={ require('../images/bg/pexels-photo-120271.jpeg') } />
        <Box background={ require('../images/bg/pexels-photo-247292.jpeg') } />
        <Box background={ require('../images/bg/pexels-photo-251287.jpeg') } />
        <Box background={ require('../images/bg/nuclear-weapons-test-nuclear-weapon-weapons-test-explosion-73909.jpeg') } />
      </div>
    )
  }
}

export default AppComponent;
