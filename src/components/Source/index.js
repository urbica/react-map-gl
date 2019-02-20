// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { SourceSpecification } from 'mapbox-gl/src/style-spec/types';

import GeoJSONSource from '../GeoJSONSource';
import VectorSource from '../VectorSource';

type Props = {
  /** Mapbox GL Source id */
  id: string,

  /** Mapbox GL Source */
  source: SourceSpecification
};

class Source extends PureComponent<Props> {
  _map: MapboxMap;

  static displayName = 'Source';

  render() {
    const { id, source } = this.props;

    switch (source.type) {
      case 'geojson':
        return createElement(GeoJSONSource, { id, ...source });
      case 'vector':
        return createElement(VectorSource, { id, ...source });
      default:
        throw new Error(`Unknown Source type '${source.type}'`);
    }
  }
}

export default Source;
