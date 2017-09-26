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
          <Box color="#001122">
            <div>
              <p>A passionate group of friends in New York, interested in improving the world around us through <strong>art</strong>, <strong>technology</strong> & <strong>design</strong>.</p>
              <p><i className="fa fa-circle fa-2x text-blue"></i> <i className="fa fa-circle fa-2x text-turq"></i> <i className="fa fa-circle fa-2x text-yellow"></i></p>
            </div>
          </Box>
          <Box background={ require('../images/bg/pexels-photo-270859.jpeg') } />
          <Box background={ require('../images/bg/pexels-photo-532561.jpg') } />
          <Box background={ require('../images/bg/pexels-photo-343717.jpg') } />
          <Box background={ require('../images/bg/pexels-photo-umbrellas.jpg') } />
        </div>
      </div>
    )
  }
}

export default AppComponent;
