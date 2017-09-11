require('styles/components/card.scss');

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="card">
        { this.props.children }
      </div>
    );
  }
}

export default AppComponent;
