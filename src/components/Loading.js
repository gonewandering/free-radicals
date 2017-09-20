require('styles/components/loading.scss');

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="loading">
        { this.props.label || 'Loading...' }
      </div>
    );
  }
}

export default AppComponent;
