// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type {
  StyleSpecification,
  GeoJSONSourceSpecification
} from 'mapbox-gl/src/style-spec/types';

import MapContext from '../MapContext';

type Props = {|
  id: string,
  ...GeoJSONSourceSpecification
|};

class GeoJSONSource extends PureComponent<Props> {
  _map: MapboxMap;

  static displayName = 'GeoJSONSource';

  componentDidMount() {
    const { id, ...geojsonSource } = this.props;
    const source = { type: 'geojson', ...geojsonSource };
    this._map.addSource(id, source);
  }

  componentDidUpdate(prevProps: Props) {
    const { id, ...geojsonSource } = this.props;
    const source = { type: 'geojson', ...geojsonSource };

    if (id !== prevProps.id) {
      this._map.removeSource(prevProps.id);
      this._map.addSource(id, source);
      return;
    }

    if (source.data !== prevProps.data) {
      this._map.getSource(id).setData(source.data);
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    const { id } = this.props;
    if (this._map.getSource(id)) {
      const style: StyleSpecification = this._map.getStyle();
      if (style.layers) {
        style.layers
          .filter(layer => layer.source && layer.source === id)
          .forEach(layer => this._map.removeLayer(layer.id));
      }

      this._map.removeSource(id);
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

export default GeoJSONSource;
