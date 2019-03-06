// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type {
  StyleSpecification,
  SourceSpecification
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

    if (
      source.type === 'geojson' &&
      prevSource.type === 'geojson' &&
      source.data !== prevSource.data
    ) {
      this._map.getSource(id).setData(source.data);
      return;
    }

    if (
      source.type === 'vector' &&
      prevSource.type === 'vector' &&
      source.tiles !== prevSource.tiles
    ) {
      const style: StyleSpecification = this._map.getStyle();
      // $FlowFixMe
      style.sources[id].tiles = style.tiles;
      this._map.setStyle(style);
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
