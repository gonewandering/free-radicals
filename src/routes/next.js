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
        <Box background={ require('../images/bg/sunset-people.jpeg') } />
        <Box color="#000">
          <div className="full-width align-center">
            <h2>In Good Company</h2>
            <h4>October 14th, Williamsburg</h4>
          </div>
        </Box>
        <Box classes={ ['box-white'] }>
          <div>
            <p>Our next party will be held on October 14th, in a unique, creative loft located in Williamsburg. Two DJs, art and a specially curated open cocktail bar help us welcome in fall in style.</p>
            <br />
            <p className="detail-text">All proceeds from the party go to <a href="http://missamazing.org">Miss Amazing</a></p>
            <p className="sponsor-text">Sponsored by our friends at <a href="https://www.fiveboroughs.com/"><img src={ require('../images/logos/FBBC_BRAND_STRIP_LOGO_BLACK.png') } /></a></p>
            <h6 className="text-turq">This event is by invitation-only.</h6>
          </div>
        </Box>
        <Box background={ require('../images/bg/pexels-photo-132204.jpg') } />
        <Box background={ require('../images/bg/pexels-photo-251287.jpeg') } />
        <Box background={ require('../images/bg/autumn-leaves.jpeg') } />
      </div>
    )
  }
}

export default AppComponent;
