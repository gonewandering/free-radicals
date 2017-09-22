import Reflux from 'reflux'
import AuthActions from '../actions/auth'
import firebase from '../sources/firebase'
import _ from 'underscore'

class AuthStore extends Reflux.Store {
  constructor() {
    super()

    const self = this

    this.listenToMany(AuthActions)

    this.state = {
      loading: true
    }

    firebase.auth().onAuthStateChanged(user => {
      self.updateState.bind(self)(user)
    })
  }

  updateState(user) {
    const self = this;

    if (user && user.uid) {
      let userRef = firebase.database().ref('users/' + user.uid);

      userRef.once('value').then(invitee => {
        let profile = _.extend({}, user, invitee.val() || {});

        self.setState({
          loading: false,
          status: 'logged-in',
          user: profile
        })
      });
    } else {
      this.setState({
        loading: false,
        status: 'logged-out',
        user: {}
      })
    }

  }

  register(options) {
    if (!options.email || !options.password) { return this.registerFailed(); }

    this.setState({
      loading: true
    })

    firebase.auth().createUserWithEmailAndPassword(options.email, options.password)
      .then(this.registerCompleted.bind(this))
      .catch(this.registerFailed.bind(this))
  }

  registerCompleted(user) {
    this.setState({
      status: 'logged-in',
      loading: false,
      user: user
    })
  }

  registerFailed() {
    this.setState({
      status: 'error',
      loading: false,
      user: {}
    })
  }

  login(options) {
    this.setState({
      loading: true
    })

    firebase.auth().signInWithEmailAndPassword(options.email, options.password)
      .then(this.loginCompleted.bind(this))
      .catch(this.loginFailed.bind(this))
  }

  loginCompleted(user) {
    this.setState({
      status: 'logged-in',
      loading: false,
      user: user
    })
  }

  loginFailed(err) {
    this.setState({
      status: 'error',
      loading: false,
      user: {},
      err: err
    })
  }

  logout() {
    this.setState({
      loading: true
    })

    firebase.auth().signOut()
      .then(this.logoutCompleted.bind(this))
      .catch(this.logoutFailed.bind(this))
  }

  logoutCompleted() {
    this.setState({
      status: 'logged-out',
      loading: false,
      user: {}
    })
  }

  logoutFailed() {
    this.setState({
      status: 'error',
      loading: false,
      user: {}
    })
  }
}

export default AuthStore
