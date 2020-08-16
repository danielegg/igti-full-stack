import React, { Component } from 'react';

export default class InputReadOnly extends Component {
    render() {
        const { value, label, id } = this.props;
        return (
            <div className="col m3">
                <label htmlFor={id}>{label}:</label>
                <input type="text" id={id} value={value} readOnly />
            </div>
        );

        /* const { calcImpostos } = this.props;
        console.log(calcImpostos); */
        /* return (
            <div>
                {calcImpostos.map((value, index) => {
                    return (
                        <div className="col m3">
                            <label htmlFor="{index}">Base INSS:</label>
                            <input
                                type="text"
                                id="{index}"
                                value="{value}"
                                readOnly={true}
                            />
                        </div>
                    );
                })}
            </div>
        ); */
    }
}
