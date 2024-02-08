export function quickSortAlgorithm(array) {
    let animations = [];
    let auxArray = array.slice();
    sortingHelper(auxArray, 0, auxArray.length - 1, animations);
    return animations;
}

function sortingHelper(auxArray, startIdx, endIdx, animations) {
    let pivotIndex;
    if (startIdx < endIdx) {
        pivotIndex = partitionArray(auxArray, startIdx, endIdx, animations);
        sortingHelper(auxArray, startIdx, pivotIndex - 1, animations);
        sortingHelper(auxArray, pivotIndex + 1, endIdx, animations);
    }
}

function partitionArray(auxArray, startIdx, endIdx, animations) {
    let aux = auxArray;
    let j = endIdx;
    let pivot = aux[endIdx];
    let k = startIdx;
    let a = animations;
    
    for (let i = startIdx; i <= j - 1; i++) {
        a.push([i, j]);
        a.push([i, j]);
        if (aux[i] <= pivot) {
            a.push([i, aux[k]]);
            a.push([k, aux[i]]);
            swap(aux, i, k);
            k++;
        } else {
            a.push([-1, -1]);
            a.push([-1, -1]);
        }
        a.push([-1, -1]);
        a.push([-1, -1]);
    }
    a.push([-1, -1]);
    a.push([-1, -1]);
    a.push([-1, -1]);
    a.push([-1, -1]);

    a.push([k, aux[j]]);
    a.push([j, aux[k]]);
    swap(aux, k, j);
    return k;
}

function swap(aux, a, b) {
    let t = aux[a];
    aux[a] = aux[b];
    aux[b] = t;
}