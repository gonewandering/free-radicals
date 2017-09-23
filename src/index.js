require('styles/lib/bootstrap.css');
require('styles/lib/fonts.css');

require('styles/App.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './routes/home';
import Invite from './routes/invite';
import Profile from './routes/profile';
import Faq from './routes/faq';
import Next from './routes/next';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

let Routes = () => {
  return (
    <Router>
      <div className="app">
        <Route exact path="/" component={ Home } />
        <Route path="/profile" component={ Profile } />
        <Route path="/faq" component={ Faq } />
        <Route path="/next" component={ Next } />
        <Route path="/:uID/:inviteID" component={ Invite } />
      </div>
    </Router>
  )
}

ReactDOM.render(<Routes />, document.getElementById('app'));
