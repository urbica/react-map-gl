// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { SourceSpecification } from 'mapbox-gl/src/style-spec/types';

import GeoJSONSource from '../GeoJSONSource';
import VectorSource from '../VectorSource';

type Props = {
  /** Mapbox GL Source */
  ...SourceSpecification,

  /** Mapbox GL Source id */
  id: string
};

class Source extends PureComponent<Props> {
  _map: MapboxMap;

  static displayName = 'Source';

  render() {
    const { id, ...source } = this.props;

    switch (source.type) {
      case 'geojson':
        return createElement(GeoJSONSource, { id, ...source });
      case 'vector':
        return createElement(VectorSource, { id, ...source });
      default:
        throw new Error(`Unknown type for '${id}' Source`);
    }
  }
}

export default Source;
