require('styles/routes/home.scss');

import React from 'react';
import Card from '../components/Card'
import Underlay from '../components/Underlay'
import Login from '../components/Login'
import Logout from '../components/Logout'
import Invites from '../components/Invites'

import firebase from '../actions/firebase'

class AppComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      user: {},
      invites: []
    }
  }

  onAuthChange(user) {
    const self = this;

    if (user) {
      this.invites = firebase.database().ref('invites/' + user.uid);

      this.invites.once('value').then(value => {
        self.setState({
          invites: value.val(),
          user: user,
          loading: false
        });
      });
    } else {
      this.setState({
        user: user,
        loading: false
      })
    }
  }

  componentWillMount() {
    this.auth = firebase.auth().onAuthStateChanged(this.onAuthChange.bind(this));
  }

  componentWillUnmount() {
    delete this.auth
  }

  render() {
    let styles = {
      backgroundImage: 'url(https://static.pexels.com/photos/259351/pexels-photo-259351.jpeg)'
    }

    let homeContent = null;

    if (this.state.user) {
      console.log(this.state.invites);

      homeContent = (
        <Card>
          <Invites user={ this.state.user } data={ this.state.invites || {} }></Invites>
          <Login></Login>
        </Card>
      );
    } else {
      homeContent = (
        <Card>
          <h1>Free Radicals</h1>
          <p>A group of artists, technologists, and creators focused on improving the world around us—and having fun.</p>
        </Card>
      );
    }

    return (
      <div className="route home">
        <Underlay styles={ styles }>
          { homeContent }
        </Underlay>
      </div>
    );
  }
}

export default AppComponent;
