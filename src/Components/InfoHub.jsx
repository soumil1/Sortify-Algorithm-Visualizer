import './InfoHub.scss';

const ALGORITHM_DATA = {
    'Merge Sort': {
        time: 'O(n log n)',
        space: 'O(n)',
        description: 'Splits the list in half, sorts each half and then joins them back together in order.'
    },
    'Quick Sort': {
        time: 'O(n log n)',
        space: 'O(log n)',
        description: 'Picks a middle point (pivot), puts smaller numbers on one side, bigger on the other and repeats.'
    },
    'Heap Sort': {
        time: 'O(n log n)',
        space: 'O(1)',
        description: 'Turns the list into a heap (tree like structure) to pull out the biggest numbers in order.'
    },
    'Bubble Sort': {
        time: 'O(n^2)',
        space: 'O(1)',
        description: 'Keeps swapping nearby numbers if they are out of order until the whole list is sorted.'
    },
    'Insertion Sort': {
        time: 'O(n^2)',
        space: 'O(1)',
        description: 'Takes one number at a time and puts it in the right place in the sorted part of the list.'
    },
    'Selection Sort': {
        time: 'O(n^2)',
        space: 'O(1)',
        description: 'Finds the smallest number and moves it to the start. Then repeats for the rest.'
    },
};

export const InfoHub = ({ activeAlgorithm }) => {
    if (!activeAlgorithm) {
        return null;
    }

    const data = ALGORITHM_DATA[activeAlgorithm];

    return (
        <div className="info-hub">
            <h3 className="info-title">{activeAlgorithm}</h3>
            <p className="info-description">{data.description}</p>
            <div className="info-complexity">
                <div className="complexity-box">
                    <strong>Time Complexity:</strong>
                    <span>{data.time}</span>
                </div>
                <div className="complexity-box">
                    <strong>Space Complexity:</strong>
                    <span>{data.space}</span>
                </div>
            </div>
        </div>
    );
};