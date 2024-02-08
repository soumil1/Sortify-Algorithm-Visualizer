export function heapSortAlgorithm(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function heapSortHelper(mainArray, startIdx, endIdx, animations) {
    let n = endIdx - startIdx + 1;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(mainArray, n, i, startIdx, endIdx, animations);
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        animations.push([startIdx, startIdx + i]);
        animations.push([startIdx, startIdx + i]);
        animations.push([startIdx, mainArray[startIdx + i]]);
        animations.push([startIdx + i, mainArray[startIdx]]);
        [mainArray[startIdx], mainArray[startIdx + i]] = [mainArray[startIdx + i], mainArray[startIdx]];
        heapify(mainArray, i, 0, startIdx, startIdx + i - 1, animations);
    }
}

function heapify(mainArray, n, i, startIdx, endIdx, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    // Left child is larger than root
    if (left < n && mainArray[startIdx + left] > mainArray[startIdx + largest])
        largest = left;
    // Right child is largest
    if (right < n && mainArray[startIdx + right] > mainArray[startIdx + largest])
        largest = right;
    if (largest !== i) {
        animations.push([startIdx + i, startIdx + largest]);
        animations.push([startIdx + i, startIdx + largest]);
        animations.push([startIdx + i, mainArray[startIdx + largest]]);
        animations.push([startIdx + largest, mainArray[startIdx + i]]);
        [mainArray[startIdx + i], mainArray[startIdx + largest]] = [mainArray[startIdx + largest], mainArray[startIdx + i]];
        heapify(mainArray, n, largest, startIdx, endIdx, animations);
    }
}