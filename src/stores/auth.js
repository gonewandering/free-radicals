import Reflux from 'reflux'
import AuthActions from '../actions/auth'
import firebase from '../sources/firebase'
import _ from 'underscore'

class AuthStore extends Reflux.Store {
  constructor() {
    super()

    this.listenToMany(AuthActions)

    this.state = {
      loading: true
    }

    firebase.auth().onAuthStateChanged(this.getProfile.bind(this))
  }

  loading(loading) {
    loading = loading || false

    this.setState({
      loading: loading
    })
  }

  register(options) {
    this.loading.bind(this)(true)

    return firebase.auth().createUserWithEmailAndPassword(options.email, options.password)
      .then(this.setProfile.bind(this, options))
  }

  login(options) {
    const self = this;
    this.loading.bind(this)(true)

    return firebase.auth().signInWithEmailAndPassword(options.email, options.password)
      .then(this.getProfile)
      .catch(() => {
        self.setState({
          loading: false,
          user: {}
        })
      })
  }

  logout() {
    this.loading.bind(this)(true)

    return firebase.auth().signOut()
      .then(this.getProfile)
  }

  setProfile(profile, user) {
    delete profile.password
    profile.uid = user.uid

    let userRef = firebase.database().ref('users/' + user.uid);
    return userRef.set(profile).then(this.getProfile.bind(this, user))
  }

  getProfile(user) {
    this.loading.bind(this)(true)

    let self = this;
    user = user || {}

    if (!user.uid) {
      return self.setState({
        loading: false,
        user: {}
      })
    }

    let userRef = firebase.database().ref('users/' + user.uid);

    return userRef.once('value').then(profile => {
      let up = _.extend({
        uid: user.uid
      }, profile.val());

      self.setState({
        loading: false,
        user: up
      })
    });
  }
}

export default AuthStore
