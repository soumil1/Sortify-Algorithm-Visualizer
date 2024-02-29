export function* selectionSortAlgorithm(array) {
  let n = array.length;
  let auxArray = array.slice();
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    let minValue = auxArray[i];
    for (let j = i + 1; j < n; j++) {
      if (auxArray[j] < minValue) {
        minIdx = j;
        minValue = auxArray[j];
      }
    }
    if (minIdx !== i) {
      yield [minIdx, auxArray[minIdx], i, auxArray[i]];
      swap(auxArray, minIdx, i);
    }
  }
}

function swap(auxArray, a, b) {
  let t = auxArray[a];
  auxArray[a] = auxArray[b];
  auxArray[b] = t;
}