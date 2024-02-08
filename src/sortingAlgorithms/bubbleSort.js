export function bubbleSortAlgorithm(array) {
    let animations = [];
    let auxArray = array.slice();
    bubbleSortHelper(auxArray, animations);
    return animations;
}

function bubbleSortHelper(auxArray, animations) {
    let endIdx = auxArray.length - 1;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < endIdx; i++) {
            animations.push([i, i+1]); // Compare
            animations.push([i, i+1]); // Revert color
            if (auxArray[i] > auxArray[i + 1]) {
                animations.push([i, auxArray[i+1]]); // Swap
                animations.push([i+1, auxArray[i]]); // Swap
                swap(auxArray, i, i+1);
                swapped = true;
            } else {
                animations.push([-1, -1]); // No swap
                animations.push([-1, -1]); // No swap
            }
        }
        endIdx--;
    } while (swapped && endIdx > 0);
}

function swap(auxArray, a, b) {
    let temp = auxArray[a];
    auxArray[a] = auxArray[b];
    auxArray[b] = temp;
}