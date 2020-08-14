import React from 'react';
import ReadOnlyInput from './components/ReadOnlyInput';

function getFatorialFrom(number) {
  if (number <= 1) {
    return 1;
  }

  return number * getFatorialFrom(number - 1);
}

function calculateValuesFrom(number) {
  const square = number ** 2;
  //const squareRoot = number ** 0.5;
  const squareRoot = Math.sqrt(number);
  const fatorial = getFatorialFrom(number);

  return { square, squareRoot, fatorial };
}

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      number: 1,
      text: '',

      calculations: {
        square: 1,
        squareRoot: 1,
        fatorial: 1,
      },
    };
  }

  handleInputChange = (event) => {
    const inputText = event.target.value;

    this.setState({ number: Number(inputText) });
  };

  handleTextChange = (event) => {
    const inputText = event.target.value;

    this.setState({ text: inputText });
  };

  componentDidUpdate(_, previousState) {
    if (this.state.number !== previousState.number) {
      console.log('Calculando...');
      const calculations = calculateValuesFrom(this.state.number);
      this.setState({ calculations });
    }
  }

  render() {
    const { number, calculations, text } = this.state;
    const { square, squareRoot, fatorial } = calculations;

    return (
      <div style={{ padding: '20px' }}>
        <h1>React Calculator</h1>

        <label>
          <span style={{ marginRight: '10px' }}>Texto:</span>
          <input type='text' value={text} onChange={this.handleTextChange} />
        </label>

        <label>
          <span style={{ marginRight: '10px' }}>Número:</span>
          <input
            type='number'
            value={number}
            onChange={this.handleInputChange}
          />
        </label>

        <br />
        <br />

        <ReadOnlyInput label='Quadrado: ' value={square} />
        <ReadOnlyInput label='Raiz quadrada: ' value={squareRoot} />
        <ReadOnlyInput label='Fatorial: ' value={fatorial} />

        <p>{text}</p>
      </div>
    );
  }
}
