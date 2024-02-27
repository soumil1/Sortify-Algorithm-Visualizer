export function selectionSortAlgorithm(array) {
  const animations = [];
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push([minIdx, j]);
      animations.push([minIdx, j]);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    animations.push([minIdx, array[i]]);
    animations.push([i, array[minIdx]]);
    swap(array, i, minIdx);
  }
  return animations;
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}