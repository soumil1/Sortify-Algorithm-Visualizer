import React from 'react';
import './Sortify.css';

export default class Sortify extends React.Component {
    constructor(downs) {
        super(downs);

        this.state = {
            array: [],
        };
    }

    // component loads for the first time
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const newArr = [];
        for (let p = 0; p < 100; p++) {
            newArr.push(randomIntFromInterval(5, 1000));
        }
        this.setState({array: newArr});
    }

    render() {
        const { array } = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx}>
                        {value}
                    </div>
                ))}
            </div>
        );
    }
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
