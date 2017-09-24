import Reflux from 'reflux'
import $ from 'jquery'

import config from '../config'
import InviteActions from '../actions/invite'

import firebase from '../sources/firebase'

class InviteStore extends Reflux.Store {
  constructor() {
    super()

    this.listenables = InviteActions;

    this.state = {
      loading: true
    }
  }

  markRSVPed(options) {
    let inviteRef = firebase.database().ref('users/' + options.invite.from + '/invites/' + options.invite.id + '/confirmed');

    return inviteRef.set(options.invitee).then (() => {
      return options
    })
  }

  generateInvites(options) {
    let invitesAvail = options.invite.count || 1;
    let invites = []
    let iPromises = []
    let inviteeRef = firebase.database().ref('users/' + options.invitee.uid + '/invites')

    while(invitesAvail > 0) {
      let id = Math.random().toString(36).substring(7);

      let invite = {
        from: options.invitee.uid,
        confirmed: false,
        count: options.invite.count - 1,
        id: id
      }

      invites.push(invite);

      iPromises.push(inviteeRef.child(id).set(invite))
      invitesAvail--
    }

    return Promise.all(iPromises).then(() => {
      options.invites = invites;
      return options;
    })
  }

  createUserProfile(options) {
    let userRef = firebase.database().ref('users/' + options.invitee.uid);
    let promises = []

    options.invitee.payment = options.payment;
    options.invitee.invitedBy = options.invite.from;
    options.invitee.inviteID = options.invite.id;

    return userRef.set(options.invitee).then(() => {
      return options;
    })
  }

  rsvpCompleted(options) {
    this.setState({
      invites: options.invites,
      invite: options.invite,
      invitee: options.invitee,
      loading: false
    })
  }

  rsvp(options) {
    this.setState({
      loading: true
    });

    return this.createUserProfile(options)
      .then(this.markRSVPed.bind(this, options))
      .then(this.generateInvites.bind(this, options))
      .then(this.rsvpCompleted.bind(this, options))
      .catch(this.rsvpFailed);
  }

  lookup(options) {
    const self = this;

    let inviteRef = firebase.database().ref('users/' + options.uID + '/invites/' + options.inviteID);

    return inviteRef.once('value').then(invite => {
      self.setState({
        loading: false,
        invite: invite.val() || {status: 'not-found'}
      })
    })
  }

  sendInvite(options) {
    const self = this;
    this.setState({
      loading: true
    });

    let inviteRef = firebase.database().ref('users/' + options.uID + '/invites/' + options.inviteID);

    let emailSend = $.get(config.apiUrl + '/send?template=invite&email=' + options.email + '&uid=' + options.uID + '&iid=' + options.inviteID)
      .catch(err => { console.log(err); })

    return emailSend.then(() => {
      return inviteRef.child('sent').set(options.email)
    })
  }
}

export default InviteStore
