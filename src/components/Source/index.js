// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type {
  StyleSpecification,
  SourceSpecification,
  VectorSourceSpecification,
  GeoJSONSourceSpecification
} from 'mapbox-gl/src/style-spec/types';

import MapContext from '../MapContext';
import validateSource from '../../utils/validateSource';

export type Props = {
  /** Mapbox GL Source */
  ...SourceSpecification,

  /** Mapbox GL Source id */
  id: string
};

class Source extends PureComponent<Props> {
  _map: MapboxMap;

  static displayName = 'Source';

  componentDidMount() {
    const { id, ...source } = validateSource(this.props);
    this._map.addSource(id, source);
  }

  componentDidUpdate(prevProps: Props) {
    const { id: prevId, ...prevSource } = validateSource(prevProps);
    const { id, ...source } = validateSource(this.props);

    if (id !== prevId || source.type !== prevSource.type) {
      this._map.removeSource(prevId);
      this._map.addSource(id, source);
      return;
    }

    if (source.type === 'geojson' && prevSource.type === 'geojson') {
      this._updateGeoJSONSource(id, prevSource, source);
      return;
    }

    if (source.type === 'vector' && prevSource.type === 'vector') {
      this._updateVectorSource(id, prevSource, source);
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    if (this._map.getSource(this.props.id)) {
      this._map.removeSource(this.props.id);
    }
  }

  _updateGeoJSONSource = (
    id: string,
    prevSource: GeoJSONSourceSpecification,
    newSource: GeoJSONSourceSpecification
  ) => {
    if (newSource.data !== prevSource.data) {
      this._map.getSource(id).setData(newSource.data);
    }
  };

  _updateVectorSource = (
    id: string,
    prevSource: VectorSourceSpecification,
    newSource: VectorSourceSpecification
  ) => {
    if (newSource.url !== prevSource.url) {
      this._map.removeSource(id);
      this._map.addSource(id, newSource);
      return;
    }

    if (newSource.tiles !== prevSource.tiles) {
      const style: StyleSpecification = this._map.getStyle();
      // $FlowFixMe
      style.sources[id].tiles = newSource.tiles;
      this._map.setStyle(style);
    }
  };

  render() {
    return createElement(MapContext.Consumer, {}, (map: ?MapboxMap) => {
      if (map) {
        this._map = map;
      }

      return null;
    });
  }
}

export default Source;
