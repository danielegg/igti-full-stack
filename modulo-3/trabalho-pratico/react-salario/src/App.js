import React, { Component } from 'react';
import InputFullSalary from './components/inputs/InputFullSalary';
import InputReadOnly from './components/inputs/InputReadOnly';

import { calculateSalaryFrom } from './helpers/salary';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            valueSalario: 0,
            calcImpostos: [],
        };
    }

    handleInputChange = (salario) => {
        // console.log(salario);
        this.setState({
            valueSalario: salario,
        });

        const calcImpostos = calculateSalaryFrom(salario);

        this.setState({
            calcImpostos,
        });
    };

    render() {
        const { valueSalario, calcImpostos } = this.state;
        // console.log(calcImpostos);

        return (
            <div className="container">
                <div className="row">
                    <div className="col m12">
                        <h1 className="center-align">React Salário</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col m12">
                        <InputFullSalary
                            valueSalario={valueSalario}
                            onChangeValue={this.handleInputChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <InputReadOnly
                        value={calcImpostos.baseINSS}
                        label="Base INSS"
                        id="baseINSS"
                    />

                    <InputReadOnly
                        value={calcImpostos.discountINSS}
                        label="Desconto INSS"
                        id="discountINSS"
                    />

                    <InputReadOnly
                        value={calcImpostos.baseIRPF}
                        label="Base IRPF"
                        id="baseIRPF"
                    />

                    <InputReadOnly
                        value={calcImpostos.discountIRPF}
                        label="Desconto IRPF"
                        id="discountIRPF"
                    />

                    <InputReadOnly
                        value={calcImpostos.netSalary}
                        label="Salário Líquido"
                        id="netSalary"
                    />
                </div>
                <div className="row"></div>
            </div>
        );
    }
}
