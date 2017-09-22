require('styles/components/box.scss');
import React from 'react';

class AppComponent extends React.Component {
  render() {
    let classes = this.props.classes || []
    let styles = this.props.styles || {}
    let logo = null

    classes.push('box')

    if (this.props.background) {
      // let url = '../../' + this.props.background;
      // let image = require(url);
      // console.log(image);
      styles.backgroundImage = 'url(' + this.props.background + ')';
    }

    if (this.props.color) {
      styles.backgroundColor = this.props.color;
    }

    if (this.props.logo) {
      logo = (
        <img className="box-logo center" src={ this.props.logo } />
      )
    }

    return (
      <div className={ classes.join(' ') } style={ styles }>
        { logo }
        { this.props.children }
      </div>
    );
  }
}

export default AppComponent;
