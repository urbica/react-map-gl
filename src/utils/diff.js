// @flow

type KV = {
  [string]: any
};

const diff = (newProps: KV = {}, prevProps: KV = {}) => {
  const keys = new Set([...Object.keys(newProps), ...Object.keys(prevProps)]);
  return [...keys].reduce((acc, key: string) => {
    const value = newProps[key];
    if (value !== prevProps[key]) {
      acc.push([key, value]);
    }
    return acc;
  }, []);
};

export default diff;
