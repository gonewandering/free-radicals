require('styles/components/loading.scss');

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="loading">
        <i className="fa fa-circle-o-notch fa-2x fa-spin"></i> Loading...
      </div>
    );
  }
}

export default AppComponent;
