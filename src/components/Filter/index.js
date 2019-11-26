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
  filter: FilterSpecification,

  /**
   * Whether to check if the filter conforms to the Mapbox GL
   * Style Specification. Disabling validation is a performance optimization
   * that should only be used if you have previously validated the values you
   * will be passing to this function.
   * */
  validate?: boolean
|};

class Filter extends PureComponent<Props> {
  _map: MapboxMap;

  static defaultProps = {
    validate: true
  };

  componentDidMount() {
    this._setFilter();
  }

  componentDidUpdate(prevProps: Props) {
    const prevFilter = prevProps.filter;
    const prevValidate = prevProps.validate;
    const { filter, validate } = this.props;

    const shouldUpdate =
      !isArraysEqual(prevFilter, filter) || prevValidate !== validate;

    if (shouldUpdate) {
      this._setFilter();
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }
    const { layerId } = this.props;
    const targetLayer = this._map.getLayer(layerId);

    if (targetLayer === undefined) {
      return;
    }

    this._map.setFilter(layerId, undefined);
  }

  _setFilter() {
    const { layerId, filter, validate } = this.props;
    const targetLayer = this._map.getLayer(layerId);

    if (targetLayer === undefined) {
      return;
    }

    if (!Array.isArray(filter)) {
      this._map.setFilter(layerId, undefined);
    } else {
      this._map.setFilter(layerId, filter, { validate });
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
