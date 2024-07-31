export function mergeSortAlgorithm(array){
  const animations = []; 
  if(array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);

  }

  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,

  ) {
    let r = startIdx;
    let p = startIdx;
    let q = middleIdx + 1;
    while (p <= middleIdx && q <= endIdx) {
      animations.push([p, q]);
      animations.push([p, q]);
      if (auxiliaryArray[p] <= auxiliaryArray[q]) {
        animations.push([r, auxiliaryArray[p]]);
        mainArray[r++] = auxiliaryArray[p++];
      } else {
        animations.push([r, auxiliaryArray[q]]);
        mainArray[r++] = auxiliaryArray[q++];
      }
    }
    while (p <= middleIdx) {
      animations.push([p, p]);
      animations.push([p, p]);
      animations.push([r, auxiliaryArray[p]]);
      mainArray[r++] = auxiliaryArray[p++];
    }
    while (q <= endIdx) {
      animations.push([q, q]);
      animations.push([q, q]);
      animations.push([r, auxiliaryArray[q]]);
      mainArray[r++] = auxiliaryArray[q++];
    }

  }