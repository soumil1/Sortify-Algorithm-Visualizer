export function bubbleSortAlgorithm(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    let auxArray = array.slice();
    const n = auxArray.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animations.push({ type: 'compare', indices: [j, j + 1] });
            if (auxArray[j] > auxArray[j + 1]) {
                animations.push({ type: 'swap', indices: [j, j + 1] });
                [auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];
            }
        }
        animations.push({ type: 'sorted', index: n - 1 - i });
    }
    animations.push({ type: 'sorted', index: 0 });
    return animations;
}
