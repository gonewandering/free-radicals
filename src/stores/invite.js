import Reflux from 'reflux'
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
    const self = this;

    let inviteRef = firebase.database().ref('users/' + options.invite.from + '/invites/' + options.invite.id + '/confirmed');

    return inviteRef.set(options.invitee.uid).then ((res) => {
      return options
    })
  }

  generateInvites(options) {
    const self = this;

    let invitesAvail = options.invite.count || 1;
    let invites = []
    let iPromises = []
    let inviteeRef = firebase.database().ref('users/' + options.invitee.uid)

    while(invitesAvail > 0) {
      let id = Math.random().toString(36).substring(7);

      let invite = {
        from: options.invitee.uid,
        confirmed: false,
        count: options.invite.count - 1,
        id: id
      }

      invites.push(invite);

      iPromises.push(inviteeRef.child('invites/' + id).set(invite))
      invitesAvail--
    }

    return Promise.all(iPromises).then(res => {
      options.invites = invites;
      return options;
    })
  }

  createUserProfile(options) {
    let userRef = firebase.database().ref('users/' + options.invitee.uid);

    options.invitee = {
      name: options.invitee.displayName,
      email: options.invitee.email,
      uid: options.invitee.uid,
      payment: options.payment,
      invitedBy: options.invite.from,
      inviteID: options.invite.id
    }

    return userRef.set(options.invitee)
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
      console.log(invite.val());
      self.setState({
        loading: false,
        invite: invite.val()
      })
    })
  }
}

export default InviteStore
