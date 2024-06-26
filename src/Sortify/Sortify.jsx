import React from 'react';
import {mergeSortAlgorithm} from '../sortingAlgorithms/mergeSort.js';
import {quickSortAlgorithm} from '../sortingAlgorithms/quickSort.js';
import {bubbleSortAlgorithm} from '../sortingAlgorithms/bubbleSort.js';
import {heapSortAlgorithm} from '../sortingAlgorithms/heapSort.js';
import {selectionSortAlgorithm} from '../sortingAlgorithms/selectionSort.js';
import {insertionSortAlgorithm} from '../sortingAlgorithms/insertionSort.js';
import './Sortify.css';

export default class Sortify extends React.Component {
    constructor(downs) {
        super(downs);
        this.state = {
            array: downs.array || [],
            sorting: false,
            numBars: 80,
            speed: 60,
        }
    }

    handleNumBarsChange(event) {
        this.setState({ numBars: event.target.value });
        this.resetArray();
    }

    handleSpeedChange(event) {
        this.setState({ speed: event.target.value });
    }

    // component loads for the first time
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const newArr = [];
        for (let p = 0; p < this.state.numBars; p++) {
            newArr.push(randomIntFromInterval(5, 550));
        }
        this.setState({ array: newArr });
    }

    mergeSort() {
        this.setState({ sorting: true });
        const animations = mergeSortAlgorithm(this.state.array);
        const arrayBars = Array.from(document.getElementsByClassName('array-bar'));
        let animationIndex = 0;
        const animationInterval = setInterval(() => {
            const animation = animations[animationIndex];
            const isColorChange = animationIndex % 3 !== 2;
            const color = animationIndex % 3 === 0 ? 'ed' : 'turquoise';
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animation;
                const barOneStyle = arrayBars[barOneIdx]?.style;
                const barTwoStyle = arrayBars[barTwoIdx]?.style;
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            } else {
                const [barOneIdx, newHeight] = animation;
                const barOneStyle = arrayBars[barOneIdx]?.style;
                barOneStyle.height = `${newHeight}px`;
            }
            animationIndex++;
            if (animationIndex >= animations.length) {
                clearInterval(animationInterval);
                this.setState({ sorting: false });
            }
        }, this.state.speed);
    }

    quickSort() {
        const animations = quickSortAlgorithm(this.state.array);
        const sortArray = Array.from(document.getElementsByClassName('array-bar'));
        animations.forEach((animation, i) => {
            const isColorChange = i % 6 < 2;
            const color = i % 6 === 0 ? 'orange' : 'black';
            if (animation[0] === -1) return;
            if (isColorChange) {
                const [firstIndex, secondIndex] = animation;
                const firstBarStyle = sortArray[firstIndex].style;
                const secondBarStyle = sortArray[secondIndex].style;
                setTimeout(() => {
                    firstBarStyle.background = color;
                    secondBarStyle.background = color;
                }, i);
            } else {
                const [index, newHeight] = animation;
                const barStyle = sortArray[index].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i);
            }
        });
    }

    heapSort() {
        const animations = heapSortAlgorithm(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 4 < 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 1);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 1);
            }
        }
    };

    bubbleSort() {
        const animations = bubbleSortAlgorithm(this.state.array);
        const sortArray = Array.from(document.getElementsByClassName('array-bar'));
        for (let i = 0; i < animations.length; i++) {
            const changeColor = i % 4 === 0 || i % 4 === 1;
            if (changeColor) {
                const [firstArrayIndex, secondArrayIndex] = animations[i];
                const firstArrayStyle = sortArray[firstArrayIndex].style;
                const secondArrayStyle = sortArray[secondArrayIndex].style;
                const color = i % 4 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    firstArrayStyle.background = color;
                    secondArrayStyle.background = color;
                }, i * 1);
            } else {
                const [arrayIndex, newHeight] = animations[i];
                if (arrayIndex === -1) {
                    continue;
                }
                const arrayStyle = sortArray[arrayIndex].style;
                setTimeout(() => {
                    arrayStyle.height = `${newHeight}px`
                }, i * 1);
            }
        }
    };

    selectionSort() {
        const animations = Array.from(selectionSortAlgorithm(this.state.array));
        const arrayBars = document.getElementsByClassName('array-bar');
        const delay = 50;
        const color1 = 'yellow';
        const color2 = 'rgb(50, 50, 200)';
        const arrayBarsCopy = [...arrayBars];
        animations.forEach(([barOneIdx, newHeightOne, barTwoIdx, newHeightTwo], i) => {
            const barOneStyle = arrayBarsCopy[barOneIdx].style;
            const barTwoStyle = arrayBarsCopy[barTwoIdx].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = color1;
                barTwoStyle.backgroundColor = color1;
                barOneStyle.height = `${newHeightTwo}px`;
                barTwoStyle.height = `${newHeightOne}px`;
                arrayBars[barOneIdx].style.height = `${newHeightTwo}px`;
                arrayBars[barTwoIdx].style.height = `${newHeightOne}px`;
            }, i * delay);
            setTimeout(() => {
                barOneStyle.backgroundColor = color2;
                barTwoStyle.backgroundColor = color2;
            }, i * delay + delay);
        });
        setTimeout(() => {
            for (let bar of arrayBars) {
                bar.style.backgroundColor = color2;
            }
        }, animations.length * delay);
    }

    insertionSort() {
        const animations = insertionSortAlgorithm(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        const delay = 0.5;

        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'turquoise' : 'lightblue';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * delay);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    barOneStyle.backgroundColor = 'turquoise';
                }, i * delay);
            }
        }
    }

    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = mergeSortAlgorithm(array.slice());
            console.log(ArraysEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    render() {
        return (
            <div className="main-container">
                <div className="button-container">
                    <button className="initializing-button" onClick={() => this.resetArray()}>Generate An Array</button>
                    <button className="mergeSort-button" onClick={() => this.mergeSort()} disabled={this.state.sorting}>Merge Sort</button>
                    <button className="quickSort-button" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="bubbleSort-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button className="heapSort-button" onClick={() => this.heapSort()}>Heap Sort</button>
                    <button className="selectionSort-button" onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button className="insertionSort-button" onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="50"
                            max="90"
                            value={this.state.numBars}
                            className="slider"
                            id="numBarsSlider"
                            onChange={this.handleNumBarsChange.bind(this)}
                        />
                        <span className="slider-label" style={{ color: 'red' }}>Number of Bars: {this.state.numBars}</span>
                    </div>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="50"
                            max="100"
                            value={this.state.speed}
                            className="slider"
                            id="speedSlider"
                            onChange={this.handleSpeedChange.bind(this)}
                        />
                        <span className="slider-label" style={{ color: "red" }}>Speed: {this.state.speed}</span>
                    </div>
                </div>
                <div className="element-container">
                    {this.state.array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{ height: `${value}px` }}></div>
                    ))}
                </div>
            </div>
        );
    }
}
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function ArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let p = 0; p < arr1.length; p++) {
        if (arr1[p] !== arr2[p]){
            console.log(arr1[p], arr2[p]);
            return false;
        } 
    }
    return true;
}

