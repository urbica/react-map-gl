// @flow

import { PureComponent } from 'react';
import { isImmutable } from 'immutable';

import mapboxgl from '../utils/mapbox-gl';
import type { MapSource } from '../types';

type Props = {
  /** Mapbox GL JS map instance */
  map: mapboxgl.Map,

  /** Mapbox GL Source id */
  id: string,

  /** Mapbox GL Source as Immutable object */
  source: MapSource
};

class Source extends PureComponent<Props> {
  static displayName = 'Source';

  componentDidMount() {
    const { map, id, source } = this.props;
    map.addSource(id, source.toJS());
  }

  componentWillReceiveProps(newProps: Props) {
    const newSource = newProps.source;
    const prevSource = this.props.source;

    if (!newSource.equals(prevSource)) {
      const { map, id } = this.props;

      if (newSource.get('type') === 'geojson') {
        const newData = newSource.get('data');
        if (isImmutable(newData) && !newData.equals(prevSource.get('data'))) {
          map.getSource(id).setData(newData.toJS());
        }
      } else {
        map.removeSource(id);
        map.addSource(id, newSource.toJS());
      }
    }
  }

  componentWillUnmount() {
    const { map, id } = this.props;
    if (!map || !map.getStyle()) {
      return;
    }

    map.removeSource(id);
  }

  render() {
    return null;
  }
}

export default Source;
