export function insertionSortAlgorithm(array) {
    const animations = [];
    let auxArray = array.slice();
    for (let i = 1; i < auxArray.length; i++) {
        let key = auxArray[i];
        let j = i - 1;
        animations.push({ type: 'key_element', index: i });
        
        animations.push({ type: 'compare', indices: [j, i] });
        while (j >= 0 && auxArray[j] > key) {
            animations.push({ type: 'overwrite', index: j + 1, value: auxArray[j] });
            auxArray[j + 1] = auxArray[j];
            j = j - 1;
            if (j >= 0) {
                 animations.push({ type: 'compare', indices: [j, i] });
            }
        }
        animations.push({ type: 'overwrite', index: j + 1, value: key });
    }
    for (let i = 0; i < auxArray.length; i++) {
        animations.push({ type: 'sorted', index: i });
    }
    return animations;
}
