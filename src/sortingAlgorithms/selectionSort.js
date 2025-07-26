export function selectionSortAlgorithm(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    let auxArray = array.slice();
    const n = auxArray.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        animations.push({ type: 'min_element', index: minIdx });
        for (let j = i + 1; j < n; j++) {
            animations.push({ type: 'compare', indices: [minIdx, j] });
            if (auxArray[j] < auxArray[minIdx]) {
                animations.push({ type: 'min_element', index: j });
                minIdx = j;
            }
        }
        animations.push({ type: 'swap', indices: [i, minIdx] });
        [auxArray[i], auxArray[minIdx]] = [auxArray[minIdx], auxArray[i]];
        animations.push({ type: 'sorted', index: i });
    }
    animations.push({ type: 'sorted', index: n-1 });
    return animations;
}
