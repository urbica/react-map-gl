// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';

import MapContext from '../MapContext';

type Props = {
  /** Unique id of the feature. */
  id: string | number,

  /** The Id of the vector source or GeoJSON source for the feature. */
  source: string,

  /** For vector tile sources, the sourceLayer is required. */
  sourceLayer: string,

  /** A set of key-value pairs. The values should be valid JSON types. */
  state: Object
};

/**
 * A `FeatureState` component sets the state of a feature.
 */
class FeatureState extends PureComponent<Props> {
  _map: MapboxMap;

  componentDidMount() {
    const map: MapboxMap = this._map;
    const { id, source, sourceLayer, state } = this.props;
    map.setFeatureState({ id, source, sourceLayer }, state);
  }

  componentDidUpdate(prevProps: Props) {
    const map = this._map;
    const { id, source, sourceLayer, state } = this.props;

    if (
      id !== prevProps.id ||
      source !== prevProps.source ||
      sourceLayer !== prevProps.sourceLayer ||
      state !== prevProps.state
    ) {
      map.removeFeatureState({
        id: prevProps.id,
        source: prevProps.source,
        sourceLayer: prevProps.sourceLayer
      });

      map.setFeatureState({ id, source, sourceLayer }, state);
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    const { id, source, sourceLayer } = this.props;
    this._map.removeFeatureState({ id, source, sourceLayer });
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

export default FeatureState;
