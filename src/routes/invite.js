require('styles/routes/invite.scss');

import React from 'react';
import Reflux from 'reflux';

import Box from '../components/Box'
import Invite from '../components/Invite/index'

import AuthStore from '../stores/auth'
import InviteStore from '../stores/invite'

class AppComponent extends Reflux.Component {
  constructor(props) {
    super(props);

    this.stores = [AuthStore, InviteStore];

    this.state = {
      user: {},
      invites: [],
      payment: null
    }
  }

  render() {
    return (
      <div className="grid home">
        <Box background="https://static.pexels.com/photos/342520/pexels-photo-342520.jpeg" />
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
        <Box classes={ ['box-white'] } >
          <Invite invite={ this.props.match.params } user={ this.state.user } />
        </Box>
        <Box classes={ ['box-black'] } >
          <div className="rsvp-text full-width">
            <h2>Miss Amazing</h2>
            <br />
            <p className="sub-head">A nonprofit organization dedicated to providing opportunities for girls & women with disabilities to build confidence, develop important life skills, and to make themselves more seen & heard in their communities. Within the past 10 years, the organization has created a strong presence in about 32 states within the U.S.</p>
            <p className="detail-text"><a href="http://missamazing.org"> More Details on Miss Amazing Here >></a></p>
          </div>
        </Box>
        <Box background={ require('../images/bg/business-time-clock-clocks-48770.jpeg') } />
        <Box background={ require('../images/bg/soap-bubble-colorful-ball-soapy-water.jpeg') } />
      </div>
    )
  }
}

export default AppComponent;
