export function insertionSortAlgorithm(array) {
  let animations = [];
  let auxArray = array.slice();
  for (let i = 1; i < auxArray.length; i++) {
    let key = auxArray[i];
    let j = i - 1;
    while (j >= 0 && auxArray[j] > key) {
      animations.push([j, j + 1]);
      animations.push([j, auxArray[j]]);
      animations.push([j + 1, auxArray[j]]);
      auxArray[j + 1] = auxArray[j];
      j = j - 1;
    }
    animations.push([j + 1, key]);
    animations.push([j + 1, key]);
    auxArray[j + 1] = key;
  }
  return animations;
}