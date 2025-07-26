import React from 'react';
import './Sortify.scss';
import { Header } from '../Components/Header';
import { motion } from 'framer-motion';
import { InfoHub } from '../Components/InfoHub';
import { Footer } from '../Components/Footer';

import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort.js';
import { quickSortAlgorithm as getQuickSortAnimations } from '../sortingAlgorithms/quickSort.js';
import { heapSortAlgorithm as getHeapSortAnimations } from '../sortingAlgorithms/heapSort.js';
import { bubbleSortAlgorithm as getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort.js';
import { insertionSortAlgorithm as getInsertionSortAnimations } from '../sortingAlgorithms/insertionSort.js';
import { selectionSortAlgorithm as getSelectionSortAnimations } from '../sortingAlgorithms/selectionSort.js';

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export default class Sortify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            arraySize: 80,
            animationSpeed: 50,
            isSorting: false,
            isSorted: false,
            isPostSortDelay: false,
            activeAlgorithm: null,
            comparingIndices: [],
            actionIndices: [], 
            sortedIndices: new Set(),
        };
        this.timeoutIds = [];
    }

    componentDidMount() { this.resetArray(); }
    handleSizeChange = (newSize) => { this.setState({ arraySize: newSize }, () => this.resetArray()); }
    handleSpeedChange = (newSpeed) => { this.setState({ animationSpeed: newSpeed }); }
    clearAllTimeouts = () => { this.timeoutIds.forEach(clearTimeout); this.timeoutIds = []; };

    resetArray = () => {
        this.clearAllTimeouts();
        const newArray = [];
        for (let i = 0; i < this.state.arraySize; i++) {
            newArray.push({ id: i, value: randomIntFromInterval(20, 400) });
        }
        this.setState({
            array: newArray, isSorting: false, isSorted: false, isPostSortDelay: false,
            comparingIndices: [], actionIndices: [], sortedIndices: new Set(),
            activeAlgorithm: null,
        });
    };

    stopSorting = () => {
        this.resetArray();
    };

    runSort = (algorithmName, algorithmFunc) => {
        if (this.state.isSorting || this.state.isPostSortDelay) return;

        this.clearAllTimeouts();
        this.resetArray();

        setTimeout(() => {
            this.setState({
                isSorting: true,
                isSorted: false,
                activeAlgorithm: algorithmName,
            });

            const animations = algorithmFunc(this.state.array.map(item => item.value));
            const delay = 100 - this.state.animationSpeed;

            animations.forEach((animation, i) => {
                const timeoutId = setTimeout(() => {
                    let newComparing = [];
                    let newAction = [];

                    if (animation.type === 'compare') {
                        newComparing = animation.indices;
                    } else if (animation.type !== 'sorted') {
                        newAction = animation.indices || [animation.index];
                    }

                    this.setState({
                        comparingIndices: newComparing,
                        actionIndices: newAction,
                    });

                    if (animation.type === 'sorted') {
                        this.setState(prevState => ({ sortedIndices: new Set(prevState.sortedIndices).add(animation.index) }));
                    }

                    if (animation.type === 'swap') {
                        this.setState(prevState => {
                            const newArray = [...prevState.array];
                            const [idx1, idx2] = animation.indices;
                            [newArray[idx1], newArray[idx2]] = [newArray[idx2], newArray[idx1]];
                            return { array: newArray };
                        });
                    } else if (animation.type === 'overwrite') {
                        this.setState(prevState => {
                            const newArray = [...prevState.array];
                            newArray[animation.index] = { ...newArray[animation.index], value: animation.value };
                            return { array: newArray };
                        });
                    }

                    if (i === animations.length - 1) {
                        this.setState({ isSorting: false, isSorted: true, comparingIndices: [], actionIndices: [], isPostSortDelay: true });
                        const postSortTimer = setTimeout(() => {
                            this.setState({ isPostSortDelay: false });
                        }, 3000);
                        this.timeoutIds.push(postSortTimer);
                    }
                }, i * delay);
                this.timeoutIds.push(timeoutId);
            });
        }, 100);
    };

    render() {
        const { array, arraySize, animationSpeed, isSorting, isSorted, isPostSortDelay, activeAlgorithm, comparingIndices, actionIndices, sortedIndices } = this.state;
        const { darkMode, toggleDarkMode } = this.props;

        const algorithms = [{ name: 'Merge Sort', func: getMergeSortAnimations }, { name: 'Quick Sort', func: getQuickSortAnimations }, { name: 'Heap Sort', func: getHeapSortAnimations }, { name: 'Bubble Sort', func: getBubbleSortAnimations }, { name: 'Insertion Sort', func: getInsertionSortAnimations }, { name: 'Selection Sort', func: getSelectionSortAnimations },];

        return (
            <div className="visualizer-container">
                <Header
                    onGenerateArray={this.resetArray}
                    onStop={this.stopSorting}
                    onRunSort={this.runSort}
                    onSetArraySize={this.handleSizeChange}
                    onSetAnimationSpeed={this.handleSpeedChange}
                    onToggleDarkMode={toggleDarkMode}
                    algorithms={algorithms}
                    isSorting={isSorting}
                    isDarkMode={darkMode}
                    arraySize={arraySize}
                    animationSpeed={animationSpeed}
                    activeAlgorithm={activeAlgorithm}
                    isSorted={isSorted}
                    isPostSortDelay={isPostSortDelay}
                />

                <InfoHub activeAlgorithm={activeAlgorithm} />

                <motion.main layout className="bars-container">
                    {array.map((item, idx) => {
                        const { id, value } = item;
                        const isComparing = comparingIndices.includes(idx);
                        const isAction = actionIndices.includes(idx);
                        const isSortedFinal = isSorted || sortedIndices.has(idx);

                        let barClassName = 'array-bar';
                        if (isSorting && !(isComparing || isAction || isSortedFinal)) {
                        } else {
                            barClassName += ' bar-active';
                        }

                        if (isAction) barClassName += ' bar-action';
                        else if (isComparing) barClassName += ' bar-comparing';

                        if (isSortedFinal) {
                            barClassName = 'array-bar bar-sorted bar-active';
                        }

                        return (
                            <motion.div layout key={id} className={barClassName} style={{ height: `${value}px` }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                        );
                    })}
                </motion.main>

                <Footer
                    isSorting={isSorting}
                    isSorted={isSorted}
                    activeAlgorithm={activeAlgorithm}
                />
            </div>
        );
    }
}
