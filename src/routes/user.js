require('styles/routes/home.scss');

import React from 'react';
import Card from '../components/Card'
import Underlay from '../components/Underlay'
import Invites from '../components/Invites'
import Login from '../components/Login'
import firebase from '../actions/firebase'

class AppComponent extends React.Component {
  constructor(props) {
    super();

    this.state = {
      user: {},
      loading: true,
      invite: {}
    }
  }

  onLogin(user) {
    this.setState({
      user: user,
      loading: false
    })
  }

  render() {
    return (
      <div className="route invite">
        <Underlay>
          <Card>
            <Login onChange={ this.onRSVPed.bind(this) }>
              Welcome { this.state.user.name }, Glad to see you.
            </Login>
          </Card>
        </Underlay>
      </div>
    );
  }
}

export default AppComponent;
