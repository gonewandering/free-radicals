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
        <Box classes={ ['box-white'] }>
          <div className="full-width">
            <h2>FAQ</h2>
            <p><strong>What is Free Radicals?</strong></p>
            <p>We're passionate group of friends in New York, interested in improving the world around us through art, technology & design.</p>
            <p><strong>How can I become a member?</strong></p>
            <p>Membership is invite only. You might get an invite to an FR party sent from a friend, or you can join the waitlist.</p>
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
