// @flow
import { Map } from 'immutable';

const empty = new Map();
const diff = (newMap: Map<*, *> = empty, prevMap: Map<*, *> = empty) => {
  const keys = new Set([...newMap.keys(), ...prevMap.keys()]);
  return Array.from(keys).reduce((acc, key) => {
    const value = newMap.get(key);
    if (prevMap.get(key) !== value) {
      acc.push([key, value]);
    }
    return acc;
  }, []);
};

export default diff;
