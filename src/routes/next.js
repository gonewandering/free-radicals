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
        <Box color="#001122">
          <div className="rsvp-text full-width">
            <h1>In Good Company</h1>
            <p className="sub-head">An event to celebrate the creative in all of us. Benefiting the awesome charity <a href="https://missamazing.org"> Miss Amazing</a>.
            <br /> DJ, Cocktails, Art. Friends.</p>
            <p><i className="fa fa-circle fa-2x text-blue"></i> <i className="fa fa-circle fa-2x text-turq"></i> <i className="fa fa-circle fa-2x text-yellow"></i></p>
            <h3>Saturday, October 14th, 2017</h3>
            <h5><span>9PM-2AM</span> | Williamsburg</h5>
            <h5>$25 entry | Open bar</h5>
            <h4 className="text-yellow">Invite Only</h4>
            <p className="detail-text">All proceeds from the party go to <a href="http://missamazing.org">Miss Amazing</a>.</p>
            <p className="sponsor-text">Sponsored by <a href="https://www.fiveboroughs.com/"><img src={ require('../images/logos/FBBC_BRAND_STRIP_LOGO.png') } /></a></p>
          </div>
        </Box>
        <Box background={ require('../images/bg/pexels-photo-556663.jpeg') } />
        <Box background={ require('../images/bg/pexels-photo-132204.jpg') } />
        <Box background={ require('../images/bg/pexels-photo-251287.jpeg') } />
        <Box background={ require('../images/bg/autumn-leaves.jpeg') } />
      </div>
    )
  }
}

export default AppComponent;
