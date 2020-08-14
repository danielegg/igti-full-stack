import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      paragraph1: '',
      paragraph2: '',
      sum: 0,
    };

    console.log('construtor');
  }

  handleParagraph1 = (event) => {
    this.setState({ paragraph1: event.target.value });
  };

  handleParagraph2 = (event) => {
    this.setState({ paragraph2: event.target.value });
  };

  componentDidUpdate(_, previousState) {
    console.log('didUpdate');
    document.title = this.state.paragraph1.length;

    if (previousState.paragraph2 !== this.state.paragraph2) {
      this.setState({ sum: this.state.paragraph2.length });
    }
  }

  render() {
    console.log('render');
    const { paragraph1, paragraph2, sum } = this.state;

    return (
      <div className='container'>
        <h1>React componentDidUpdate</h1>

        <input
          type='text'
          placeholder='Digite aqui'
          value={paragraph1}
          onChange={this.handleParagraph1}
        />

        <input
          type='text'
          placeholder='Digite aqui'
          value={paragraph2}
          onChange={this.handleParagraph2}
        />

        <p>Parágrafo 1: {paragraph1}</p>
        <p>Parágrafo 2: {paragraph2}</p>
        <p>Soma de caracteres do parágrafo 2: {sum}</p>
      </div>
    );
  }
}
