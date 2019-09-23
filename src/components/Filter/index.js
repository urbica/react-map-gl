// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { FilterSpecification } from 'mapbox-gl/src/style-spec/types';

import MapContext from '../MapContext';
import isArraysEqual from '../../utils/isArraysEqual';

type Props = {|
  /** Mapbox GL Layer id */
  layerId: string,
  /**
   * The filter, conforming to the Mapbox Style Specification's
   * filter definition. (see https://docs.mapbox.com/mapbox-gl-js/style-spec/#other-filter)
   * If null or undefined is provided, the function removes any existing filter
   * from the layer.
   * */
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

  componentWillUnmount() {
    const { layerId } = this.props;
    const targetLayer = this._map.getLayer(layerId);

    if (targetLayer === undefined) {
      return;
    }

    this._map.setFilter(layerId, undefined);
  }

  _setFilter() {
    const { layerId, filter } = this.props;
    const targetLayer = this._map.getLayer(layerId);

    if (targetLayer === undefined) {
      return;
    }

    if (!Array.isArray(filter)) {
      this._map.setFilter(layerId, undefined);
    } else {
      this._map.setFilter(layerId, filter);
    }
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
