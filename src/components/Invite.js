require('styles/components/invite.scss');

import React from 'react';
import Card from '../components/Card'
import Underlay from '../components/Underlay'
import firebase from '../actions/firebase'

class AppComponent extends React.Component {
  constructor() {
    super();

    this.db = firebase.database().ref("users");

    this.state = {
      user: null,
      loading: true
    }
  }

  render() {

    let url = 'https://free-radicals-4ca3a.firebaseapp.com/' + this.props.uid + '/' + this.props.inviteID;

    return (
      <div className="component invite" key={ url }>
        <a className="btn btn-sm btn-block btn-primary" href={ url }><strong>LINK: </strong> { url }</a>
      </div>
    );
  }
}

export default AppComponent;
