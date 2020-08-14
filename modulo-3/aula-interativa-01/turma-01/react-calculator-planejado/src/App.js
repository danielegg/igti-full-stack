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
  const squareRoot = Math.sqrt(number).toFixed(2);
  const fatorial = getFatorialFrom(number);

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

  componentDidUpdate(previousProps, previousState) {
    const currentNumber = this.state.number;
    const previousNumber = previousState.number;

    if (currentNumber !== previousNumber) {
      const calculations = calculateValuesFrom(currentNumber);

      this.setState({ calculations });
    }
  }

  handleValueChange = (event) => {
    const newNumber = Number(event.target.value);

    this.setState({ number: newNumber });
  };

  render() {
    const { number, calculations } = this.state;
    const { square, squareRoot, fatorial } = calculations;

    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Calculadora</h1>

        <label>
          <span>Número principal: </span>
          <input
            type='number'
            placeholder='Informe um número aqui'
            min='1'
            max='100'
            value={number}
            onChange={this.handleValueChange}
          />
        </label>

        <br />
        <br />

        <ReadOnlyInput value={square} label='Quadrado: ' />
        <ReadOnlyInput value={squareRoot} label='Raiz quadrada: ' />
        <ReadOnlyInput value={fatorial} label='Fatorial: ' />
      </div>
    );
  }
}
