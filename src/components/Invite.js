require('styles/components/invite.scss');

import React from 'react';
import Card from '../components/Card'
import Underlay from '../components/Underlay'
import firebase from '../sources/firebase'

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
    let link = null;

    if (!this.props.data.confirmed) {
      link = (
        <a className="btn btn-sm btn-block btn-primary" href={ url }><strong>LINK: </strong> { url }</a>
      )
    } else {
      link = (
        <a className="btn btn-sm btn-block btn-success" disabled="true" href={ url }><strong>Attending: </strong> { this.props.data.confirmedName }</a>
      )
    }
    return (
      <div className="component invite" key={ url }>
        { link }
      </div>
    );
  }
}

export default AppComponent;
