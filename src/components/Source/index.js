// @flow

import { PureComponent, createElement } from 'react';
import { isImmutable } from 'immutable';

import MapContext from '../MapContext';
import type { MapboxMap, MapSource } from '../../types';

type Props = {
  /** Mapbox GL Source id */
  id: string,

  /** Mapbox GL Source as Immutable object */
  source: MapSource
};

class Source extends PureComponent<Props> {
  _map: MapboxMap;
  static displayName = 'Source';

  componentDidMount() {
    const { id, source } = this.props;
    this._map.addSource(id, source.toJS());
  }

  componentWillReceiveProps(newProps: Props) {
    const newSource = newProps.source;
    const prevSource = this.props.source;

    if (!newSource.equals(prevSource)) {
      const { id } = this.props;
      const type = newSource.get('type');

      if (type === 'geojson') {
        const newData = newSource.get('data');
        if (isImmutable(newData) && !newData.equals(prevSource.get('data'))) {
          this._map.getSource(id).setData(newData.toJS());
        }
      } else if (type === 'vector') {
        const newStyle = this._map.getStyle();
        const tiles = newSource.get('tiles');
        if (isImmutable(tiles) && !tiles.equals(prevSource.get('tiles'))) {
          newStyle.sources[id].tiles = tiles.toJS();
          this._map.setStyle(newStyle);
        }
      } else {
        this._map.removeSource(id);
        this._map.addSource(id, newSource.toJS());
      }
    }
  }

  componentWillUnmount() {
    const { id } = this.props;
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    if (this._map.getSource(id)) {
      const { layers } = this._map.getStyle();
      if (layers) {
        layers
          .filter(layer => layer.source === id)
          .forEach(layer => this._map.removeLayer(layer.id));
      }

      this._map.removeSource(id);
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

export default Source;
