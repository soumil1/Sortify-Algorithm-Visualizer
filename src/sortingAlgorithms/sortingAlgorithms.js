/* export const mergeSort = array => {
  if (array.length === 1) return array;
  const middleIdx = Math.floor(array.length / 2);
  const firstHalf = mergeSort(array.slice(0, middleIdx));
  const secondHalf = mergeSort(array.slice(middleIdx));
  const sortedArray = [];
  let p = 0, q = 0;

  while (p < firstHalf.length && q < secondHalf.length) {
    if (firstHalf[p] < secondHalf[q]) {
      sortedArray.push(firstHalf[p++]);
    } else {
      sortedArray.push(secondHalf[q++]);
    }
  }

  while (p < firstHalf.length) sortedArray.push(firstHalf[p++]);
  while (q < secondHalf.length) sortedArray.push(secondHalf[q++]);
  return sortedArray;
}; */ 
export const mergeSort = (array, start = 0, end = array.length - 1) => {
    if (start >= end) return;
    const middle = Math.floor((start + end) / 2);
    mergeSort(array, start, middle);
    mergeSort(array, middle + 1, end);
    merge(array, start, middle, end);
    return array;
}

const merge = (array, start, middle, end) => {
    let left = array.slice(start, middle + 1);
    let right = array.slice(middle + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            array[k++] = left[i++];
        } else {
            array[k++] = right[j++];
        }
    }

    while (i < left.length) {
        array[k++] = left[i++];
    }

    while (j < right.length) {
        array[k++] = right[j++];
    }
}