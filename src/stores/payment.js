import Reflux from 'reflux'
import PaymentActions from '../actions/payment'
import MessageActions from '../actions/message'
import firebase from '../sources/firebase'
import _ from 'underscore'

class PaymentStore extends Reflux.Store {
  constructor() {
    super()

    this.listenToMany(PaymentActions)

    this.state = {
      loading: true
    }
  }

  loading(loading) {
    loading = loading || false

    this.setState({
      loading: loading
    })
  }

  submit(token) {
    return $.ajax({
      url: config.apiUrl + '/checkout',
      method: 'POST',
      body: JSON.stringify(token)
    }).then(response => {
      self.loading(false);

      messageActions.send('Successfully processed payment.');
    });
  }
}

export default AuthStore
