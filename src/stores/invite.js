import Reflux from 'reflux'
import $ from 'jquery'

import config from '../config'
import InviteActions from '../actions/invite'
import AuthActions from '../actions/auth'
import MessageActions from '../actions/message'

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

  createInvite(user, invite) {
    let inviteeRef = firebase.database().ref('users/' + user.uid + '/invites')
    let id = Math.random().toString(36).substring(7);

    let inviteData = {
      from: user.uid,
      confirmed: false,
      count: (invite && invite.count - 1) || 3,
      id: id
    }

    return inviteeRef.child(id).set(inviteData)
      .then(AuthActions.getProfile.bind(null, user))
  }

  generateInvites(options) {
    let invitesAvail = options.invite.count || 1;
    let invites = []
    let iPromises = []
    let inviteeRef = firebase.database().ref('users/' + options.invitee.uid + '/invites')

    while(invitesAvail > 0) {
      let invite = this.createInvite(options.invitee, options.invite)
      iPromises.push(invite)
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
    options.invitee.receipt = options.receipt;
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

    return this.processPayment(options)
      .then(this.createUserProfile.bind(this, options))
      .then(this.markRSVPed.bind(this, options))
      .then(this.generateInvites.bind(this, options))
      .then(this.sendRSVP.bind(this, options))
      .then(this.rsvpCompleted.bind(this, options))
      .catch(this.rsvpFailed);
  }

  sendRSVP(options) {
    return $.get(config.apiUrl + '/send?template=rsvp&email=' + options.invitee.email + '&uid=' + options.invitee.uid)
      .catch(err => { console.log(err); })
  }

  processPayment(options) {
    var popts = {
      stripeToken: options.payment.id
    };

    return $.ajax({
      url: config.apiUrl + '/checkout',
      method: 'POST',
      data: popts,
      dataType: 'json'
    }).then(resp => {
      options.receipt = resp;
      return options;
    }).catch(err => {
      MessageActions.send('It seems there was a problem with your payment.');
      return err;
    })
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
