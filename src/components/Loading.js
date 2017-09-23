require('styles/components/loading.scss');

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="loading">
        <p>{ this.props.label || 'Loading...' }</p>
      </div>
    );
  }
}

export default AppComponent;
