import React, { Component } from 'react';

export default class ReadOnlyInput extends Component {
  render() {
    const { label, value } = this.props;
    const { inputStyle } = styles;

    return (
      <div>
        <label style={inputStyle}>
          <span style={{ marginRight: '10px' }}>{label} </span>
          <input type='text' readOnly disabled value={value} />
        </label>
      </div>
    );
  }
}

//CSSInJS
const styles = {
  inputStyle: {
    width: '300px', //width: 300px;
    //backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
};
