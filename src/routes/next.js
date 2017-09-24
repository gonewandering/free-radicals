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
        <Box color="#000">
          <div className="full-width align-center">
            <h2>In Good Company</h2>
            <h4>October 18th, Williamsburg</h4>
          </div>
        </Box>
        <Box classes={ ['box-white'] }>
          <div>
            <p>Our next party will be held on October 18th, in Williamsburg. Two DJs, art and a specially curated ope cocktail bar help us welcome in fall in style.</p>
          </div>
        </Box>
        <Box background={ require('../images/bg/pexels-photo-251287.jpeg') } />
        <Box background={ require('../images/bg/pexels-photo-247292.jpeg') } />
        <Box background={ require('../images/bg/nuclear-weapons-test-nuclear-weapon-weapons-test-explosion-73909.jpeg') } />
      </div>
    )
  }
}

export default AppComponent;
