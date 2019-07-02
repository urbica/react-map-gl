// @flow

import { Children, cloneElement } from 'react';
import type { Element } from 'react';

import Layer from '../components/Layer';
import CustomLayer from '../components/CustomLayer';
import type { Children as MapChildren } from '../components/MapGL';

type LayerLike = Element<typeof Layer> | Element<typeof CustomLayer>;
const LayerLikeElements = [Layer, CustomLayer];

const isLayerLike = (child: Element<any>) =>
  LayerLikeElements.includes(child.type);

const getLayerId = (child: LayerLike): string => {
  switch (child.type) {
    case Layer:
      // $FlowFixMe
      return child.props.id;
    case CustomLayer:
      // $FlowFixMe
      return child.props.layer.id;
    default:
      throw new Error(`Unknown layer type: ${child.type.name}`);
  }
};

const forEachLayer = (fn, children: MapChildren) => {
  Children.forEach(children, (child) => {
    if (isLayerLike(child)) fn(child);
    if (child.props && child.props.children)
      forEachLayer(fn, child.props.children);
  });
};

const getLayerIds = (children: MapChildren): Array<string> => {
  const layerIds = [];
  forEachLayer((child) => {
    if (!child.props.before) {
      layerIds.push(getLayerId(child));
    }
  }, children);
  return layerIds;
};

const normalizeChildren = (children: MapChildren) => {
  const nonEmptyChildren = Children.toArray(children).filter(Boolean);
  const layerIds = getLayerIds(nonEmptyChildren);
  layerIds.shift();

  const traverse = (_children: MapChildren) =>
    Children.map(_children, (child: Element<any>) => {
      if (isLayerLike(child)) {
        const before: string = child.props.before || layerIds.shift();
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
