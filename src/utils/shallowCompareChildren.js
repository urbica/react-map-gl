// @flow

import { Children } from 'react';
import type { Node } from 'react';

const childrenKeys = (children: Node): string[] =>
  Children.toArray(children).map(child => child.key);

const shallowCompareChildren = (
  prevChildren: Node,
  newChildren: Node
): boolean => {
  if (Children.count(prevChildren) !== Children.count(newChildren)) {
    return false;
  }

  const prevKeys = childrenKeys(prevChildren);
  const newKeys = new Set(childrenKeys(newChildren));
  return prevKeys.every(key => newKeys.has(key));
};

export default shallowCompareChildren;
