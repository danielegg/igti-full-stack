import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      paragraph1: '',
      paragraph2: '',
      lengthParagraph2: 0,
    };

    console.log('constructor');
  }

  handleParagraph1 = (event) => {
    console.log('handleParagraph1');
    this.setState({ paragraph1: event.target.value });
  };

  handleParagraph2 = (event) => {
    console.log('handleParagraph2');
    this.setState({ paragraph2: event.target.value });
  };

  componentDidUpdate(_, previousState) {
    console.log('didUpdate');

    const {
      paragraph1: oldParagraph1,
      paragraph2: oldParagraph2,
    } = previousState;

    const { paragraph1: newParagraph1, paragraph2: newParagraph2 } = this.state;

    if (oldParagraph1 !== newParagraph1) {
      console.log('Alterando título da aba');
      // Título da aba
      document.title = this.state.paragraph1.length;
    }

    if (oldParagraph2 !== newParagraph2) {
      this.setState({ lengthParagraph2: this.state.paragraph2.length });
    }
  }

  render() {
    console.log('render');
    const { paragraph1, paragraph2, lengthParagraph2 } = this.state;

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
        <p>Soma de caracteres do parágrafo 2: {lengthParagraph2}</p>
      </div>
    );
  }
}
