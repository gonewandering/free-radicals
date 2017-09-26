require('styles/components/underlay.scss');

import React from 'react'
import Reflux from 'reflux'
import Config from '../../config/index'

import Loading from '../Loading'
import Checkout from '../Checkout'
import Login from '../Login'

import InviteActions from '../../actions/invite'
import InviteStore from '../../stores/invite'

class AppComponent extends Reflux.Component {
  gotoUrl(url, e) {
    e.preventDefault();
    location.href = url;
  }

  render() {
    let renderUrl = (invite) => {
      var url = Config.baseUrl + '/' + invite.from + '/' + invite.id;

      function makeRandomColor(){
        var c = '';
        while (c.length < 7) {
          c += (Math.random()).toString(16).substr(-6).substr(-1)
        }
        return '#'+c;
      }

      let styles = { backgroundColor: makeRandomColor() };

      return (
        <div className="invite-url" style={ styles }>
          <a onClick={ this.gotoUrl.bind(this, url) } className="btn btn-sm btn-white btn-block" target="_blank">{ url }</a>
        </div>
      )
    }

    let invites = Object.values(this.props.invites || {})

    return (
      <div>
        { invites.map(renderUrl) }
      </div>
    )
  }
}

export default AppComponent;
