// @flow
import { Map, is } from 'immutable';

const empty = new Map();
const diff = (newMap: Map<*, *> = empty, prevMap: Map<*, *> = empty) => {
  const keys = new Set([...newMap.keySeq().toArray(), ...prevMap.keySeq().toArray()]);
  return Array.from(keys).reduce((acc, key: string) => {
    const value = newMap.get(key);
    if (!is(prevMap.get(key), value)) {
      acc.push([key, value]);
    }
    return acc;
  }, []);
};

export default diff;
