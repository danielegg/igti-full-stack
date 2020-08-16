import React, { Component } from 'react';

export default class InputFullSalary extends Component {
    handelInputChange = (event) => {
        const valorSalario = event.target.value;

        this.props.onChangeValue(valorSalario);
    };

    render() {
        return (
            <div>
                <label htmlFor="salarioBruto">Salário Bruto:</label>
                <input
                    type="number"
                    id="salarioBruto"
                    onChange={this.handelInputChange}
                />
            </div>
        );
    }
}
