require('styles/components/underlay.scss');

import React from 'react';

class AppComponent extends React.Component {
  render() {

    return (
      <div className="underlay" style={ this.props.styles }>
        { this.props.children }
      </div>
    );
  }
}

export default AppComponent;
