import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './routes/home';
import Invite from './routes/invite';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

require('styles/App.scss');

let Routes = () => {
  return (
    <Router>
      <div className="app">
        <Route exact path="/" component={ Home } />
        <Route path="/:uID/:inviteID" component={ Invite } />
      </div>
    </Router>
  )
}

ReactDOM.render(<Routes />, document.getElementById('app'));
