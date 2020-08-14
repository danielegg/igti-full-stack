import React, { Component } from 'react';

export default class ReadOnlyInput extends Component {
  render() {
    const { label, value } = this.props;
    const { labelStyle } = styles;

    return (
      <div>
        <label style={labelStyle}>
          <span>{label}</span>
          <input type='text' readOnly disabled value={value} />
        </label>
      </div>
    );
  }
}

const styles = {
  labelStyle: {
    display: 'flex',
    width: '300px',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
};
