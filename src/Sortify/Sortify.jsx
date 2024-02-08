import React from 'react';
import {mergeSortAlgorithm} from '../sortingAlgorithms/mergeSort.js';
import {quickSortAlgorithm} from '../sortingAlgorithms/quickSort.js';
import {bubbleSortAlgorithm} from '../sortingAlgorithms/bubbleSort.js';
import {heapSortAlgorithm} from '../sortingAlgorithms/heapSort.js';
import './Sortify.css';

export default class Sortify extends React.Component {
    constructor(downs) {
        super(downs);
        this.state = {
            array: downs.array || [],
    }
}

    // component loads for the first time
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const newArr = [];
        for (let p = 0; p < 310; p++) {
            newArr.push(randomIntFromInterval(5, 610));
        }
        this.setState({array: newArr});
    }

    mergeSort() {
        const animations = mergeSortAlgorithm(this.state.array);
        for(let p = 0; p < animations.length; p++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = p % 3 !== 2;
            if(isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[p];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = p % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, p * 3);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[p];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, p * 3);
            }
        }
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
        
    }

    insertionSort() {
        
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
                    <button className="selectionSort-button" onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button className="insertionSort-button" onClick={() => this.insertionSort()}>Insertion Sort</button>
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

