require('styles/routes/home.scss');

import React from 'react';
import Reflux from 'reflux';

import Box from '../components/Box'

class AppComponent extends Reflux.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      invites: []
    }
  }

  render() {
    return (
      <div>
        <div className="grid home">
          <Box background={ require('../images/bg/pexels-photo-47424.jpeg') } />
          <Box classes={ ['box-white'] }>
            <div>
              <p>
                Free Radicals is a community created by a few friends who had a fierce desire to connect creative, inspirational individuals from all ends of the earth. With true passion in immersive data, technology, art, + music—the team’s also invested in creating a transparent environment for social issues, openness + awareness.
              </p>
            </div>
          </Box>
          <Box background={ require('../images/bg/pexels-photo-270859.jpeg') } />
          <Box background={ require('../images/bg/the-interior-of-the-repair-interior-design-159045.jpeg') } />
          <Box background={ require('../images/bg/boy-african-africa-child-47080.jpeg') } />
          <Box background={ require('../images/bg/hibiscus-blossom-bloom-flower-64210.jpeg') } />
        </div>
      </div>
    )
  }
}

export default AppComponent;
