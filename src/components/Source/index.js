// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { ChildrenArray, Element } from 'react';
import type {
  SourceSpecification,
  VectorSourceSpecification,
  GeoJSONSourceSpecification
} from 'mapbox-gl/src/style-spec/types';

import MapContext from '../MapContext';
import Layer from '../Layer';

/* eslint-disable import/no-cycle */
import validateSource from '../../utils/validateSource';

export type Props = {
  /** Mapbox GL Source */
  ...SourceSpecification,

  /** Mapbox GL Source id */
  id: string,

  /** Layers */
  children?: ChildrenArray<Element<typeof Layer>>
};

type State = {
  loaded: boolean
};

class Source extends PureComponent<Props, State> {
  _map: MapboxMap;

  static displayName = 'Source';

  state = {
    loaded: false
  };

  componentDidMount() {
    const { id, children, ...source } = validateSource(this.props);
    this._map.addSource(id, source);
    this._map.on('sourcedata', this._onSourceData);
  }

  componentDidUpdate(prevProps: Props) {
    const {
      id: prevId,
      children: prevChildren,
      ...prevSource
    } = validateSource(prevProps);
    const { id, children, ...source } = validateSource(this.props);

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

    this._removeSource();
  }

  _onSourceData = () => {
    if (!this._map.isSourceLoaded(this.props.id)) {
      return;
    }

    this._map.off('sourcedata', this._onSourceData);
    this.setState({ loaded: true });
  };

  _updateGeoJSONSource = (
    id: string,
    prevSource: GeoJSONSourceSpecification,
    newSource: GeoJSONSourceSpecification
  ) => {
    if (newSource.data !== prevSource.data) {
      this._map.getSource(id).setData(newSource.data);
    }
  };

  // https://github.com/mapbox/mapbox-gl-js/pull/8048
  _updateVectorSource = (
    id: string,
    prevSource: VectorSourceSpecification,
    newSource: VectorSourceSpecification
  ) => {
    const source = this._map.getSource(id);

    /* eslint-disable no-underscore-dangle */
    if (source._tileJSONRequest) {
      source._tileJSONRequest.cancel();
    }

    source.url = newSource.url;
    source.scheme = newSource.scheme;
    source._options = { ...source._options, ...newSource };
    /* eslint-enable no-underscore-dangle */

    const sourceCache = this._map.style.sourceCaches[id];
    if (sourceCache) {
      sourceCache.clearTiles();
    }

    source.load();
  };

  _removeSource = () => {
    const { id } = this.props;
    if (this._map.getSource(id)) {
      const { layers } = this._map.getStyle();
      if (layers) {
        layers.forEach((layer) => {
          if (layer.source === id) {
            this._map.removeLayer(layer.id);
          }
        });
      }

      this._map.removeSource(id);
    }
  };

  render() {
    const { loaded } = this.state;
    const { children } = this.props;

    return createElement(MapContext.Consumer, {}, (map: ?MapboxMap) => {
      if (map) {
        this._map = map;
      }

      // $FlowFixMe
      return loaded && children;
    });
  }
}

export default Source;
