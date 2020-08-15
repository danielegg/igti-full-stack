import React, { Component } from 'react';

export default class DoubleButton extends Component {
  handleButtonClick = () => {
    const { onButtonClick } = this.props;
    console.log('DoubleButton');
    onButtonClick();
  };

  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick}>Duplicar valor</button>
      </div>
    );
  }
}
