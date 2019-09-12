const isArraysEqual = (arr1 = [], arr2 = []) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let index = 0; index < arr1.length; index += 1) {
    if (arr1[index] !== arr2[index]) {
      return false;
    }
  }

  return true;
};

export default isArraysEqual;
