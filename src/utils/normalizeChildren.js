// @flow

import { Children, cloneElement } from 'react';
import type { Node, Element } from 'react';

import Layer from '../components/Layer';
import CustomLayer from '../components/CustomLayer';

const getLayerId = (child: Element<typeof Layer | typeof CustomLayer>) => {
  // $FlowFixMe
  return child.type === CustomLayer ? child.props.layer.id : child.props.id;
};

const normalizeChildren = (children: Node) => {
  const results = Children.toArray(children)
    .filter(Boolean)
    .reduce(
      (acc, child, index) => {
        const { previousLayerIndex } = acc;

        if (child.type === Layer || child.type === CustomLayer) {
          if (previousLayerIndex) {
            const currentLayerId = getLayerId(child);
            const previousLayer = acc.children[previousLayerIndex];
            const before = previousLayer.props.before || currentLayerId;
            const previousLayerWithBefore = cloneElement(previousLayer, {
              before
            });

            acc.children[previousLayerIndex] = previousLayerWithBefore;
          }

          acc.previousLayerIndex = index;
        }

        acc.children.push(child);
        return acc;
      },
      { children: [], previousLayerIndex: undefined }
    );

  return results.children;
};

export default normalizeChildren;
