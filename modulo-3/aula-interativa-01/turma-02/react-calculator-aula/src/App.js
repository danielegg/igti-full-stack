import React from 'react';
import ReadOnlyInput from './components/ReadOnlyInput';
import DoubleButton from './components/DoubleButton';

function getFatorialFrom(value) {
  if (value <= 1) {
    return 1;
  }

  //5 * 4 * 3 * 2 * 1
  return value * getFatorialFrom(value - 1);
}

function getCalculationsFrom(value) {
  const square = value ** 2;
  //const squareRoot = value ** 0.5;
  const squareRoot = Math.sqrt(value);

  //5! => 5 * 4 * 3 * 2 * 1
  const fatorial = getFatorialFrom(value);

  return { square, squareRoot, fatorial };
}

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      number: 1,
      calculations: {
        square: 1,
        squareRoot: 1,
        fatorial: 1,
      },
    };
  }

  handleInputChange = (event) => {
    console.log('handleInputChange');
    const newNumber = Number(event.target.value);

    this.setState({ number: newNumber });
  };

  handleButtonClick = () => {
    console.log('App.js');
    const newNumber = this.state.number * 2;
    this.setState({ number: newNumber });
  };

  componentDidUpdate(_, previousState) {
    const { number: oldNumber } = previousState;
    const { number: newNumber } = this.state;

    if (oldNumber !== newNumber) {
      const calculations = getCalculationsFrom(this.state.number);
      this.setState({ calculations });
    }
  }

  render() {
    const { number, calculations } = this.state;
    const { square, squareRoot, fatorial } = calculations;

    return (
      <div>
        <h1>React Calculator</h1>
        <label>
          <span>Número: </span>
          <input
            autoFocus
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

        <br />

        <DoubleButton onButtonClick={this.handleButtonClick} />
      </div>
    );
  }
}
