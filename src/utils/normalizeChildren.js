// @flow

import { Children, cloneElement } from 'react';
import type { Element } from 'react';

import Layer from '../components/Layer';
import CustomLayer from '../components/CustomLayer';
import type { Children as MapChildren } from '../components/MapGL';

type LayerLike = Element<typeof Layer> | Element<typeof CustomLayer>;

const LayerLikeTypes = [Layer, CustomLayer];
const isLayerLike = (child: Element<any>) =>
  LayerLikeTypes.includes(child.type);

const getLayerId = (child: LayerLike): string =>
  // $FlowFixMe
  child.props.id || child.props.layer.id;

const forEachLayer = (fn, children: MapChildren) => {
  Children.forEach(children, (child) => {
    if (!child) return;
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
  const layerIds = getLayerIds(children);
  layerIds.shift();

  const traverse = (_children: MapChildren) => {
    if (typeof _children === 'function') {
      return _children;
    }

    return Children.map(_children, (child: Element<any>) => {
      if (!child) {
        return child;
      }

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
  };

  const normalizedChildren = traverse(children);
  return normalizedChildren;
};

export default normalizeChildren;
