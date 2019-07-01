// @flow

import { Children, cloneElement } from 'react';
import type { Node, Element } from 'react';

import Layer from '../components/Layer';
import CustomLayer from '../components/CustomLayer';

const isLayer = (child: Element<any>) =>
  child.type === Layer || child.type === CustomLayer;

const getLayerId = (child: Element<typeof Layer | typeof CustomLayer>) => {
  // $FlowFixMe
  return child.type === CustomLayer ? child.props.layer.id : child.props.id;
};

const forEachLayer = (fn, children: Node) => {
  Children.forEach(children, (child) => {
    if (isLayer(child)) fn(child);
    if (child.props && child.props.children)
      forEachLayer(fn, child.props.children);
  });
};

const getLayerIds = (children: Node) => {
  const layerIds = [];
  forEachLayer((child) => {
    if (!child.props.before) {
      layerIds.push(getLayerId(child));
    }
  }, children);
  return layerIds;
};

const normalizeChildren = (children: Node) => {
  const nonEmptyChildren = Children.toArray(children).filter(Boolean);
  const layerIds = getLayerIds(nonEmptyChildren);
  layerIds.shift();

  const traverse = _children =>
    Children.map(_children, (child) => {
      if (isLayer(child)) {
        const before = child.props.before || layerIds.shift();
        return cloneElement(child, { before });
      }

      if (child.props && child.props.children) {
        return cloneElement(child, {
          children: traverse(child.props.children)
        });
      }

      return child;
    });

  return traverse(nonEmptyChildren);
};

export default normalizeChildren;
