// @ts-nocheck

import { Children, cloneElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

import { Layer } from '../components/Layer';
import { CustomLayer } from '../components/CustomLayer';

type LayerLike = ReactElement<typeof Layer> | ReactElement<typeof CustomLayer>;

const LayerLikeTypes = [Layer, CustomLayer];
const isLayerLike = (child: ReactNode) =>
  LayerLikeTypes.includes(child?.type);

const getLayerId = (child: LayerLike): string => {
  return child.props.id || child.props.layer.id;
};

const forEachLayer = (fn: (child: LayerLike) => void, children: ReactNode) => {
  Children.forEach(children, (child) => {
    if (!child) return;
    if (isLayerLike(child)) fn(child);
    if (child.props && child.props.children)
      forEachLayer(fn, child.props.children);
  });
};

const getLayerIds = (children: ReactNode): Array<string> => {
  const layerIds: string[] = [];
  forEachLayer((child: LayerLike) => {
    if (!child.props.before) {
      layerIds.push(getLayerId(child));
    }
  }, children);
  return layerIds;
};

const normalizeChildren = (children: ReactNode): ReactNode => {
  const layerIds = getLayerIds(children);
  layerIds.shift();

  const traverse = (_children: ReactNode): ReactNode => {
    if (typeof _children === 'function') {
      return _children;
    }

    return Children.map(_children, (child: ReactElement<any>) => {
      if (!child) {
        return child;
      }

      if (isLayerLike(child)) {
        const before: string = child.props.before || layerIds.shift();
        return cloneElement(child, { before });
      }

      if (child.props && child.props.children) {
        return cloneElement(child, {
          children: traverse(child.props.children),
        });
      }

      return child;
    });
  };

  const normalizedChildren = traverse(children);
  return normalizedChildren;
};

export default normalizeChildren;
