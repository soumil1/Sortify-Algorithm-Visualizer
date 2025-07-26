export function quickSortAlgorithm(array) {
    const animations = [];
    let auxArray = array.slice();
    sortingHelper(auxArray, 0, auxArray.length - 1, animations);
    return animations;
}

function sortingHelper(auxArray, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) {
        if(startIdx === endIdx) animations.push({ type: 'sorted', index: startIdx });
        return;
    };
    let pivotIndex = partitionArray(auxArray, startIdx, endIdx, animations);
    animations.push({ type: 'sorted', index: pivotIndex });
    sortingHelper(auxArray, startIdx, pivotIndex - 1, animations);
    sortingHelper(auxArray, pivotIndex + 1, endIdx, animations);
}

function partitionArray(auxArray, startIdx, endIdx, animations) {
    let pivot = auxArray[endIdx];
    animations.push({ type: 'pivot', index: endIdx });
    let i = startIdx;
    for (let j = startIdx; j < endIdx; j++) {
        animations.push({ type: 'compare', indices: [j, endIdx] });
        if (auxArray[j] <= pivot) {
            animations.push({ type: 'swap', indices: [i, j] });
            [auxArray[i], auxArray[j]] = [auxArray[j], auxArray[i]];
            i++;
        }
    }
    animations.push({ type: 'swap', indices: [i, endIdx] });
    [auxArray[i], auxArray[endIdx]] = [auxArray[endIdx], auxArray[i]];
    return i;
}
