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
            <p>We're a passionate group of friends in New York, interested in improving the world around us through immersive art, technology & design.</p>
            <br />
            <p><strong>How can I become a member?</strong></p>
            <p>Membership is by invite only. You might get an invite to an FR party sent from a friend, or you can email us (<a href="mailto://info@wearefreeradicals.org">info@wearefreeradicals.org</a>) and request to join the waitlist.</p>
          </div>
        </Box>
        <Box background={ require('../images/bg/pexels-photo-galaxy-person.jpg') } />
        <Box background={ require('../images/bg/pexels-photo-373965.jpeg') } />
        <Box background={ require('../images/bg/pexels-photo-139321.jpeg') } />
        <Box background={ require('../images/bg/create.jpeg') } />
      </div>
    )
  }
}

export default AppComponent;
