import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js';
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
        for (let p = 0; p < 320; p++) {
            newArr.push(randomIntFromInterval(5, 610));
        }
        this.setState({array: newArr});
    }

    mergeSort() {}

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    render() {
        const { array } = this.state;

        return (
            <div className="element-container">
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{ height: `${value}px` }}>
                    </div>
                ))}
                <div className="button-container">
                    <button className="initializing-button" onClick={() => this.resetArray()}>Generate An Array</button>
                    <button className="mergeSort-button" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="quickSort-button" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="bubbleSort-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button className="heapSort-button" onClick={() => this.heapSort()}>Heap Sort</button>
                </div>
            </div>
        );
        
    }
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
