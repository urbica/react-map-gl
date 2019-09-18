// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { FilterSpecification } from 'mapbox-gl/src/style-spec/types';

import MapContext from '../MapContext';
import isArraysEqual from '../../utils/isArraysEqual';

type Props = {|
  layerId: string,
  filter: FilterSpecification
|};

class Filter extends PureComponent<Props> {
  _map: MapboxMap;

  componentDidMount() {
    this._setFilter();
  }

  componentDidUpdate(prevProps: Props) {
    const prevFilter = prevProps.filter;
    const { filter } = this.props;

    if (!isArraysEqual(prevFilter, filter)) {
      this._setFilter();
    }
  }

  _setFilter() {
    const { layerId, filter } = this.props;
    const targetLayer = this._map.getLayer(layerId);

    if (targetLayer === undefined) {
      return;
    }

    this._map.setFilter(layerId, filter);
  }

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        this._map = map;
      }

      return null;
    });
  }
}

export default Filter;
