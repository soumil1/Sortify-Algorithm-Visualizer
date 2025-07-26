export function heapSortAlgorithm(array) {
    const animations = [];
    let auxArray = array.slice();
    let n = auxArray.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(auxArray, n, i, animations);
    }
    for (let i = n - 1; i > 0; i--) {
        animations.push({ type: 'swap', indices: [0, i] });
        [auxArray[0], auxArray[i]] = [auxArray[i], auxArray[0]];
        animations.push({ type: 'sorted', index: i });
        heapify(auxArray, i, 0, animations);
    }
    animations.push({ type: 'sorted', index: 0 });
    return animations;
}

function heapify(auxArray, n, i, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n) {
        animations.push({ type: 'compare', indices: [left, largest] });
        if (auxArray[left] > auxArray[largest]) largest = left;
    }
    if (right < n) {
        animations.push({ type: 'compare', indices: [right, largest] });
        if (auxArray[right] > auxArray[largest]) largest = right;
    }
    if (largest !== i) {
        animations.push({ type: 'swap', indices: [i, largest] });
        [auxArray[i], auxArray[largest]] = [auxArray[largest], auxArray[i]];
        heapify(auxArray, n, largest, animations);
    }
}
